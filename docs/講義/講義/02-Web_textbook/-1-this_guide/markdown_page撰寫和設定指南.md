---
sidebar_position: 0 #他在側邊的選項欄所在的順序，越小越靠上，可以是負的或小數點
title: markdown page 撰寫和設定指南
description: ''
hide_table_of_contents: false #是否要顯示這個markdown的標題總覽
hide_title: false #隱藏標題
tags: [this-web-design]
slug: ../this_web_guide/markdown_page_guides
---
# markdown page 撰寫和設定指南

## 原生功能
### 1. markdown frontmatter
這是 markdown 的 frontmatter   
可以理解為設定 markdown page 的屬性  
放在 markdown 的最前端  
```md
---
sidebar_position: 0 #他在側邊的選項欄所在的順序，越小越靠上，可以是負的或小數點
title: 標題
description: 此為標題下的那一排字
hide_table_of_contents: true #是否要顯示這個markdown的標題總覽
hide_title: false #隱藏標題
tags: [這篇文章的標籤]
slug: /該頁的連結
---
```
[若須其他屬性請參考](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#markdown-frontmatter)

### 2. markdown 擴充功能
包括但不限於  
- $\LaTeX$
- mermaid
- react live
    :::tip[react live]
    正常來說 react live 不能用 `import`, `export`, `default`  
    (會compile error)  
    但貼心的 *14th進階教學* 有實現在編譯前會先把這些去除在編譯  
    因此如果講義有需要展示`import`, `export`, `default`  
    可以打出來，不用註解。  
    (((((畢竟要編react講義
    :::
等等  
(有想要的功能歡迎提出)  
:::warning[markdown code block]
docusaurus官方並未將所有的程式納入著色範圍，若有需要請參考[連結](https://docusaurus.io/docs/markdown-features/code-blocks#supported-languages)
:::
---

## 學長姐自製功能
這些多半需要 .mdx 才能使用

### 1. ImgPack
```tsx
import Img, { ImgBaseProvider } from '/src/components/ImgPack';
<ImgBaseProvider base="/img/react_textbook_pic/Chapter0">
<Img name="00-vite_start.png" />
<Img name="01-vite_firstpage.png" />
</ImgBaseProvider>
```
其中`<Img name="00-vite_start.png" />`等價於 `![](/img/react_textbook_pic/Chapter0/00-vite_start.png)`

### 2. DetailsBlock  
折疊區塊  
:::warning[改版]
舊版仍可用 但現在.md/.mdx可以支援  
  \:::spoiler[some text]  
  \:::  
  或  
  \:::warning[?=spoiler改版]  
  \:::  
:::info[?=spoiler 製作者] 
:::danger[?=spoiler 猜猜我是誰]  
14th進階教學 草貓  
:::  
```tsx
import DetailsBlock from '@site/src/components/DetailsBlock/DetailsBlock';

<DetailsBlock type="note" title="📝 筆記">
  這是 Note 類型的折疊區塊。
</DetailsBlock>

<DetailsBlock type="info" title="ℹ️ 資訊">
  這是 Info 類型的折疊區塊。
</DetailsBlock>

<DetailsBlock type="warning" title="⚠️ 警告">
  小心！這是 Warning 區塊。
</DetailsBlock>

<DetailsBlock type="danger" title="❌ 危險">
  這是 Danger 區塊。
</DetailsBlock>

<DetailsBlock type="success" title="✅ 成功">
  恭喜！這是 Success 區塊。
</DetailsBlock>
```

### 3. Slide
會變成簡報
```tsx
import Slide, { SlideBreak, BranchBreak } from '@site/src/components/Slides/MarkdownSlides.tsx';

# slide外的標題
<Slide>

# 第一頁

<SlideBreak />

# 第二頁

<SlideBreak />

## 第二頁分頁

<BranchBreak />

# 第三頁
<pre><code className="language-cpp">
{`
cout << "by 14th 進階教學";
`}
</code></pre>

<SlideBreak />

</Slide>
```
