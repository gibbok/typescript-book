import re
import sys

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'\s+', '-', text)
    return text

def check_toc(filepath):
    """
    Checks if all links in the TOC section of a markdown file point to existing headers.
    """
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    headers = []
    toc_links = []
    
    # Simple state machine to detect TOC section if needed, 
    # but for now we'll just scan all lines for headers and links.
    # Actually, we should only care about links that look like internal anchors (#...)
    
    for line in lines:
        line = line.strip()
        
        # Detect headers
        header_match = re.match(r'^(#+)\s+(.+)$', line)
        if header_match:
            title = header_match.group(2).strip()
            # Ignore some specific things if needed, but generally:
            anchor = slugify(title)
            headers.append(anchor)
            
        # Detect links
        # simple regex for markdown links [text](#anchor)
        # We perform findall because there might be multiple links in a line (though rare for TOC)
        links = re.findall(r'\[([^\]]+)\]\((#[^)]+)\)', line)
        for text, link in links:
            # clean the link (remove #)
            anchor_ref = link[1:]
            toc_links.append({'text': text, 'ref': anchor_ref})

    # Verify
    broken_links = []
    for link in toc_links:
        if link['ref'] not in headers:
            # Special case: sometimes headers might have duplicate names and some markdown parsers handle it.
            # But normally GitHub appends -1, -2 etc. We might need to handle that if strict.
            # For now, let's just check existence.
            broken_links.append(link)

    return broken_links

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 check_toc.py <path_to_markdown>")
        sys.exit(1)
        
    filepath = sys.argv[1]
    broken = check_toc(filepath)
    
    if broken:
        print(f"Found {len(broken)} broken links:")
        for b in broken:
            print(f"- [{b['text']}](#{b['ref']}) -> Header not found (expected #{b['ref']})")
    else:
        print("No broken links found.")
