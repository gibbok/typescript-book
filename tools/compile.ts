import * as fs from 'fs-extra';
import * as path from 'path';
import * as ts from "typescript";
import { marked } from 'marked';
import { pipe } from 'fp-ts/function'
import { makeFilePath } from './utils';
import { i18n } from './i18n';

const TEMP_DIR = 'temp'
const SKIP_COMMENT = '<!-- skip -->'

type ReportsInfo = Readonly<{
    reports: ts.Diagnostic[],
    emitSkipped: boolean
}>

type TempFilePaths = ReadonlyArray<string>

type CodeSnippets = ReadonlyArray<string>

const exitScript = (emitSkipped: boolean) => {
    const ERROR_CODE = 1
    const SUCCESS_CODE = 0
    const exitCode = emitSkipped ? ERROR_CODE : SUCCESS_CODE;
    console.log(`Process exiting with code '${exitCode}'.`);
    exitCode === ERROR_CODE && process.exit(exitCode);
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

const isSkipComment = (token: marked.Token): token is marked.Tokens.HTML => token.type === 'html' && token.text === `${SKIP_COMMENT}\n`;

const extractCodeSnippets = (markdown: string): CodeSnippets =>
    pipe(
        new marked.Lexer(),
        lexer => lexer.lex(markdown),
        tokens => {
            let skipIndex = -1
            return tokens.reduce<marked.Token[]>((tokens, token, index) => {
                if (index === skipIndex) {
                    skipIndex = -1
                    return [...tokens]
                }
                if (isSkipComment(token)) {
                    skipIndex = index + 1
                    return [...tokens]
                }
                return [...tokens, token]
            }, [])
        },
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
        () => fs.removeSync(TEMP_DIR),
        () => fs.ensureDirSync(TEMP_DIR),
        () => fs.readFileSync(inputPath, 'utf-8'),
        extractCodeSnippets,
        makeTempFiles,
        compileAndReport({
            noEmitOnError: true,
            noImplicitAny: true,
            target: ts.ScriptTarget.ESNext,
            module: ts.ModuleKind.CommonJS,
            moduleDetection: ts.ModuleDetectionKind.Force,
            noUnusedLocals: false,
            strict: true
        }),
        logReports,
        exitScript,
    )

for (const item of i18n) {
    console.log("Compiling: ", item)
    processMarkdownFile(makeFilePath(item));
}
