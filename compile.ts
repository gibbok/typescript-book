import * as ts from 'typescript';

function checkCodeSnippet(code: string): void {
    const compilerOptions: ts.CompilerOptions = {
        target: ts.ScriptTarget.ES2017,
        module: ts.ModuleKind.CommonJS
    };

    const host: ts.CompilerHost = {
        fileExists: ts.sys.fileExists,
        readFile: ts.sys.readFile,
        getSourceFile: (fileName) => {
            if (fileName === 'snippet.ts') {
                return ts.createSourceFile(fileName, code, ts.ScriptTarget.ES2017, true);
            }
            return undefined;
        },
        getDefaultLibFileName: () => ts.getDefaultLibFilePath(compilerOptions),
        writeFile: () => { },
        getCurrentDirectory: () => '',
        getCanonicalFileName: (fileName) => fileName,
        getNewLine: () => ts.sys.newLine,
        useCaseSensitiveFileNames: () => ts.sys.useCaseSensitiveFileNames
    };

    const program = ts.createProgram(['snippet.ts'], compilerOptions, host);
    const diagnostics = program.getSemanticDiagnostics();

    if (diagnostics.length === 0) {
        console.log('Code snippet is valid.');
    } else {
        console.log('Code snippet has errors:');
        diagnostics.forEach((diagnostic) => {
            const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
            if (diagnostic.file) {
                const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!);
                console.log(`  Error at ${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
            } else {
                console.log(`  Error: ${message}`);
            }
        });
    }
}

const codeSnippet = `
  const x: string = 'Hello, world!';
  console.log(x);
`;

checkCodeSnippet(codeSnippet);