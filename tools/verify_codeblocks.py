import re
import sys

def verify_codeblocks(filename):
    """
    Verifies that all code blocks in a markdown file have matching opening and closing fences.
    """
    print(f"Verifying {filename}...")
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            lines = f.readlines()
    except FileNotFoundError:
        print(f"Error: File {filename} not found.")
        sys.exit(1)

    # State
    in_block = False
    block_start_line = -1
    fence_char = ''
    fence_length = 0
    
    errors = []
    
    # Regex for fence
    # Group 1: Leading whitespace
    # Group 2: Fence characters (```... or ~~~...)
    # Group 3: Info string / Rest of line
    fence_pattern = re.compile(r'^(\s*)(`{3,}|~{3,})(.*)$')

    for i, line in enumerate(lines):
        lineno = i + 1
        # Removing only trailing newline to properly check indentation if needed, 
        # though standard markdown parsers effectively ignore indentation <= 3 spaces for fence?
        # We will just strip start for the regex match to be simple, but keep strictly to start of line logic if we want to be precise.
        # Actually proper fence must be at start of line (possibly indented up to 3 spaces).
        
        match = fence_pattern.match(line)
        
        if match:
            matched_indent = match.group(1)
            matched_fence = match.group(2)
            matched_rest = match.group(3).strip()
            
            # If we support indented blocks, we should check len(matched_indent) < 4
            # For this repo, assuming standard formatting.
            
            current_fence_char = matched_fence[0]
            current_fence_length = len(matched_fence)
            
            if not in_block:
                # Opening a block
                in_block = True
                block_start_line = lineno
                fence_char = current_fence_char
                fence_length = current_fence_length
                # We don't check matched_rest (info string) for opening
            else:
                # We are in a block. Check if this is a valid closing fence.
                # Must be same char
                # Must be at least as long
                # Must not have info string (except spaces)
                
                if current_fence_char == fence_char and current_fence_length >= fence_length:
                    # It qualifies as a closing fence if rest is empty
                    if matched_rest == "":
                        in_block = False
                        block_start_line = -1
                    else:
                        # Technically it could be a closing fence with garbage, or just code?
                        # CommonMark: "The closing code fence ... may be followed only by spaces"
                        if matched_rest == "":
                            in_block = False
                            block_start_line = -1
                        else:
                            # If it has content, it is NOT a closing fence, it's part of the code block.
                            # BUT, if the user intended it to be a close and messed up, we might miss it.
                            # However, strict parser says it's code.
                            pass
                else:
                    # Different fence inside code block -> treated as content
                    pass

    if in_block:
        errors.append(f"Error: Unclosed code block starting at line {block_start_line}")
        # To help debugging, print the last few lines or context?
        # User just wants the report.
        
    with open("verification_report.md", "w") as report:
        report.write("# Code Block Verification Report\n\n")
        report.write(f"File verified: {filename}\n\n")
        if errors:
            print("Found issues:")
            report.write("## Issues Found\n\n")
            for e in errors:
                print(e)
                report.write(f"- {e}\n")
            sys.exit(1)
        else:
            print("Verification passed! No mismatched code blocks found.")
            report.write("## Status\n\nPASSED: No mismatched code blocks found.\n")
            sys.exit(0)

if __name__ == "__main__":
    target_file = "README-it_IT.md"
    if len(sys.argv) > 1:
        target_file = sys.argv[1]
    verify_codeblocks(target_file)
