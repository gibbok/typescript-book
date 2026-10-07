"""Check that PDF table borders are limited to the header."""

from pathlib import Path
import re
import unittest


class PdfTableStylesTest(unittest.TestCase):
    def test_only_headers_have_borders(self):
        css = Path(__file__).with_name("pdf-tables.css").read_text()
        css = re.sub(r"/\*.*?\*/", "", css, flags=re.DOTALL)
        bordered_selectors = set()
        for selectors, declarations in re.findall(r"([^{}]+)\{([^{}]*)\}", css):
            for declaration in declarations.split(";"):
                if ":" not in declaration:
                    continue
                property_name, value = map(str.strip, declaration.split(":", 1))
                if property_name.startswith("border") and property_name not in {
                    "border-collapse", "border-spacing"
                } and value not in {"none", "0"}:
                    bordered_selectors.update(map(str.strip, selectors.split(",")))
        self.assertEqual(bordered_selectors, {"table thead th"})


if __name__ == "__main__":
    unittest.main()
