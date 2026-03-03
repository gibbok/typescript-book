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
                    tag: 'link',
                    attrs: {
                        rel: 'stylesheet',
                        id: 'silktide-consent-manager-css',
                        href: '/typescript-book/cookie-banner/silktide-consent-manager.css',
                    },
                },
                {
                    tag: 'script',
                    attrs: {
                        src: '/typescript-book/cookie-banner/silktide-consent-manager.js',
                    },
                },
                {
                    tag: 'script',
                    content: `
silktideCookieBannerManager.updateCookieBannerConfig({
  background: {
    showBackground: false 
  },
  cookieIcon: {
    position: "bottomRight"
  },
  cookieTypes: [
    {
      id: "analytics",
      name: "Analytics",
      description: "<p>These cookies are necessary for the website to function properly and cannot be switched off. They help with things like logging in and setting your privacy preferences.</p>",
      required: false,
      onAccept: function() {
        gtag('consent', 'update', {
          analytics_storage: 'granted',
        });
        dataLayer.push({
          'event': 'consent_accepted_analytics',
        });
      },
      onReject: function() {
        gtag('consent', 'update', {
          analytics_storage: 'denied',
        });
      }
    },
    {
      id: "advertising",
      name: "Advertising",
      description: "<p>These cookies help us improve the site by tracking which pages are most popular and how visitors move around the site.</p>",
      required: false,
      onAccept: function() {
        gtag('consent', 'update', {
          ad_storage: 'granted',
          ad_user_data: 'granted',
          ad_personalization: 'granted',
        });
        dataLayer.push({
          'event': 'consent_accepted_advertising',
        });
      },
      onReject: function() {
        gtag('consent', 'update', {
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
        });
      }
    }
  ],
  text: {
    banner: {
      description: "<p>We use cookies on our site to enhance your user experience, provide personalized content, and analyze our traffic. <a href=\\"/typescript-book/cookie-policy\\" target=\\"_blank\\">Cookie Policy.</a></p>",
      acceptAllButtonText: "Accept all",
      acceptAllButtonAccessibleLabel: "Accept all cookies",
      rejectNonEssentialButtonText: "Reject non-essential",
      rejectNonEssentialButtonAccessibleLabel: "Reject non-essential",
      preferencesButtonText: "Preferences",
      preferencesButtonAccessibleLabel: "Toggle preferences"
    },
    preferences: {
      title: "Customize your cookie preferences",
      description: "<p>We respect your right to privacy. You can choose not to allow some types of cookies. Your cookie preferences will apply across our website.</p>",
      creditLinkText: "Get this banner for free",
      creditLinkAccessibleLabel: "Get this banner for free"
    }
  }
});
`
                },
                {
                    tag: 'script',
                    attrs: {
                        src: 'https://www.googletagmanager.com/gtag/js?id=G-SR2LV8LB90',
                    },
                },
                {
                    tag: 'script',
                    content: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-SR2LV8LB90');
`
                },
                {
                    tag: 'script',
                    attrs: {
                        async: true,
                        src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8180626414651391',
                        crossorigin: 'anonymous',
                    },
                },
                {
                    tag: 'script',
                    attrs: {
                        defer: true,
                        src: 'https://static.cloudflareinsights.com/beacon.min.js',
                        'data-cf-beacon':
                            '{"token": "949aed66281e40378ac479993d699897"}',
                    },
                }
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
                'pt-br': {
                    label: 'Português (Brasil)',
                    lang: 'pt-BR',
                },
                'sv-se': {
                    label: 'Svenska',
                    lang: 'sv-SE',
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
