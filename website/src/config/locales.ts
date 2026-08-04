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
} as const;

export type Locale = keyof typeof locales;
