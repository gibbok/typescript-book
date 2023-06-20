import * as fs from 'fs-extra';
import * as path from 'path';
import { execSync } from 'child_process';
import * as ts from "typescript";

const TEMP_DIR = 'temp'

function compile(fileNames: string[], options: ts.CompilerOptions): void {
    let program = ts.createProgram(fileNames, options);
    let emitResult = program.emit();

    let allDiagnostics = ts
        .getPreEmitDiagnostics(program)
        .concat(emitResult.diagnostics);

    console.log('xxxxxx', allDiagnostics)

    allDiagnostics.forEach(diagnostic => {
        if (diagnostic.file) {
            let { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start!);
            let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
            console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
        } else {
            console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
        }
    });

    let exitCode = emitResult.emitSkipped ? 1 : 0;
    console.log(`Process exiting with code '${exitCode}'.`);
    fs.removeSync(TEMP_DIR)
    process.exit(exitCode);
}

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

        // console.log(snippet)

        fs.writeFileSync(tempFile, snippet);

        tempFiles.push(tempFile);

        // console.log(tempFiles.length)
        compile(tempFiles, {
            noEmitOnError: true,
            noImplicitAny: true,
            target: ts.ScriptTarget.ES5,
            module: ts.ModuleKind.CommonJS
        })

        // try {
        //     console.log(`Start processing snippet: ${index + 1}`)
        //     execSync(`tsc ${tempFile} --pretty`);
        // } catch (error: any) {
        //     errors.push(`Snippet ${index + 1}:\n${error.stdout}`);
        //     console.log(errors.join('\n'));
        //     fs.removeSync(TEMP_DIR)
        //     process.exit(1)
        // }
    });

    console.log(`No errors, total snippets processed: ${snippets.length}`)
}

const processMarkdownFile = (inputPath: string): void => {
    const markdown = fs.readFileSync(inputPath, 'utf-8');
    const snippets = extractCodeSnippets(markdown);
    compileCode(snippets);
}

const inputPath = 'test.md';

processMarkdownFile(inputPath);