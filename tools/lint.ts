import * as prettier from 'prettier';
import * as fs from 'fs';
import { languages } from './i18n';
import { PrettierOptions, getPrettierOptions, makeFilePath } from './utils';
import { CODE_BLOCK_TS_REGEX } from './config';

const lintCodeBlocksInMarkdownFile = async (filePath: string, options: PrettierOptions): Promise<void> => {
    const markdown = await fs.promises.readFile(filePath, 'utf-8');

    let reportSnippetsNotLinted = '';
    let match;
    while ((match = CODE_BLOCK_TS_REGEX.exec(markdown)) !== null) {
        const code = match[1].trim() + '\n'
        const isCodeLinted = prettier.check(code, {
            parser: 'typescript',
            ...options,
        });
        if (isCodeLinted === false) {
            reportSnippetsNotLinted += code
            reportSnippetsNotLinted += '\n'
        }
    }
    if (reportSnippetsNotLinted.length === 0) {
        console.log("All snippets are linted!")
    } else {
        console.error('Not all snippets are linted! Please use this command to automatically format the snippets: npm run format\n')
        console.error(reportSnippetsNotLinted)
        process.exit(1)
    }
}

const main = async () => {
    const options = await getPrettierOptions()
    for (const item of languages) {
        lintCodeBlocksInMarkdownFile(makeFilePath(item), options);
    }
}

main()


