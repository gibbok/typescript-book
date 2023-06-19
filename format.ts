import * as prettier from 'prettier';
import * as fs from 'fs';
import * as path from 'path';

function extractCodeBlocks(markdown: string): string[] {
    const codeBlocks: string[] = [];
    const codeBlockRegex = /```typescript([\s\S]*?)```/g;

    let match;
    while ((match = codeBlockRegex.exec(markdown)) !== null) {
        const code = match[1].trim();
        codeBlocks.push(code);
    }

    return codeBlocks;
}

function formatCode(code: string): string {
    const options = prettier.resolveConfig.sync(process.cwd());
    return prettier.format(code, { ...options, parser: 'typescript' });
}

function processMarkdownFile(filePath: string): void {
    const markdown = fs.readFileSync(filePath, 'utf-8');
    const codeBlocks = extractCodeBlocks(markdown);

    codeBlocks.forEach((code, index) => {
        const formattedCode = formatCode(code);
        console.log(`Code block ${index + 1}:`);
        console.log(formattedCode);
        console.log('\n');
    });
}

const inputFilePath = './README.md';
processMarkdownFile(inputFilePath)