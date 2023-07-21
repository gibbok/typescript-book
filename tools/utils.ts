import { PRETTIER_CONFIG_FILE_PATH } from "./config";
import { Language } from "./i18n";
import * as prettier from 'prettier';

export const makeFilePath = (item: Language) =>
    item === Language.en_EN ? '../README.md' : `../README-${item}.md`

export type PrettierOptions = Exclude<prettier.Options, null>

export const getPrettierOptions = async (): Promise<PrettierOptions> => {
    const options = await prettier.resolveConfig(PRETTIER_CONFIG_FILE_PATH)
    if (options === null) {
        throw `No Prettier options are found! Check your Prettier configuration file.`
    }
    return options
}