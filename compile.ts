import * as fs from 'fs-extra';
import * as path from 'path';
import { execSync } from 'child_process';

const TEMP_DIR = 'temp'

const extractCodeSnippets = (markdown: string): ReadonlyArray<string> => {
    const codeRegex = /```typescript([\s\S]*?)```/g;

    const snippets: string[] = [];
    let match;

    while ((match = codeRegex.exec(markdown)) !== null) {
        snippets.push(match[1].trim());
    }

    console.log(`Number of snippets: ${snippets.length}`)
    return snippets;
}

const compileCode = (snippets: ReadonlyArray<string>): void => {
    fs.ensureDirSync(TEMP_DIR);

    const errors: string[] = [];
    const tempFiles: string[] = [];

    snippets.forEach((snippet, index) => {
        const tempFile = path.join(__dirname, `temp/temp_${index}.ts`);

        fs.writeFileSync(tempFile, snippet);

        tempFiles.push(tempFile);

        try {
            console.log(`Start processing snippet: ${index + 1}`)
            execSync(`tsc ${tempFile} --pretty`);
        } catch (error: any) {
            errors.push(`Snippet ${index + 1}:\n${error.stdout}`);
            console.log(errors.join('\n'));
            fs.removeSync(TEMP_DIR)
            process.exit(1)
        }
    });

    console.log(`No errors, total snippets processed: ${snippets.length}`)
}

const processMarkdownFile = (inputPath: string): void => {
    const markdown = fs.readFileSync(inputPath, 'utf-8');
    const snippets = extractCodeSnippets(markdown);
    compileCode(snippets);
}

const inputPath = 'README.md';

processMarkdownFile(inputPath);