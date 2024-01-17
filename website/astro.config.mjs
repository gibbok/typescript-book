import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
    site: 'https://gibbok.github.io/typescript-book',
    integrations: [
        starlight({
            title: 'TypeScript Book',
            customCss: ['./src/styles/custom.css'],
            social: {
                github: 'https://github.com/gibbok/typescript-book',
                'x.com': 'https://twitter.com/gibbok_coding',
            },
            defaultLocale: 'root',
            locales: {
                root: {
                    label: 'English',
                    lang: 'en',
                },
                'zh-cn': {
                    label: '简体中文',
                    lang: 'zh-CN',
                },
            },
            sidebar: [
                {
                    label: 'TypeScript Book',
                    autogenerate: { directory: 'book' },
                },
            ],
        }),
    ],
});
