"""
Generate multiple Markdown documents from a single Markdown file by splitting it based on headings. 
This script is designed for creating pages on a website and provides results for multiple languages.
Note: the number of headings per language must be the same.
"""

import os
import re
import shutil
from typing import Dict, List, Match


# INPUT_FILE_PATH = "./test-md/README.md"
# OUTPUT_DIR_PATH = "./test-md/en"
# INPUT_FILE_PATH_CN = "./test-md/README-zh_CN.md"
# OUTPUT_DIR_PATH_CN = "./test-md/zh-cn"

INPUT_FILE_PATH = "../README.md"
OUTPUT_DIR_PATH = "../website/src/content/docs/book"

INPUT_FILE_PATH_CN = "../README-zh_CN.md"
OUTPUT_DIR_PATH_CN = "../website/src/content/docs/zh-cn/book"

INPUT_FILE_PATH_IT = "../README-it_IT.md"
OUTPUT_DIR_PATH_IT = "../website/src/content/docs/it-it/book"

INPUT_FILE_PATH_PT = "../README-pt_BR.md"
OUTPUT_DIR_PATH_PT = "../website/src/content/docs/pt-br/book"

INPUT_FILE_PATH_SV = "../README-sv_SE.md"
OUTPUT_DIR_PATH_SV = "../website/src/content/docs/sv-se/book"

INPUT_FILE_PATH_BG = "../README-bg_BG.md"
OUTPUT_DIR_PATH_BG = "../website/src/content/docs/bg-bg/book"


def manage_output_dir(path: str) -> None:
    if os.path.exists(path):
        shutil.rmtree(path)
    os.makedirs(path)


def read_content_file(path: str) -> List[str]:
    with open(path, "r", encoding="utf-8") as file:
        lines = file.readlines()
    return lines


def make_file_name(name: str) -> str:
    content_sanitized = re.sub(r"[^a-zA-Z0-9]+", "-", name.lower()).strip("-")
    return f"{content_sanitized}"


def make_output_path(output_dir: str, file_name: str):
    return f"{output_dir}/{file_name}.md"


def is_line_header_1_to_2(line: str) -> bool:
    return re.match(r"^(#{1,2})\s+(.+)", line)


def is_line_header(line: str) -> Match[str] | None:
    return re.match(r"^(#{1,6})\s+(.+)", line)


def make_file_output_path(output_dir: str, name: str) -> str:
    file_name = make_file_name(name)
    output_file_path = make_output_path(output_dir, file_name)
    return output_file_path


def make_markdown_page_metadata(order: int, header: str) -> List[str]:
    return [
        "---\n",
        f"title: {header}\n",
        "sidebar:\n",
        f"  order: {order}\n",
        f"  label: {order}. {header}\n",
        "---\n",
        "\n",
    ]


def save_content_to_file(path: str, lines: List[str]):
    with open(path, "w", encoding="utf-8") as output_file:
        output_file.writelines(lines)


def save_pages_to_files(
    data_pages: List[List[str]], master_headers: List[str], output_dir: str
) -> None:
    for index, header in enumerate(master_headers):
        file = make_file_output_path(output_dir, header)
        save_content_to_file(file, data_pages[index])


def find_master_headers(lines: List[str]) -> List[str]:
    headers = [x for x in lines if is_line_header_1_to_2(x)]
    headers_clean = list(map(lambda x: make_file_name(x), headers))
    return headers_clean


def find_page_heading_levels(lines: List[str]) -> List[int]:
    return [
        len(header_match.group(1))
        for line in lines
        if (header_match := is_line_header_1_to_2(line))
    ]


def validate_page_headings(
    master_lines: List[str], content_lines: List[str], input_lang_path: str
) -> None:
    master_levels = find_page_heading_levels(master_lines)
    content_levels = find_page_heading_levels(content_lines)
    if len(master_levels) != len(content_levels):
        raise ValueError(
            f"{input_lang_path} has {len(content_levels)} page headings, "
            f"but the master file has {len(master_levels)}."
        )

    for index, (master_level, content_level) in enumerate(
        zip(master_levels, content_levels), start=1
    ):
        if master_level != content_level:
            raise ValueError(
                f"{input_lang_path} page heading {index} has level {content_level}, "
                f"but the master file has level {master_level}."
            )


def make_anchor_slug(text: str, anchor_counts: Dict[str, int]) -> str:
    anchor = re.sub(r"[^\w\s-]", "", text.lower())
    anchor = re.sub(r"\s+", "-", anchor).strip("-")
    count = anchor_counts.get(anchor, 0)
    anchor_counts[anchor] = count + 1
    if count == 0:
        return anchor
    return f"{anchor}-{count}"


def make_page_anchor_links(lines: List[str], master_headers: List[str]) -> Dict[str, str]:
    anchor_links = {}
    global_anchor_counts: Dict[str, int] = {}
    page_anchor_counts: Dict[str, int] = {}
    current_page = None
    page_index = -1

    for line in lines:
        header_match = is_line_header(line)
        if not header_match:
            continue

        header_level = len(header_match.group(1))
        header_text = header_match.group(2).strip()
        source_anchor = make_anchor_slug(header_text, global_anchor_counts)

        if header_level <= 2:
            page_index += 1
            current_page = master_headers[page_index]
            page_anchor_counts = {}
            anchor_links[source_anchor] = f"../{current_page}/"
        elif current_page is not None:
            target_anchor = make_anchor_slug(header_text, page_anchor_counts)
            anchor_links[source_anchor] = f"../{current_page}/#{target_anchor}"

    return anchor_links


def rewrite_markdown_anchor_links(
    markdown_text: str, anchor_links: Dict[str, str]
) -> str:
    pattern = r"(?<!!)\[([^\]]+)\]\(#([^\)]*)\)"

    def replace_anchor_link(match: Match[str]) -> str:
        text = match.group(1)
        anchor = match.group(2)
        if anchor not in anchor_links:
            raise ValueError(f"Cannot map Markdown anchor link: {match.group(0)}")
        return f"[{text}]({anchor_links[anchor]})"

    return re.sub(pattern, replace_anchor_link, markdown_text)


def split_content_by_headings(lines: List[str], anchor_links: Dict[str, str]):
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
            line_new = rewrite_markdown_anchor_links(line, anchor_links)
            current_content.append(line_new)

    header_index += 1
    content_result.extend([current_content])

    return content_result


def process(base_input_path, input_lang_path: str, base_output_path: str) -> None:
    manage_output_dir(base_output_path)

    content_lines_master = read_content_file(base_input_path)
    master_headers = find_master_headers(content_lines_master)

    content_lines = read_content_file(input_lang_path)
    validate_page_headings(content_lines_master, content_lines, input_lang_path)
    anchor_links = make_page_anchor_links(content_lines, master_headers)
    data_pages = split_content_by_headings(
        content_lines,
        anchor_links,
    )
    save_pages_to_files(data_pages, master_headers, base_output_path)
    print(f"A total of: {len(master_headers)} files were at: {base_output_path}")


process(INPUT_FILE_PATH, INPUT_FILE_PATH, OUTPUT_DIR_PATH)

process(INPUT_FILE_PATH, INPUT_FILE_PATH_CN, OUTPUT_DIR_PATH_CN)

process(INPUT_FILE_PATH, INPUT_FILE_PATH_IT, OUTPUT_DIR_PATH_IT)

process(INPUT_FILE_PATH, INPUT_FILE_PATH_PT, OUTPUT_DIR_PATH_PT)

process(INPUT_FILE_PATH, INPUT_FILE_PATH_SV, OUTPUT_DIR_PATH_SV)

process(INPUT_FILE_PATH, INPUT_FILE_PATH_BG, OUTPUT_DIR_PATH_BG)
