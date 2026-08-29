import { PRETTIER_CONFIG_FILE_PATH } from "./config";
import { Language } from "./i18n";
import * as prettier from 'prettier';

const languageFilePaths: Record<Language, string> = {
    [Language.en_EN]: '../README.md',
    [Language.zh_CN]: '../README-zh_CN.md',
    [Language.it_IT]: '../README-it_IT.md',
    [Language.pt_BR]: '../README-pt_BR.md',
    [Language.sv_SE]: '../README-sv_SE.md',
    [Language.bg_BG]: '../README-bg_BG.md',
    [Language.es_ES]: '../README_es_ES.md',
    [Language.ja_JP]: '../README-ja_JP.md',
    [Language.fr_FR]: '../README-fr_FR.md',
    [Language.ko_KR]: '../README-ko_KR.md',
}

export const makeFilePath = (item: Language) => languageFilePaths[item]

export type PrettierOptions = Exclude<prettier.Options, null>

export const getPrettierOptions = async (): Promise<PrettierOptions> => {
    const options = await prettier.resolveConfig(PRETTIER_CONFIG_FILE_PATH)
    if (options === null) {
        throw `No Prettier options are found! Check your Prettier configuration file.`
    }
    return options
}
