import * as fs from 'fs-extra';
import * as path from 'path';
import * as ts from "typescript";
import { marked } from 'marked';
import { pipe } from 'fp-ts/function'

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

const isTypeScriptCode = (token: marked.Token): token is marked.Tokens.Code => token.type === 'code' && token.lang === 'typescript';

const extractCodeSnippets = (markdown: string): ReadonlyArray<string> =>
    pipe(
        new marked.Lexer(),
        lexer => lexer.lex(markdown),
        tokens => tokens.filter(isTypeScriptCode),
        codes => codes.map(x => x.text)
    )


const makeTempFiles = (snippets: ReadonlyArray<string>): ReadonlyArray<string> =>
    snippets.reduce<ReadonlyArray<string>>((acc, snippet, index) => {
        const tempFile = path.join(__dirname, `temp/temp_${index}.ts`);
        fs.writeFileSync(tempFile, snippet);
        return [
            ...acc,
            tempFile
        ]
    }, [])

const processMarkdownFile = (inputPath: string): void => {
    fs.ensureDirSync(TEMP_DIR);

    pipe(
        fs.readFileSync(inputPath, 'utf-8'),
        markdown => extractCodeSnippets(markdown),
        snippets => makeTempFiles(snippets),
        tempFiles => compileTempFiles(tempFiles, {
            noEmitOnError: true,
            noImplicitAny: true,
            target: ts.ScriptTarget.ES5,
            module: ts.ModuleKind.CommonJS
        }),
    )
}

processMarkdownFile(INPUT_FILE_PATH);