import { I18n } from "./i18n";

export const makeFilePath = (item: I18n) =>
    item === I18n.en_EN ? '../README.md' : `../README-${item}.md`