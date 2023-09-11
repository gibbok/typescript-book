import * as prettier from 'prettier';
import * as fs from 'fs';
import { Language, languages } from './i18n';
import { PrettierOptions, getPrettierOptions, makeFilePath } from './utils';
import { CODE_BLOCK_TS_REGEX } from './config';

const formatCodeBlocksInMarkdownFile = async (filePath: string, options: PrettierOptions, language: Language): Promise<void> => {
    const markdown = await fs.promises.readFile(filePath, 'utf-8');

    let formattedMarkdown = markdown;
    let match;
    while ((match = CODE_BLOCK_TS_REGEX.exec(markdown)) !== null) {
        const codeBlock = match[0];
        const code = match[1].trim();
        const formattedCode = await prettier.format(code, {
            parser: 'typescript',
            ...options,
        });
        formattedMarkdown = formattedMarkdown.replace(codeBlock, `\`\`\`typescript\n${formattedCode}\`\`\``);
    }

    await fs.promises.writeFile(filePath, formattedMarkdown, 'utf-8');
    console.log(`${language} Formatted code blocks using Prettier have been updated in the file: ${filePath}`);
}

const main = async () => {
    const options = await getPrettierOptions()

    for (const language of languages) {
        formatCodeBlocksInMarkdownFile(makeFilePath(language), options, language);
    }
}

main()


