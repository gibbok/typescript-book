#!/usr/bin/env python3
import os
import sys
from pathlib import Path

def concatenate_language_files(directory, language_ext):
    """
    Find all files ending with '{language_ext}.md', sort them alphabetically,
    and concatenate them into README-{iso_code}.md
    """
    # Convert to Path object for easier handling
    dir_path = Path(directory)
    
    # Check if directory exists
    if not dir_path.exists():
        print(f"Error: Directory '{directory}' does not exist")
        return False
    
    # Find all files ending with '{language_ext}.md'
    lang_files = list(dir_path.glob(f'*{language_ext}.md'))
    
    if not lang_files:
        print(f"No files ending with '{language_ext}.md' found in '{directory}'")
        return False
    
    # Sort files alphabetically by filename
    lang_files.sort(key=lambda x: x.name)
    
    # Print sorted list of files
    print("Files found and sorted alphabetically:")
    for file in lang_files:
        print(f"  {file.name}")
    
    # Map language extensions to ISO codes
    lang_map = {
        'ITA': 'it_IT',
        'ES': 'es_ES', 
        'FR': 'fr_FR',
        'DE': 'de_DE',
        'PT': 'pt_PT',
        'RU': 'ru_RU',
        'JA': 'ja_JP',
        'KO': 'ko_KR',
        'ZH': 'zh_CN'
    }
    
    iso_code = lang_map.get(language_ext, language_ext.lower())
    output_file = dir_path / f'README-{iso_code}.md'
    
    # Concatenate all files
    try:
        with open(output_file, 'w', encoding='utf-8') as outfile:
            for i, file_path in enumerate(lang_files):
                print(f"Processing: {file_path.name}")
                
                with open(file_path, 'r', encoding='utf-8') as infile:
                    content = infile.read()
                    outfile.write(content)
                    
                    # Add newline between files (except for the last one)
                    if i < len(lang_files) - 1:
                        outfile.write('\n')
        
        print(f"\nSuccess! Created '{output_file.name}' with {len(lang_files)} files concatenated.")
        return True
        
    except Exception as e:
        print(f"Error writing to output file: {e}")
        return False

def main():
    # Check for language extension argument
    if len(sys.argv) < 2:
        print("Usage: python concatenate_language_files.py <language_ext> [directory]")
        print("Example: python concatenate_language_files.py ITA")
        print("Example: python concatenate_language_files.py ES ../../spa")
        sys.exit(1)
    
    language_ext = sys.argv[1]
    
    # Default to ita folder if no directory argument provided
    if len(sys.argv) > 2:
        directory = sys.argv[2]
    else:
        # From tools/split-md, go up two levels and into ita folder
        directory = "../../ita"
    
    concatenate_language_files(directory, language_ext)

if __name__ == "__main__":
    main()