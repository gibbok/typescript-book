export const defaultLocale = 'root';

export const locales = {
  root: {
    label: 'English',
    lang: 'en',
  },
  'zh-cn': {
    label: '简体中文',
    lang: 'zh-CN',
  },
  'it-it': {
    label: 'Italiano',
    lang: 'it-IT',
  },
  'pt-br': {
    label: 'Português (Brasil)',
    lang: 'pt-BR',
  },
  'sv-se': {
    label: 'Svenska',
    lang: 'sv-SE',
  },
  'bg-bg': {
    label: 'Български',
    lang: 'bg-BG',
  },
  'es-es': {
    label: 'Español',
    lang: 'es-ES',
  },
  'ja-jp': {
    label: '日本語',
    lang: 'ja-JP',
  },
  'fr-fr': {
    label: 'Français',
    lang: 'fr-FR',
  },
  'ko-kr': {
    label: '한국어',
    lang: 'ko-KR',
  },
  'id-id': {
    label: 'Bahasa Indonesia',
    lang: 'id-ID',
  },
} as const;

export type Locale = keyof typeof locales;
