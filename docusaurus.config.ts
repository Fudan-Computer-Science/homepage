import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: '復旦程式設計班',
  tagline: '網站 by 14th進階教學',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://Fudan-Computer-Science.github.io',
  trailingSlash: true,
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/homepage/',
  themes: ['@docusaurus/theme-mermaid', '@docusaurus/theme-live-codeblock'],
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Fudan-Computer-Science', // Usually your GitHub org/user name.
  projectName: 'homepage', // Usually your repo name.

  onBrokenLinks: 'warn',
  onDuplicateRoutes: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-TW',     
    // 預設語系
    locales: ['zh-TW'],   
    // 語系配置
  },
  presets: [
    [
      'classic',
      {
        docs: {
          admonitions: {
            keywords: ['note', 'tip', 'info', 'warning', 'danger', 'spoiler'],
            extendDefaults: true,
          },
          remarkPlugins: [
            remarkMath, 
          ],
          rehypePlugins: [
            rehypeKatex,
            require('./plugins/remark-spoiler'),
          ],
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Fudan-Computer-Science/homepage/tree/main',
          tags: '../blog/tags.yml',
        },
        blog: {
          admonitions: {
            keywords: ['note', 'tip', 'info', 'warning', 'danger', 'spoiler'],
            extendDefaults: true,
          },
          remarkPlugins: [
            remarkMath, 
          ],
          rehypePlugins: [
            rehypeKatex,
            require('./plugins/remark-spoiler'),
          ],
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Fudan-Computer-Science/homepage/tree/main',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    trailingSlash: true,
    algolia: {
      // The application ID provided by Algolia
      appId: 'P2A7UCAY5O',

      // Public API key: it is safe to commit it
      apiKey: '91b65f45f548721784506eb2ed5ca5de',

      indexName: 'FDCS Blog',

      // Optional: see doc section below
      // contextualSearch: true,

      // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
      // externalUrlRegex: 'external\\.com|domain\\.com',

      // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
/*       replaceSearchResultPathname: {
        from: '/docs/', // or as RegExp: /\/docs\//
        to: '/',
      }, */

      // Optional: Algolia search parameters
      // searchParameters: {},

      // Optional: path for search page that enabled by default (`false` to disable it)
      // searchPagePath: 'search',

      // Optional: whether the insights feature is enabled or not on Docsearch (`false` by default)
      // insights: false,

      // Optional: whether you want to use the new Ask AI feature (undefined by default)
      askAi: process.env.ASK_AI,
      // Optional: GitHub secret for enhanced security
      //... other Algolia params
    },
    giscus: {
      repo: 'Fudan-Computer-Science/homepage',
      repoId: 'R_kgDOOzYo6g',
      categoryId: 'DIC_kwDOOzYo6s4C1FgF',
    },
    mermaid: {
      theme: {light: 'neutral', dark: 'forest'},
    },
    // Replace with your project's social card
    image: 'img/FDHS_CPP-social-card.jpg',
    navbar: {
      title: 'FDCS復旦程式設計班',
      logo: {
        alt: 'FDCS Logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo.svg',
        target: '_self',
        width: 32,
        height: 32,
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'introSidebar',
          position: 'left',
          label: '介紹',
        },
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: '講義',
        },
        {to: '/blog', label: '部落格', position: 'left'},
        {to: '/Calendar', label: '行事曆', position: 'right'},
        {to: '/games', label: '神奇小遊戲(?', position: 'right'},
        {
          href: 'https://github.com/Fudan-Computer-Science/homepage/tree/main/blog',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '資源',
          items: [
            {
              label: '講義',
              to: '/docs/category/入班考講義',
            },
            {
              label: '部落格',
              to: '/blog',
            },
            {
              label: '網站GitHub連結',
              href: 'https://github.com/Fudan-Computer-Science/homepage/tree/main/blog',
            },
          ],
        },
        {
          title: '社群',
          items: [
            {
              label: 'Github',
              href: 'https://github.com/Fudan-Computer-Science',
            },
            {
              label: '第十四屆IG',
              href: 'https://www.instagram.com/fdcs_114/',
            },
            {
              label: 'Facebook 粉專',
              href: 'https://www.facebook.com/FDHSCoder/?locale=zh_TW',
            },
          ],
        },
        {
          title: '合作單位/學校',
          items: [
            {
              label: 'SCINT 北臺灣資訊學生社群',
              href: 'https://scint.org/',
            },
             {
              label: '景美電資32nd',
              href: 'https://www.instagram.com/cmioc_32nd/',
            },
            {
              label: '北一女中資訊研習社第39屆',
              href: 'https://www.instagram.com/fgisc39th/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} 復旦程式設計班, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['Bash'],
    },
    colorMode: {
      respectPrefersColorScheme: true
    }
  } satisfies Preset.ThemeConfig,
};

export default config;
