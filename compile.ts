import * as fs from 'fs-extra';
import * as path from 'path';
import * as ts from "typescript";

const TEMP_DIR = 'temp'

function compileTempFiles(fileNames: ReadonlyArray<string>, options: ts.CompilerOptions): void {
    let program = ts.createProgram(fileNames, options);
    let emitResult = program.emit();

    const allDiagnostics = ts
        .getPreEmitDiagnostics(program)
        .concat(emitResult.diagnostics);

    allDiagnostics.forEach(diagnostic => {
        if (diagnostic.file) {
            const { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start!);
            const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
            console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
        } else {
            console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
        }
    });

    const exitCode = emitResult.emitSkipped ? 1 : 0;
    fs.removeSync(TEMP_DIR)
    console.log(`Process exiting with code '${exitCode}'.`);
    process.exit(exitCode);
}

function extractCodeSnippets(markdown: string): ReadonlyArray<string> {
    const codeRegex = /```typescript([\s\S]*?)```/g;

    const snippets: string[] = [];
    let match;

    while ((match = codeRegex.exec(markdown)) !== null) {
        snippets.push(match[1].trim());
    }

    console.log(`Number of snippets: ${snippets.length}`)

    return snippets;
}

function makeTempFiles(snippets: ReadonlyArray<string>): void {
    fs.ensureDirSync(TEMP_DIR);

    const tempFiles: string[] = [];

    snippets.forEach((snippet, index) => {
        const tempFile = path.join(__dirname, `temp/temp_${index}.ts`);

        fs.writeFileSync(tempFile, snippet);

        tempFiles.push(tempFile);

        compileTempFiles(tempFiles, {
            noEmitOnError: true,
            noImplicitAny: true,
            target: ts.ScriptTarget.ES5,
            module: ts.ModuleKind.CommonJS
        })
    });
}

function processMarkdownFile(inputPath: string): void {
    const markdown = fs.readFileSync(inputPath, 'utf-8');
    const snippets = extractCodeSnippets(markdown);
    makeTempFiles(snippets);
}

const inputPath = 'test.md';

processMarkdownFile(inputPath);