import React from 'react';
import OriginalLayout from '@theme-original/DocItem/Layout'; // 先引用官方預設 Layout
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import MarkdownSlides from "./MarkdownSlides";
export default function LayoutWrapper(props) {
  const { frontMatter } = useDoc();

  if (frontMatter?.slide) {
    // 當 customFlag = true 時，做特別渲染
    return (
    <div>
      <MarkdownSlides enabled={true}>{props.children}</MarkdownSlides>
    </div>
    );
  }

  // 預設回傳官方版型
  return <OriginalLayout {...props} />;
}
