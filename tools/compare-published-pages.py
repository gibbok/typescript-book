#!/usr/bin/env python3

"""Compare generated PDF page counts with one immutable GitHub main snapshot."""

from __future__ import annotations

import argparse
import json
import re
import shutil
import subprocess
import sys
import tempfile
import urllib.request
from pathlib import Path


def fetch(url: str) -> bytes:
    request = urllib.request.Request(url, headers={"User-Agent": "typescript-book-tools"})
    with urllib.request.urlopen(request) as response:  # noqa: S310 -- fixed GitHub URLs
        return response.read()


def pdf_pages(path: Path) -> int:
    result = subprocess.run(
        ["pdfinfo", str(path)],
        check=False,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
    )
    if result.returncode != 0:
        raise RuntimeError(f"pdfinfo failed for {path}: {result.stdout.strip()}")
    match = re.search(r"^Pages:\s+(\d+)$", result.stdout, flags=re.MULTILINE)
    if match is None:
        raise RuntimeError(f"pdfinfo did not report pages for {path}")
    return int(match.group(1))


def parse_outputs(path: Path) -> list[str]:
    records = re.findall(
        r'^\s*"([^"]+)"\s*$', path.read_text(encoding="utf-8"), flags=re.MULTILINE
    )
    outputs = [
        record.split("|")[1] for record in records if len(record.split("|")) == 4
    ]
    if not outputs:
        raise ValueError(f"No artifact records found in {path}")
    return outputs


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--downloads-dir", default=Path("downloads"), type=Path)
    parser.add_argument(
        "--artifacts-file", default=Path("tools/book-artifacts.sh"), type=Path
    )
    parser.add_argument("--repository", default="gibbok/typescript-book")
    args = parser.parse_args()

    if shutil.which("pdfinfo") is None:
        print("pdfinfo is required (install Poppler utilities).", file=sys.stderr)
        return 1

    commit = json.loads(
        fetch(f"https://api.github.com/repos/{args.repository}/commits/main")
    )
    sha = commit["sha"]
    outputs = parse_outputs(args.artifacts_file)
    print(f"Published baseline: {args.repository}@{sha}")
    print(f"{'Book':<26} {'Published':>10} {'Local':>8} {'Delta':>8}")

    with tempfile.TemporaryDirectory(prefix="typescript-book-published-") as temp:
        temp_dir = Path(temp)
        for output in outputs:
            local = args.downloads_dir / f"{output}.pdf"
            if not local.is_file():
                print(f"Missing local PDF: {local}", file=sys.stderr)
                return 1
            remote = temp_dir / local.name
            raw_url = (
                f"https://raw.githubusercontent.com/{args.repository}/{sha}/downloads/{remote.name}"
            )
            remote.write_bytes(fetch(raw_url))
            published_pages = pdf_pages(remote)
            local_pages = pdf_pages(local)
            delta = local_pages - published_pages
            print(f"{output:<26} {published_pages:>10} {local_pages:>8} {delta:>+8}")

    print("Page-count deltas are informational; they do not fail this command.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
