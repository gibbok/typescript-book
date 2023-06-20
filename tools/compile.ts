import * as fs from 'fs-extra';
import * as path from 'path';
import * as ts from "typescript";
import { marked } from 'marked';

const INPUT_FILE_PATH = '../test.md';
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

type MyToken = marked.Token & {
    text: string
}

function extractCodeSnippets(markdown: string): ReadonlyArray<string> {
    const lexer = new marked.Lexer();
    const tokens = lexer.lex(markdown);
    const snippets = tokens.filter(x => x.type === 'code' && x.lang === 'typescript') as marked.Tokens.Code[]
    const code = snippets.map(x => x.text);
    return code
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

processMarkdownFile(INPUT_FILE_PATH);