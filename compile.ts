import * as fs from 'fs-extra';
import * as path from 'path';
import { ExecException, execSync } from 'child_process';

const TEMP_DIR = 'temp'

const extractCodeSnippets = (markdown: string): ReadonlyArray<string> => {
    const codeRegex = /```typescript([\s\S]*?)```/g;
    const snippets: string[] = [];
    let match;

    while ((match = codeRegex.exec(markdown)) !== null) {
        snippets.push(match[1].trim());
    }

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
            execSync(`tsc ${tempFile} --pretty`);
        } catch (error: any) {
            errors.push(`Snippet ${index + 1}:\n${error.stdout}`);
        }
    });

    fs.removeSync(TEMP_DIR)

    if (errors.length > 0) {
        console.log(errors.join('\n'));
        process.exit(1)
    } else {
        console.log(`No errors, total snippets processed: ${snippets.length}`)
    }
}

const processMarkdownFile = (inputPath: string): void => {
    const markdown = fs.readFileSync(inputPath, 'utf-8');
    const snippets = extractCodeSnippets(markdown);
    compileCode(snippets);
}

const inputPath = 'test.md';

processMarkdownFile(inputPath);