#!/usr/bin/env python3
import sys
import os
from pathlib import Path

def split_markdown(file_path, output_dir=None, max_chars=3500):
    """
    Splits a markdown file into smaller parts based on a maximum character count.
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if len(content) <= max_chars:
        print(f"File is already under {max_chars} characters. No splitting needed.")
        return
    
    # Determine output directory
    if output_dir:
        output_path = Path(output_dir)
        output_path.mkdir(parents=True, exist_ok=True)
        base_name = Path(file_path).stem  # Get filename without extension
        base_path = output_path / base_name
    else:
        base_path = Path(file_path).with_suffix('')  # Remove extension
    
    parts = []
    current_part = ""
    
    lines = content.split('\n')
    
    for line in lines:
        test_part = current_part + ('\n' if current_part else '') + line
        
        if len(test_part) <= max_chars:
            current_part = test_part
        else:
            if current_part:
                parts.append(current_part)
            current_part = line
    
    if current_part:
        parts.append(current_part)
    
    for i, part in enumerate(parts, 1):
        part_filename = f"{base_path}-part-{i:02d}.md"
        with open(part_filename, 'w', encoding='utf-8') as f:
            f.write(part)
        print(f"Created: {part_filename} ({len(part)} characters)")

if __name__ == "__main__":
    # Parse arguments: file_path [output_directory]
    if len(sys.argv) > 2:
        file_path = sys.argv[1]
        output_dir = sys.argv[2]
    elif len(sys.argv) > 1:
        file_path = sys.argv[1]
        output_dir = None
    else:
        # Default: split root README.md and save parts in current directory
        file_path = "../../README.md"
        output_dir = None
    
    if not os.path.exists(file_path):
        print(f"Error: File '{file_path}' not found.")
        sys.exit(1)
    
    split_markdown(file_path, output_dir)