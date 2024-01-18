"""
Generate multiple Markdown documents from a single Markdown file by splitting it based on headings. 
This script is designed for creating pages on a website and provides results for multiple languages.
Note: the number of headings per language must be the same.
"""

import os
import re
import shutil
from typing import NewType, List

ContentType = NewType("ContentType", List[str])

# INPUT_FILE_PATH = "./test-md/README.md"
# OUTPUT_DIR_PATH = "./test-md/en"
# INPUT_FILE_PATH_CN = "./test-md/README-zh_CN.md"
# OUTPUT_DIR_PATH_CN = "./test-md/zh-cn"

INPUT_FILE_PATH = "../README.md"
OUTPUT_DIR_PATH = "../website/src/content/docs/book"

INPUT_FILE_PATH_CN = "../README-zh_CN.md"
OUTPUT_DIR_PATH_CN = "../website/src/content/docs/zh-cn/book"


def manage_output_dir(path: str) -> None:
    if os.path.exists(path):
        shutil.rmtree(path)
    os.makedirs(path)


def read_content_file(path: str) -> ContentType:
    with open(path, "r") as file:
        lines = file.readlines()
    return lines


def make_file_name(name: str) -> str:
    content_sanitized = re.sub(r"[^a-zA-Z0-9]+", "-", name.lower()).strip("-")
    return f"{content_sanitized}"


def make_output_path(output_dir: str, file_name: str):
    return f"{output_dir}/{file_name}.md"


def is_line_header_1_to_2(line: str) -> bool:
    return re.match(r"^(#{1,2})\s+(.+)", line)


def make_file_output_path(output_dir: str, name: str) -> str:
    file_name = make_file_name(name)
    output_file_path = make_output_path(output_dir, file_name)
    return output_file_path


def make_markdown_page_metadata(order: int, header: str) -> ContentType:
    return [
        "---\n",
        f"title: {header}\n",
        "sidebar:\n",
        f"  order: {order}\n",
        f"  label: {order}. {header}\n",
        "---\n",
        "\n",
    ]


def save_content_to_file(path: str, lines: ContentType):
    with open(path, "w") as output_file:
        output_file.writelines(lines)


def save_pages_to_files(
    data_pages: List[ContentType], master_headers: ContentType, output_dir: str
) -> None:
    for index, header in enumerate(master_headers):
        file = make_file_output_path(output_dir, header)
        save_content_to_file(file, data_pages[index])


def find_master_headers(lines: ContentType) -> ContentType:
    headers = [x for x in lines if is_line_header_1_to_2(x)]
    headers_clean = list(map(lambda x: make_file_name(x), headers))
    return headers_clean


def remove_markdown_anchors(markdown_text: str):
    pattern = r"\[(.*?)\]\(#[^\)]*\)"
    replacement = r"\1"
    transformed_text = re.sub(pattern, replacement, markdown_text)
    return transformed_text


def split_content_by_headings(lines: ContentType):
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
            else:
                content_result.extend([current_content])
                current_content = []
                in_page = True
                current_content.extend(
                    make_markdown_page_metadata(header_index + 1, header_text)
                )
        else:
            line_new = remove_markdown_anchors(line)
            current_content.append(line_new)

    header_index += 1
    content_result.extend([current_content])

    return content_result


content_lines_master = read_content_file(INPUT_FILE_PATH)
master_headers = find_master_headers(content_lines_master)


def process(base_input: str, base_output: str) -> None:
    manage_output_dir(base_output)
    content_lines = read_content_file(base_input)
    data_pages = split_content_by_headings(
        content_lines,
    )
    save_pages_to_files(data_pages, master_headers, base_output)
    print(f"A total of: {len(master_headers)} files were at: {base_output}")


process(INPUT_FILE_PATH, OUTPUT_DIR_PATH)

process(INPUT_FILE_PATH_CN, OUTPUT_DIR_PATH_CN)
