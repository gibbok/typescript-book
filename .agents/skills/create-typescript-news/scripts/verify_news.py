#!/usr/bin/env python3
"""Verify TypeScript news dates, locale parity, and archive pages."""

from __future__ import annotations

import argparse
import re
import sys
from dataclasses import dataclass
from datetime import date
from pathlib import Path


@dataclass(frozen=True)
class Article:
    path: Path
    published: date


def parse_locales(locales_path: Path) -> list[str]:
    source = locales_path.read_text(encoding="utf-8")
    block = re.search(
        r"(?ms)^export\s+const\s+locales\s*=\s*\{(.*?)^\}\s+as\s+const;",
        source,
    )
    if not block:
        raise ValueError(f"Could not resolve locales from {locales_path}")

    locales: list[str] = []
    for line in block.group(1).splitlines():
        match = re.match(r"^\s*(?:(root)|['\"]([^'\"]+)['\"]):\s*\{", line)
        if match:
            locales.append(match.group(1) or match.group(2))

    if not locales or "root" not in locales:
        raise ValueError(f"The locales configuration in {locales_path} has no root locale")
    if len(locales) != len(set(locales)):
        raise ValueError(f"The locales configuration in {locales_path} contains duplicates")
    return locales


def read_frontmatter(path: Path) -> str:
    content = path.read_text(encoding="utf-8")
    match = re.match(r"\A---\s*\r?\n(.*?)\r?\n---(?:\r?\n|\Z)", content, re.DOTALL)
    if not match:
        raise ValueError(f"{path}: missing YAML frontmatter")
    return match.group(1)


def parse_article(path: Path) -> Article:
    metadata = read_frontmatter(path)
    published_match = re.search(
        r"(?m)^[ \t]*property:[ \t]*article:published_time[ \t]*\r?\n"
        r"[ \t]*content:[ \t]*['\"]?([^'\"\s]+)",
        metadata,
    )
    if not published_match:
        raise ValueError(f"{path}: missing article:published_time")

    raw_date = published_match.group(1)
    try:
        published = date.fromisoformat(raw_date)
    except ValueError as error:
        raise ValueError(f"{path}: invalid publication date {raw_date!r}: {error}") from error
    if published.isoformat() != raw_date:
        raise ValueError(f"{path}: publication date must use YYYY-MM-DD, found {raw_date!r}")

    sidebar = re.search(
        r"(?ms)^sidebar:[ \t]*\r?\n((?:[ \t]+[^\r\n]*(?:\r?\n|\Z))*)",
        metadata,
    )
    if not sidebar or not re.search(r"(?m)^[ \t]+hidden:[ \t]*true[ \t]*$", sidebar.group(1)):
        raise ValueError(f"{path}: news articles must set sidebar.hidden: true")
    if re.search(r"(?m)^[ \t]+order[ \t]*:", sidebar.group(1)):
        raise ValueError(f"{path}: remove obsolete sidebar.order metadata")

    return Article(path=path, published=published)


def load_articles(news_dir: Path) -> dict[str, Article]:
    articles: dict[str, Article] = {}
    if not news_dir.is_dir():
        return articles

    for path in sorted(news_dir.rglob("*.md")):
        relative = path.relative_to(news_dir)
        if relative == Path("index.md"):
            continue
        if len(relative.parts) != 2 or not re.fullmatch(r"\d{4}", relative.parts[0]):
            raise ValueError(f"{path}: news articles must use YYYY/article-slug.md paths")
        article = parse_article(path)
        year = int(relative.parts[0])
        if article.published.year != year:
            raise ValueError(
                f"{path}: publication date {article.published} does not match directory year {year}"
            )
        articles[relative.as_posix()] = article
    return articles


def has_news_list(content: str, locale: str, year: int | None = None) -> bool:
    if "import NewsList from" not in content:
        return False
    for line in content.splitlines():
        if "<NewsList" not in line or f'locale="{locale}"' not in line:
            continue
        if year is None or f"year={{{year}}}" in line:
            return True
    return False


def verify(repo_root: Path) -> tuple[list[str], list[str], int]:
    errors: list[str] = []
    docs_dir = repo_root / "website/src/content/docs"
    locales = parse_locales(repo_root / "website/src/config/locales.ts")
    master = load_articles(docs_dir / "typescript-news")

    if not master:
        return ["No English TypeScript news articles were found"], locales, 0

    master_paths = set(master)
    years = sorted({int(relative.split("/", 1)[0]) for relative in master_paths})

    for locale in locales:
        locale_prefix = "" if locale == "root" else f"{locale}/"
        news_dir = docs_dir / f"{locale_prefix}typescript-news"
        localized = load_articles(news_dir)
        localized_paths = set(localized)

        for missing in sorted(master_paths - localized_paths):
            errors.append(f"{locale}: missing translated article {missing}")
        for extra in sorted(localized_paths - master_paths):
            errors.append(f"{locale}: orphaned translated article {extra}")
        for relative in sorted(master_paths & localized_paths):
            expected = master[relative].published
            actual = localized[relative].published
            if actual != expected:
                errors.append(
                    f"{locale}/{relative}: publication date is {actual}; expected {expected} from English"
                )

        landing_page = news_dir / "index.mdx"
        if not landing_page.is_file():
            errors.append(f"{locale}: missing TypeScript News landing page {landing_page}")
        else:
            landing_content = landing_page.read_text(encoding="utf-8")
            if not has_news_list(landing_content, locale):
                errors.append(f"{locale}: landing page must render the shared latest-news list")

        for year in years:
            archive_page = news_dir / str(year) / "index.mdx"
            if not archive_page.is_file():
                errors.append(f"{locale}: missing yearly archive page for {year}: {archive_page}")
                continue
            archive_content = archive_page.read_text(encoding="utf-8")
            if not has_news_list(archive_content, locale, year):
                errors.append(
                    f"{locale}: {year} archive must render the shared localized news list"
                )

    return errors, locales, len(master)


def main() -> int:
    default_root = Path(__file__).resolve().parents[4]
    parser = argparse.ArgumentParser(
        description="Verify TypeScript news dates, locale parity, and archive pages."
    )
    parser.add_argument(
        "--repo-root",
        type=Path,
        default=default_root,
        help="Repository root (defaults to the script's repository).",
    )
    args = parser.parse_args()

    try:
        errors, locales, article_count = verify(args.repo_root.resolve())
    except (OSError, ValueError) as error:
        print(f"ERROR: {error}", file=sys.stderr)
        return 1

    if errors:
        for error in errors:
            print(f"ERROR: {error}", file=sys.stderr)
        return 1

    print(
        f"Verified {article_count} TypeScript news articles across {len(locales)} locales; "
        "publication dates, localized routes, hidden article navigation, and yearly archives are consistent."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
