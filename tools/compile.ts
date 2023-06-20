import * as fs from 'fs-extra';
import * as path from 'path';
import * as ts from "typescript";
import { marked } from 'marked';
import { pipe } from 'fp-ts/function'

const INPUT_FILE_PATH = '../test.md';
const TEMP_DIR = 'temp'

type ReportsInfo = Readonly<{
    reports: ts.Diagnostic[],
    emitSkipped: boolean
}>

type TempFilePaths = ReadonlyArray<string>

type CodeSnippets = ReadonlyArray<string>

const exitScript = (emitSkipped: boolean) => {
    const exitCode = emitSkipped ? 1 : 0;
    fs.removeSync(TEMP_DIR)
    console.log(`Process exiting with code '${exitCode}'.`);
    process.exit(exitCode);
}

const compileAndReport = (options: ts.CompilerOptions) => (fileNames: TempFilePaths): ReportsInfo => {
    const program = ts.createProgram(fileNames, options);
    const emitResult = program.emit();

    const reports = ts
        .getPreEmitDiagnostics(program)
        .concat(emitResult.diagnostics);

    return {
        reports,
        emitSkipped: emitResult.emitSkipped
    }
}

const logReports = (data: ReportsInfo) => {
    data.reports.forEach(diagnostic => {
        if (diagnostic.file) {
            const { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start!);
            const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
            console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
        } else {
            console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
        }
    });
    return data.emitSkipped
}

const isTypeScriptCode = (token: marked.Token): token is marked.Tokens.Code => token.type === 'code' && token.lang === 'typescript';

const extractCodeSnippets = (markdown: string): CodeSnippets =>
    pipe(
        new marked.Lexer(),
        lexer => lexer.lex(markdown),
        tokens => tokens.filter(isTypeScriptCode),
        codes => codes.map(x => x.text)
    )

const makeTempFiles = (snippets: CodeSnippets): TempFilePaths =>
    snippets.reduce<TempFilePaths>((acc, snippet, index) => {
        const tempFile = path.join(__dirname, `temp/temp_${index}.ts`);
        fs.writeFileSync(tempFile, snippet);

        return [
            ...acc,
            tempFile
        ]
    }, [])

const processMarkdownFile = (inputPath: string): void =>
    pipe(
        fs.ensureDirSync(TEMP_DIR),
        () => fs.readFileSync(inputPath, 'utf-8'),
        extractCodeSnippets,
        makeTempFiles,
        compileAndReport({
            noEmitOnError: true,
            noImplicitAny: true,
            target: ts.ScriptTarget.ESNext,
            module: ts.ModuleKind.CommonJS
        }),
        logReports,
        exitScript,
    )

processMarkdownFile(INPUT_FILE_PATH);