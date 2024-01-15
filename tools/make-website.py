"""
Generate multiple Markdown documents from a single Markdown file, splitting by headings.
This script is used to generate pages on the website.
"""

import os
import re
import shutil

# Test
# INPUT_FILE_PATH = "./test-doc.md"
# OUTPUT_DIR_PATH = "./output"

INPUT_FILE_PATH = "../README.md"
OUTPUT_DIR_PATH = "../website/src/content/docs/en"


def manage_output_folder(path):
    if os.path.exists(path):
        shutil.rmtree(path)
    os.makedirs(path)


def read_content_file(path):
    with open(path, "r") as file:
        lines = file.readlines()
    return lines


def make_file_name(name):
    content_sanitized = re.sub(r"[^a-zA-Z0-9]+", "-", name.lower()).strip("-")
    return f"{content_sanitized}"


def make_output_path(output_folder, file_name):
    return f"{output_folder}/{file_name}.md"


def is_line_header_1_to_2(line):
    return re.match(r"^(#{1,2})\s+(.+)", line)


def make_file_output_path(output_folder, name):
    file_name = make_file_name(name)
    output_file_path = make_output_path(output_folder, file_name)
    return output_file_path


def make_markdown_page_metadata(order, header):
    return [
        "---\n",
        f"title: {header}\n",
        "sidebar:\n",
        f"  order: {order}\n",
        f"  label: {order}. {header}\n",
        "---\n",
        "\n",
    ]


def save_content_to_file(path, content):
    with open(path, "w") as output_file:
        output_file.writelines(content)


def save_pages_to_files(data_pages):
    for data_page in data_pages:
        save_content_to_file(data_page[0], data_page[1])


def split_content_by_headings(lines, output_dir):
    prev_header_line = ""
    current_content = []
    in_page = False
    header_index = -1
    content_result = []

    for line in lines:
        is_header_match = is_line_header_1_to_2(line)
        if is_header_match:
            header_text = is_header_match.group(2).strip()
            header_index += 1
            if not in_page:
                in_page = True
                current_content.extend(
                    make_markdown_page_metadata(header_index + 1, header_text)
                )
                prev_header_line = header_text
            else:
                output_file_path = make_file_output_path(output_dir, prev_header_line)
                content_result.extend([(output_file_path, current_content)])
                current_content = []
                in_page = True
                current_content.extend(
                    make_markdown_page_metadata(header_index + 1, header_text)
                )
                prev_header_line = header_text
        else:
            current_content.append(line)

    header_index += 1
    content_result.extend([(output_file_path, current_content)])

    return content_result


manage_output_folder(OUTPUT_DIR_PATH)

content_lines = read_content_file(INPUT_FILE_PATH)

data_pages = split_content_by_headings(content_lines, OUTPUT_DIR_PATH)

save_pages_to_files(data_pages)
