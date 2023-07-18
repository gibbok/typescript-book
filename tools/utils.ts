import { Language } from "./i18n";

export const makeFilePath = (item: Language) =>
    item === Language.en_EN ? '../README.md' : `../README-${item}.md`