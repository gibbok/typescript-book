#!/usr/bin/env python3
import os
import sys
from pathlib import Path

def verify_concatenation(directory, language_ext):
    """
    Verify that all language files were properly included in the concatenated file
    by comparing total character counts
    """
    dir_path = Path(directory)
    
    if not dir_path.exists():
        print(f"Error: Directory '{directory}' does not exist")
        return False
    
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
    concatenated_filename = f'README-{iso_code}.md'
    
    # Find all files ending with '{language_ext}.md' except the concatenated file
    lang_files = [f for f in dir_path.glob(f'*{language_ext}.md') if f.name != concatenated_filename]
    concatenated_file = dir_path / concatenated_filename
    
    if not concatenated_file.exists():
        print(f"Error: Concatenated file '{concatenated_filename}' not found in '{directory}'")
        return False
    
    if not lang_files:
        print(f"No {language_ext}.md files found in '{directory}'")
        return False
    
    # Sort files alphabetically
    lang_files.sort(key=lambda x: x.name)
    
    # Count characters in individual files
    total_chars = 0
    file_details = []
    
    print(f"Counting characters in {len(lang_files)} {language_ext}.md files:")
    
    for file_path in lang_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                char_count = len(content)
                total_chars += char_count
                file_details.append((file_path.name, char_count))
                print(f"  {file_path.name}: {char_count:,} characters")
        except Exception as e:
            print(f"Error reading {file_path.name}: {e}")
            return False
    
    # Count characters in concatenated file
    try:
        with open(concatenated_file, 'r', encoding='utf-8') as f:
            concatenated_content = f.read()
            concatenated_chars = len(concatenated_content)
    except Exception as e:
        print(f"Error reading concatenated file: {e}")
        return False
    
    # Compare counts
    print(f"\n--- VERIFICATION RESULTS ---")
    print(f"Total characters in {len(lang_files)} individual files: {total_chars:,}")
    print(f"Characters in concatenated file: {concatenated_chars:,}")
    print(f"Difference: {concatenated_chars - total_chars:,}")
    
    if total_chars == concatenated_chars:
        print("✅ SUCCESS: Character counts match exactly!")
        print("All files were properly included in the concatenation.")
        return True
    else:
        print("❌ MISMATCH: Character counts do not match!")
        if concatenated_chars > total_chars:
            print(f"Concatenated file has {concatenated_chars - total_chars:,} extra characters")
        else:
            print(f"Concatenated file is missing {total_chars - concatenated_chars:,} characters")
        return False

def main():
    # Check for language extension argument
    if len(sys.argv) < 2:
        print("Usage: python verify_concatenation.py <language_ext> [directory]")
        print("Example: python verify_concatenation.py ITA")
        print("Example: python verify_concatenation.py ES ../../spa")
        sys.exit(1)
    
    language_ext = sys.argv[1]
    
    # Default to ita folder if no directory argument provided
    if len(sys.argv) > 2:
        directory = sys.argv[2]
    else:
        # From tools/split-md, go up two levels and into ita folder
        directory = "../../ita"
    
    verify_concatenation(directory, language_ext)

if __name__ == "__main__":
    main()