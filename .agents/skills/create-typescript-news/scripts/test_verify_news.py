import tempfile
import unittest
from pathlib import Path

from verify_news import load_articles, verify


class NewsValidationTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        config = self.root / "website/src/config/locales.ts"
        config.parent.mkdir(parents=True)
        config.write_text("""export const locales = {
  root: { lang: 'en' },
  'ar': { lang: 'ar' },
} as const;
""", encoding="utf-8")
        self.news = self.root / "website/src/content/docs/typescript-news"
        (self.news / "2026").mkdir(parents=True)

    def article(self, name="example.mdx", published="2026-04-01"):
        path = self.news / "2026" / name
        path.write_text("""---
title: Example
sidebar:
    hidden: true
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '%s'
---
""" % published, encoding="utf-8")
        return path

    def test_mdx_articles_are_checked_but_archive_pages_are_excluded(self):
        self.article()
        (self.news / "2026/index.mdx").write_text("Archive", encoding="utf-8")
        (self.news / "index.mdx").write_text("Landing", encoding="utf-8")
        self.assertEqual(set(load_articles(self.news)), {"2026/example.mdx"})

    def test_invalid_mdx_dates_are_rejected(self):
        self.article(published="2026-02-30")
        with self.assertRaisesRegex(ValueError, "invalid publication date"):
            load_articles(self.news)

    def test_missing_mdx_translation_is_reported(self):
        self.article()
        errors, _, count = verify(self.root)
        self.assertEqual(count, 1)
        self.assertIn("ar: missing translated article 2026/example.mdx", errors)


if __name__ == "__main__":
    unittest.main()
