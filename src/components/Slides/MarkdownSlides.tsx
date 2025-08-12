// src/components/Slide.tsx
import React from "react";
import Reveal from "reveal.js";
import RevealHighlight from "reveal.js/plugin/highlight/highlight.esm.js";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/black.css";
import "reveal.js/plugin/highlight/monokai.css";

/** 明確分隔用元件（水平） */
export const SlideBreak: React.FC = () => null;
/** 明確分隔用元件（垂直） */
export const BranchBreak: React.FC = () => null;

interface SlideProps {
  children: React.ReactNode;
  height?: string;
}

export default function Slide({ children, height = "80vh" }: SlideProps) {
  const revealRef = React.useRef<HTMLDivElement | null>(null);
  const deckRef = React.useRef<any>(null);

  // 把 MDX 產生的 ReactNode 切成 [ [branch1, branch2], [ ... ] ]
  const slides = React.useMemo(() => splitSlidesWithBranches(children), [children]);

  React.useEffect(() => {
    if (!revealRef.current) return;

    // 先 destroy 可能存在的 instance（避免 double init）
    if (deckRef.current) {
      try { deckRef.current.destroy(); } catch {}
      deckRef.current = null;
    }

    const deck = new Reveal(revealRef.current as HTMLElement, {
      embedded: true,
      hash: true,
      slideNumber: true,
      transition: "slide",
      plugins: [RevealHighlight],
    });
    deck.initialize();
    deckRef.current = deck;

    return () => {
      try { deck.destroy(); } catch {}
      deckRef.current = null;
    };
  }, [slides]); // 內容變動時重新 init（必要時可改為更精細的更新）

  // helper: 把一個 ReactNode[] 安全渲染（加 key）
  const renderNodeArray = (nodes: React.ReactNode[]) =>
    nodes.map((n, i) => <React.Fragment key={i}>{n}</React.Fragment>);

  return (
    <>
      <div
        className="reveal"
        ref={revealRef}
        style={{ height, backgroundColor: "#222", color: "#eee" }}
      >
        <div className="slides">
          {slides.map((branches, i) => {
            // 若只有一個分支，直接輸出單一 <section>
            if (branches.length === 1) {
              return (
                <section key={i}>
                  {renderNodeArray(branches[0])}
                </section>
              );
            }
            // 多個分支 -> 外層 section 包多個內層 section（vertical）
            return (
              <section key={i}>
                {branches.map((branchNodes, j) => (
                  <section key={j}>{renderNodeArray(branchNodes)}</section>
                ))}
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}

/* ---------------- 下面是分割邏輯 ---------------- */

function isSlideBreakElement(node: React.ReactNode): boolean {
  if (!React.isValidElement(node)) return false;
  const t = node.type;
  // SlideBreak 元件
  if (t === SlideBreak) return true;
  // mdx 渲染的標準 hr（type 可能是 'hr' 或 mdxType）
  if (typeof t === "string" && t.toLowerCase() === "hr") return true;
  const mdxType = (node.props && node.props.mdxType) || undefined;
  if (mdxType === "hr") return true;
  return false;
}

function isBranchBreakElement(node: React.ReactNode): boolean {
  if (!React.isValidElement(node)) return false;
  const t = node.type;
  if (t === BranchBreak) return true;
  // 你也可以把特定條件（例如 <hr /> 的特殊語法）視為 branch
  // 但純 Markdown '----' 在 MDX 會被渲染成單一 <hr />，難以區分，
  // 所以推薦使用 BranchBreak 來明確表達 vertical split。
  return false;
}

function isHeadingLevel(node: React.ReactNode, level: number) {
  if (!React.isValidElement(node)) return false;
  const t = node.type;
  if (typeof t === "string" && t.toLowerCase() === `h${level}`) return true;
  const mdxType = (node.props && node.props.mdxType) || undefined;
  return mdxType === `h${level}`;
}

/**
 * 切成三維結構：Array< horizontalSlide: Array<branch: Array<ReactNode>> >
 */
function splitSlidesWithBranches(children: React.ReactNode) {
  // 初始化：至少有一個 horizontal，且內含一個 branch
  const slides: React.ReactNode[][][] = [[[]]];

  React.Children.forEach(children, (child) => {
    // 若是水平分隔（SlideBreak 或 <hr />）
    if (isSlideBreakElement(child)) {
      // 如果最後一張是空的（沒內容），就避免再插入空張
      const last = slides[slides.length - 1];
      const lastBranch = last[last.length - 1];
      const isLastEmpty = last.length === 1 && lastBranch.length === 0;
      if (!isLastEmpty) slides.push([[]]);
      return;
    }

    // 若是垂直分隔（BranchBreak）
    if (isBranchBreakElement(child)) {
      // 確保至少有一個 horizontal
      if (slides.length === 0) slides.push([[]]);
      const cur = slides[slides.length - 1];
      // 若最後一個 branch 也是空的，避免重複建立
      const lastBranch = cur[cur.length - 1];
      if (lastBranch.length === 0) return;
      cur.push([]);
      return;
    }

    // heading 1 -> new horizontal slide (except如果目前是第一張且是空的就直接放入)
    if (isHeadingLevel(child, 1)) {
      const first = slides[0];
      const isFirstEmpty = slides.length === 1 && first.length === 1 && first[0].length === 0;
      if (isFirstEmpty) {
        // 放入第一張的第一個 branch
        slides[0][0].push(child);
      } else {
        slides.push([[child]]);
      }
      return;
    }

    // heading 2 -> new vertical branch (如果當前 branch 為空則放入，否則建立新分支)
    if (isHeadingLevel(child, 2)) {
      if (slides.length === 0) slides.push([[]]);
      const cur = slides[slides.length - 1];
      const lastBranch = cur[cur.length - 1];
      if (lastBranch.length === 0) {
        cur[cur.length - 1].push(child);
      } else {
        cur.push([child]);
      }
      return;
    }

    // 預設：加入目前 horizontal 的最後一個 branch
    if (slides.length === 0) slides.push([[]]);
    const cur = slides[slides.length - 1];
    if (cur.length === 0) cur.push([]);
    cur[cur.length - 1].push(child);
  });

  // 移除空的 branch / slide
  return slides
    .map((h) => h.map((b) => b.filter(Boolean)))
    .filter((h) => h.length > 0 && h.some((b) => b.length > 0));
}
