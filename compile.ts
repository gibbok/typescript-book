import * as fs from 'fs';
import * as ts from 'typescript';

function extractCodeSnippets(markdown: string): string[] {
    const codeSnippets: string[] = [];
    const regex = /```typescript([\s\S]*?)```/g;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(markdown)) !== null) {
        const codeSnippet = match[1].trim();
        codeSnippets.push(codeSnippet);
    }

    return codeSnippets;
}

function compileTypeScriptCode(code: string,): ts.Diagnostic[] {
    const compilerOptions: ts.CompilerOptions = {
        target: ts.ScriptTarget.ESNext,
        module: ts.ModuleKind.CommonJS,
    };

    const compilerHost: ts.CompilerHost = {
        getSourceFile: () => ts.createSourceFile('temp.ts', code, ts.ScriptTarget.ESNext),
        getDefaultLibFileName: () => 'lib.d.ts',
        writeFile: () => { },
        getCurrentDirectory: ts.sys.getCurrentDirectory,
        getDirectories: ts.sys.getDirectories,
        getCanonicalFileName: ts.sys.useCaseSensitiveFileNames ? (fileName: string) => fileName : (fileName: string) => fileName.toLowerCase(),
        getNewLine: () => ts.sys.newLine,
        fileExists: ts.sys.fileExists,
        readFile: ts.sys.readFile,
        useCaseSensitiveFileNames: () => false
    };

    const program = ts.createProgram(['temp.ts'], compilerOptions, compilerHost);
    const sourceFile = program.getSourceFile('temp.ts');
    if (sourceFile) {
        const diagnostics = ts.getPreEmitDiagnostics(program, sourceFile);
        //@ts-ignore
        return diagnostics;
    }

    return [];
}

function saveErrorsToFile(errors: ts.Diagnostic[], outputFilePath: string): void {
    const formattedErrors = ts.formatDiagnosticsWithColorAndContext(errors, {
        getCanonicalFileName: (fileName: string) => fileName,
        getCurrentDirectory: ts.sys.getCurrentDirectory,
        getNewLine: () => ts.sys.newLine,
    });

    fs.writeFileSync(outputFilePath, formattedErrors);
}

function processMarkdownFile(inputFilePath: string, outputFilePath: string): void {
    try {
        const markdown = fs.readFileSync(inputFilePath, 'utf-8');
        const codeSnippets = extractCodeSnippets(markdown);
        const errors: ts.Diagnostic[] = [];

        for (const code of codeSnippets) {
            const codeErrors = compileTypeScriptCode(code);
            errors.push(...codeErrors);
        }

        if (errors.length > 0) {
            saveErrorsToFile(errors, outputFilePath);
            console.log(`Compilation completed with errors. Error details saved to ${outputFilePath}`);
        } else {
            console.log(`Compilation completed successfully.`);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Usage example
const inputFilePath = 'test.md';
const outputFilePath = 'errors.txt';
processMarkdownFile(inputFilePath, outputFilePath);

/*
import * as ts from 'typescript';

function compileTypeScriptCode(code: string): ts.Diagnostic[] {
    const compilerOptions: ts.CompilerOptions = {
        target: ts.ScriptTarget.ESNext,
        module: ts.ModuleKind.CommonJS,
    };

    const compilerHost: ts.CompilerHost = {
        getSourceFile: () => ts.createSourceFile('temp.ts', code, ts.ScriptTarget.ESNext),
        getDefaultLibFileName: () => 'lib.d.ts',
        writeFile: () => { },
        getCurrentDirectory: ts.sys.getCurrentDirectory,
        getDirectories: ts.sys.getDirectories,
        getCanonicalFileName: ts.sys.useCaseSensitiveFileNames ? (fileName: string) => fileName : (fileName: string) => fileName.toLowerCase(),
        getNewLine: () => ts.sys.newLine,
        fileExists: ts.sys.fileExists,
        readFile: ts.sys.readFile,
        useCaseSensitiveFileNames: () => false
    };

    const program = ts.createProgram(['temp.ts'], compilerOptions, compilerHost);
    const sourceFile = program.getSourceFile('temp.ts');
    if (sourceFile) {
        const diagnostics = ts.getPreEmitDiagnostics(program, sourceFile);
        //@ts-ignore
        return diagnostics;
    }

    return [];
}

// Usage example
const code = `
  // TypeScript code to compile
  function greet(name: string) {
    console.log('Hello, ' + name);
  }

  greet(123); // Intentional type error
`;

const errors = compileTypeScriptCode(code);
if (errors.length > 0) {
    const formattedErrors = ts.formatDiagnosticsWithColorAndContext(errors, {
        getCanonicalFileName: (fileName: string) => fileName,
        getCurrentDirectory: ts.sys.getCurrentDirectory,
        getNewLine: () => ts.sys.newLine,
    });
    console.error(formattedErrors);
} else {
    console.log('Compilation completed successfully.');
}
*/