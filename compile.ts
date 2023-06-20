import * as fs from 'fs-extra';
import * as path from 'path';
import { execSync } from 'child_process';

function extractCodeSnippets(markdown: string): string[] {
    const codeRegex = /```typescript([\s\S]*?)```/g;
    const snippets: string[] = [];
    let match;

    while ((match = codeRegex.exec(markdown)) !== null) {
        snippets.push(match[1].trim());
    }

    return snippets;
}

function compileCode(snippets: string[], outputPath: string): void {
    const errors: string[] = [];
    const tempFiles: string[] = [];

    snippets.forEach((snippet, index) => {
        const tempFile = path.join(__dirname, `temp/temp_${index}.ts`);

        fs.writeFileSync(tempFile, snippet);
        tempFiles.push(tempFile);

        try {
            execSync(`tsc ${tempFile} --pretty`, { encoding: 'utf8' });
        } catch (error: unknown) {
            //@ts-ignore
            errors.push(`Snippet ${index + 1}:\n${error.stdout}`);
        }

        console.log(outputPath, errors.join('\n\n'));
        if (errors.length > 0) {
            process.exit(1)
        }

        fs.emptyDir('temp')

    });
}

function processMarkdownFile(inputPath: string, outputPath: string): void {
    const markdown = fs.readFileSync(inputPath, 'utf-8');
    const snippets = extractCodeSnippets(markdown);
    compileCode(snippets, outputPath);
}

// Usage example:
const inputPath = 'test.md';
const outputPath = 'errors.txt';

processMarkdownFile(inputPath, outputPath);