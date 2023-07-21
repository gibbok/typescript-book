import * as prettier from 'prettier';
import * as fs from 'fs';
import { languages } from './i18n';
import { PrettierOptions, getPrettierOptions, makeFilePath } from './utils';
import { CODE_BLOCK_TS_REGEX } from './config';

const lintCodeBlocksInMarkdownFile = async (filePath: string, options: PrettierOptions): Promise<void> => {
    const markdown = await fs.promises.readFile(filePath, 'utf-8');

    let formattedMarkdown = '';
    let match;
    while ((match = CODE_BLOCK_TS_REGEX.exec(markdown)) !== null) {
        const codeBlock = match[0];
        const code = match[1].trim();
        const isCodeLinted = prettier.check(code, {
            parser: 'typescript',
            ...options,
        });
        if (isCodeLinted === false) {
            formattedMarkdown += codeBlock
        }
    }
    if (formattedMarkdown.length === 0) {
        console.log("All snippets are linted")
    } else {
        console.error('Not all code is linted!')
        console.log(formattedMarkdown)
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


