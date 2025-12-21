#!/usr/bin/env python3
import os
import sys
from pathlib import Path

def verify_concatenation_detailed(directory, language_ext):
    """
    Verify concatenation with detailed analysis including newlines between files
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
    print(f"Analyzing {len(lang_files)} {language_ext}.md files:")
    
    for file_path in lang_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                char_count = len(content)
                total_chars += char_count
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
    
    # Calculate expected characters with newlines between files
    # The concatenation script adds newlines between files (n-1 newlines for n files)
    expected_newlines = len(lang_files) - 1
    expected_total = total_chars + expected_newlines
    
    # Results
    print(f"\n--- DETAILED VERIFICATION RESULTS ---")
    print(f"Individual files: {len(lang_files)} files")
    print(f"Total characters in individual files: {total_chars:,}")
    print(f"Expected newlines between files: {expected_newlines}")
    print(f"Expected total with newlines: {expected_total:,}")
    print(f"Actual concatenated file characters: {concatenated_chars:,}")
    print(f"Difference: {concatenated_chars - expected_total:,}")
    
    if concatenated_chars == expected_total:
        print("✅ SUCCESS: Character counts match perfectly!")
        print("All files were properly concatenated with correct newlines.")
        return True
    elif concatenated_chars == total_chars:
        print("✅ SUCCESS: Character counts match exactly!")
        print("All files were concatenated without additional newlines.")
        return True
    else:
        print("❌ MISMATCH: Character counts do not match expected values!")
        if concatenated_chars > expected_total:
            print(f"Concatenated file has {concatenated_chars - expected_total:,} unexpected extra characters")
        else:
            print(f"Concatenated file is missing {expected_total - concatenated_chars:,} characters")
        
        # Additional analysis
        if abs(concatenated_chars - total_chars) < 100:
            print("Note: Small difference likely due to newline handling between files.")
        
        return False

def main():
    # Check for language extension argument
    if len(sys.argv) < 2:
        print("Usage: python verify_concatenation_detailed.py <language_ext> [directory]")
        print("Example: python verify_concatenation_detailed.py ITA")
        print("Example: python verify_concatenation_detailed.py ES ../../spa")
        sys.exit(1)
    
    language_ext = sys.argv[1]
    
    # Default to ita folder if no directory argument provided
    if len(sys.argv) > 2:
        directory = sys.argv[2]
    else:
        # From tools/split-md, go up two levels and into ita folder
        directory = "../../ita"
    
    verify_concatenation_detailed(directory, language_ext)

if __name__ == "__main__":
    main()