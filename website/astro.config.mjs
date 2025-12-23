import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
    site: 'https://gibbok.github.io',
    base: '/typescript-book',
    build: {
        assets: 'app_assets',
    },
    integrations: [
        starlight({
            head: [
                {
                    tag: 'script',
                    attrs: {
                        defer: true,
                        src: 'https://static.cloudflareinsights.com/beacon.min.js',
                        'data-cf-beacon':
                            '{"token": "949aed66281e40378ac479993d699897"}',
                    },
                },
            ],
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
                'it-it': {
                    label: 'Italiano',
                    lang: 'it-IT',
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
