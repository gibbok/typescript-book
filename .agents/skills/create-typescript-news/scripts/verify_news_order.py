#!/usr/bin/env python3
"""Verify TypeScript news ordering and locale synchronization."""

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
    order: int
    published: date


def parse_locales(config_path: Path) -> list[str]:
    config = config_path.read_text(encoding="utf-8")
    block = re.search(
        r"(?ms)^\s*locales:\s*\{\s*$"
        r"(.*?)"
        r"^\s*\},\s*$\s*^\s*sidebar:\s*\[",
        config,
    )
    if not block:
        raise ValueError(f"Could not find the locales block in {config_path}")

    locales: list[str] = []
    for line in block.group(1).splitlines():
        match = re.match(
            r"^\s*(?:(root)|['\"]([^'\"]+)['\"]):\s*\{\s*$",
            line,
        )
        if match:
            locales.append(match.group(1) or match.group(2))

    if "root" not in locales:
        raise ValueError(f"The locales block in {config_path} has no root locale")
    return locales


def parse_article(path: Path) -> Article:
    content = path.read_text(encoding="utf-8")
    frontmatter = re.match(r"\A---\s*\n(.*?)\n---(?:\n|\Z)", content, re.DOTALL)
    if not frontmatter:
        raise ValueError(f"{path}: missing YAML frontmatter")

    metadata = frontmatter.group(1)
    order_match = re.search(
        r"(?m)^\s*sidebar:\s*$\n^\s+order:\s*(-?\d+)\s*$",
        metadata,
    )
    if not order_match:
        raise ValueError(f"{path}: missing numeric sidebar.order")

    published_match = re.search(
        r"(?m)^\s*property:\s*article:published_time\s*$"
        r"\n^\s*content:\s*['\"]?(\d{4}-\d{2}-\d{2})['\"]?\s*$",
        metadata,
    )
    if not published_match:
        raise ValueError(f"{path}: missing article:published_time")

    try:
        published = date.fromisoformat(published_match.group(1))
    except ValueError as error:
        raise ValueError(f"{path}: invalid publication date: {error}") from error

    return Article(path=path, order=int(order_match.group(1)), published=published)


def load_articles(news_dir: Path) -> dict[str, Article]:
    articles: dict[str, Article] = {}
    if not news_dir.is_dir():
        return articles

    for path in sorted(news_dir.rglob("*.md")):
        relative = path.relative_to(news_dir)
        if relative == Path("index.md"):
            continue
        if len(relative.parts) != 2 or not re.fullmatch(r"\d{4}", relative.parts[0]):
            raise ValueError(
                f"{path}: news articles must use YYYY/article-slug.md paths"
            )
        articles[relative.as_posix()] = parse_article(path)
    return articles


def verify(repo_root: Path) -> list[str]:
    errors: list[str] = []
    docs_dir = repo_root / "website/src/content/docs"
    locales = parse_locales(repo_root / "website/astro.config.mjs")
    master = load_articles(docs_dir / "typescript-news")

    if not master:
        return ["No English TypeScript news articles were found"]

    ordered_master = sorted(master.items(), key=lambda item: item[1].order)
    actual_orders = [article.order for _, article in ordered_master]
    expected_orders = list(range(1, len(ordered_master) + 1))
    if actual_orders != expected_orders:
        errors.append(
            "English sidebar orders must be unique and contiguous: "
            f"expected {expected_orders}, found {actual_orders}"
        )

    for (first_path, first), (second_path, second) in zip(
        ordered_master,
        ordered_master[1:],
    ):
        if first.published < second.published:
            errors.append(
                f"English order is not newest-first: {first_path} "
                f"({first.published}) precedes {second_path} ({second.published})"
            )
        if first.published == second.published and first_path > second_path:
            errors.append(
                "Articles with the same publication date must use slug order: "
                f"{first_path} precedes {second_path}"
            )

    master_paths = set(master)
    for locale in locales:
        if locale == "root":
            continue
        localized = load_articles(docs_dir / locale / "typescript-news")
        localized_paths = set(localized)

        for missing in sorted(master_paths - localized_paths):
            errors.append(f"{locale}: missing translated article {missing}")
        for extra in sorted(localized_paths - master_paths):
            errors.append(f"{locale}: orphaned translated article {extra}")
        for relative in sorted(master_paths & localized_paths):
            expected = master[relative].order
            actual = localized[relative].order
            if actual != expected:
                errors.append(
                    f"{locale}/{relative}: sidebar.order is {actual}; "
                    f"expected {expected} from English"
                )

    return errors


def main() -> int:
    default_root = Path(__file__).resolve().parents[4]
    parser = argparse.ArgumentParser(
        description="Verify TypeScript news order and locale synchronization."
    )
    parser.add_argument(
        "--repo-root",
        type=Path,
        default=default_root,
        help="Repository root (defaults to the script's repository).",
    )
    args = parser.parse_args()

    try:
        errors = verify(args.repo_root.resolve())
    except (OSError, ValueError) as error:
        print(f"ERROR: {error}", file=sys.stderr)
        return 1

    if errors:
        for error in errors:
            print(f"ERROR: {error}", file=sys.stderr)
        return 1

    locales = parse_locales(args.repo_root / "website/astro.config.mjs")
    articles = load_articles(
        args.repo_root / "website/src/content/docs/typescript-news"
    )
    print(
        f"Verified {len(articles)} news articles across {len(locales)} languages: "
        "orders are unique, contiguous, newest-first, and synchronized."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
