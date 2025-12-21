# Markdown Split and Translation Tools

This directory contains Python scripts for splitting, translating, and managing markdown documentation files.

## Scripts Overview

### 1. `split_markdown.py`
Splits a large markdown file into smaller parts based on character count.

**Usage:**
```bash
# Split root README.md and save parts in current directory (default)
python3 split_markdown.py

# Split a specific file and save parts in current directory
python3 split_markdown.py path/to/file.md

# Split and save parts in specific directory
python3 split_markdown.py ../../README.md ../../target_folder
```

**Output:** Creates files named `README-part-01.md`, `README-part-02.md`, etc.

---

### 2. `create_language_files.py`
Automatically splits README.md into the target language folder and creates empty translation files.

**Usage:**
```bash
# Create Italian translation files (splits README.md into ../../ita)
python3 create_language_files.py ITA

# Create French translation files in specific folder
python3 create_language_files.py FR ../../fra

# Create Spanish translation files
python3 create_language_files.py ES ../../spa
```

**Output:** 
1. Splits README.md and saves parts in the target language folder
2. Creates empty translation files: `README-part-01-ITA.md`, `README-part-02-ITA.md`, etc.

---

### 3. `concatenate_language_files.py`
Concatenates all translated part files into a single file.

**Usage:**
```bash
# Concatenate Italian files in ../../ita (default)
python3 concatenate_language_files.py ITA

# Concatenate Spanish files in specific directory
python3 concatenate_language_files.py ES ../../spa

# Concatenate French files
python3 concatenate_language_files.py FR ../../fra
```

**Output:** Creates `README-it_IT.md`, `README-es_ES.md`, etc. containing all parts concatenated.

---

### 4. `verify_concatenation.py`
Verifies that all part files were included in the concatenated file by comparing character counts.

**Usage:**
```bash
# Verify Italian files in ../../ita (default)
python3 verify_concatenation.py ITA

# Verify Spanish files in specific directory
python3 verify_concatenation.py ES ../../spa
```

**Output:** Shows character count comparison and reports any mismatches.

---

### 5. `verify_concatenation_detailed.py`
Enhanced verification that accounts for newlines added between files.

**Usage:**
```bash
# Verify Italian files in ../../ita (default)
python3 verify_concatenation_detailed.py ITA

# Verify Spanish files in specific directory
python3 verify_concatenation_detailed.py ES ../../spa
```

**Output:** Detailed analysis including expected newlines and precise character counts.

---

## Complete Workflow Example

### For Italian Translation:

```bash
cd tools/split-md

# Step 1: Create Italian folder, split README.md, and create translation files
python3 create_language_files.py ITA

# Step 2: Translate each README-part-XX-ITA.md file manually

# Step 3: Concatenate all translated parts
python3 concatenate_language_files.py ITA

# Step 4: Verify the concatenation
python3 verify_concatenation_detailed.py ITA
```

### For Spanish Translation:

```bash
cd tools/split-md

# Step 1: Create Spanish folder, split README.md, and create translation files
python3 create_language_files.py ES ../../spa

# Step 2: Translate each README-part-XX-ES.md file manually

# Step 3: Concatenate all translated parts
python3 concatenate_language_files.py ES ../../spa

# Step 4: Verify the concatenation
python3 verify_concatenation_detailed.py ES ../../spa
```

---

## File Naming Conventions

- **Source parts:** `README-part-01.md`, `README-part-02.md`, ...
- **Translation parts:** `README-part-01-{LANG}.md`, `README-part-02-{LANG}.md`, ...
- **Final concatenated:** `README-{lang}_{COUNTRY}.md` (e.g., `README-it_IT.md`, `README-fr_FR.md`)

Language codes follow ISO 639-1 (language) and ISO 3166-1 (country) standards.

---

## AI Assistant Prompt for Translation Workflow

**Copy and paste this prompt to an AI assistant to automate the complete translation workflow:**

```
I need you to help me create a translation workflow for a TypeScript documentation book. Here's what I need you to do:

1. Navigate to the tools/split-md directory
2. Follow the complete workflow for creating a new language translation
3. Use language code [LANGUAGE_CODE] and target directory ../../[LANGUAGE_FOLDER]
4. Execute all steps including verification
5. Add sample translated content to the first 2-3 files for testing
6. Provide a detailed report of the results

The workflow steps are:
- Step 1: Run `python3 create_language_files.py [LANGUAGE_CODE] ../../[LANGUAGE_FOLDER]`
- Step 2: Add sample translated content to first few files
- Step 3: Run `python3 concatenate_language_files.py [LANGUAGE_CODE] ../../[LANGUAGE_FOLDER]`
- Step 4: Run `python3 verify_concatenation_detailed.py [LANGUAGE_CODE] ../../[LANGUAGE_FOLDER]`

Replace [LANGUAGE_CODE] with the target language code (e.g., DE, FR, ES, CZ, PT, RU, JA, KO) and [LANGUAGE_FOLDER] with the appropriate folder name (e.g., deu, fra, spa, cze, por, rus, jpn, kor).

Expected results:
- Multiple part files created in language folder (number depends on README.md size)
- Equal number of empty translation files created
- Sample content added to test files
- Successful concatenation with proper ISO naming
- Perfect verification match including newlines
- All files organized in language-specific directory (not root)

Please execute this workflow and provide a summary report of the results.
```

**Example usage:**
- For German: Replace [LANGUAGE_CODE] with `DE` and [LANGUAGE_FOLDER] with `deu`
- For Portuguese: Replace [LANGUAGE_CODE] with `PT` and [LANGUAGE_FOLDER] with `por`
- For Russian: Replace [LANGUAGE_CODE] with `RU` and [LANGUAGE_FOLDER] with `rus`

---

## Requirements

- Python 3.6+
- No external dependencies required

---

## Notes

- All scripts are designed to run from the `tools/split-md` directory
- Default paths assume the project structure: `typescript-book/tools/split-md/`
- Maximum characters per split: 3,500 (configurable in `split_markdown.py`)
- Concatenation adds newlines between files for proper formatting
