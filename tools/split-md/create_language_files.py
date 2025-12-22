#!/usr/bin/env python3
import os
import sys
import re
from pathlib import Path

def split_readme_to_folder(readme_path, target_folder):
    """Split README.md and save parts directly to target folder"""
    from split_markdown import split_markdown
    
    # Create target folder if it doesn't exist
    Path(target_folder).mkdir(parents=True, exist_ok=True)
    
    # Split README and save parts to target folder
    split_markdown(readme_path, target_folder)

def create_language_files(folder_path, language_ext):
    folder_path = os.path.abspath(folder_path)
    if not os.path.exists(folder_path):
        print(f"Error: Folder '{folder_path}' does not exist")
        return
    
    print(f"Scanning folder: {folder_path}")
    print(f"Creating files with extension: {language_ext}")
    
    for filename in os.listdir(folder_path):
        match = re.match(r'README-part-(\d+)\.md$', filename)
        if match:
            number = match.group(1)
            lang_filename = f'README-part-{number}-{language_ext}.md'
            lang_filepath = os.path.join(folder_path, lang_filename)
            
            if not os.path.exists(lang_filepath):
                with open(lang_filepath, 'w', encoding='utf-8') as f:
                    pass  # Create empty file
                print(f'Created: {lang_filename}')

if __name__ == "__main__":
    # Check for language extension argument
    if len(sys.argv) < 2:
        print("Usage: python create_language_files.py <language_ext> [folder_path]")
        print("Example: python create_language_files.py ITA")
        print("Example: python create_language_files.py FR ../../fra")
        sys.exit(1)
    
    language_ext = sys.argv[1]
    
    # Default to ita folder if no folder argument provided
    if len(sys.argv) > 2:
        folder_path = sys.argv[2]
    else:
        # From tools/split-md, go up two levels and into ita folder
        folder_path = "../../ita"
    
    # First, split README.md into the target folder
    readme_path = "../../README.md"
    if os.path.exists(readme_path):
        print(f"Splitting README.md into {folder_path}...")
        split_readme_to_folder(readme_path, folder_path)
    
    # Then create language files
    create_language_files(folder_path, language_ext)