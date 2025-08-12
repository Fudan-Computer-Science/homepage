// src/components/Slide.tsx
import React, { useEffect, useRef, useState } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly"; // <-- 新增
import Reveal from "reveal.js";
import RevealHighlight from "reveal.js/plugin/highlight/highlight.esm.js";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/black.css";
import "reveal.js/plugin/highlight/monokai.css";

const handleRefresh = () => {
  window.location.reload();
};

export const SlideBreak: React.FC = () => null;
export const BranchBreak: React.FC = () => null;

interface SlideProps {
  children: React.ReactNode;
  height?: string;
}

export default function Slide({ children, height = "80vh" }: SlideProps) {
  // 用 BrowserOnly 來包裹內部才會使用 Reveal
  return (
    <BrowserOnly fallback={<div>Loading slides...</div>}>
      {() => <SlideInner children={children} height={height} />}
    </BrowserOnly>
  );
}

function SlideInner({ children, height }: SlideProps) {
  const revealRef = useRef<HTMLDivElement | null>(null);
  const deckRef = useRef<any>(null);

  const slides = React.useMemo(() => splitSlidesWithBranches(children), [children]);

  useEffect(() => {
    if (!revealRef.current) return;

    if (deckRef.current) {
      try {
        deckRef.current.destroy();
      } catch {}
      deckRef.current = null;
    }

    const timer = setTimeout(() => {
      const deck = new Reveal(revealRef.current as HTMLElement, {
        embedded: true,
        hash: true,
        slideNumber: true,
        transition: "slide",
        plugins: [RevealHighlight],
      });
      deck.initialize();
      deckRef.current = deck;
    }, 100);

    return () => {
      clearTimeout(timer);
      try {
        deckRef.current?.destroy();
      } catch {}
      deckRef.current = null;
    };
  }, [slides]);

  const renderNodeArray = (nodes: React.ReactNode[]) =>
    nodes.map((n, i) => <React.Fragment key={i}>{n}</React.Fragment>);

  const toggleFullscreen = () => {
    if (!revealRef.current) return;

    if (
      !document.fullscreenElement &&
      !(document as any).webkitFullscreenElement &&
      !(document as any).mozFullScreenElement &&
      !(document as any).msFullscreenElement
    ) {
      if (revealRef.current.requestFullscreen) {
        revealRef.current.requestFullscreen();
      } else if ((revealRef.current as any).webkitRequestFullscreen) {
        (revealRef.current as any).webkitRequestFullscreen();
      } else if ((revealRef.current as any).mozRequestFullScreen) {
        (revealRef.current as any).mozRequestFullScreen();
      } else if ((revealRef.current as any).msRequestFullscreen) {
        (revealRef.current as any).msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    }
  };

  return (
    <>
      <button
        onClick={toggleFullscreen}
        style={{
          position: "fixed",
          top: 12,
          right: 12,
          zIndex: 9999,
          padding: "8px 16px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
          userSelect: "none",
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          fontWeight: "bold",
        }}
        aria-label="Toggle Fullscreen"
      >
        全螢幕
      </button>
      <div
        className="reveal"
        ref={revealRef}
        style={{ height, backgroundColor: "#222", color: "#eee" }}
      >
        <button
          onClick={handleRefresh}
          style={{
            position: "fixed",
            bottom: 10,
            zIndex: 9999,
            padding: "8px 16px",
            backgroundColor: "#2e2d2dff",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
            userSelect: "none",
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
            fontWeight: "bold",
          }}
          aria-label="Fix Block"
        >
          若程式碼等跑不出來請按我
        </button>
        <div className="slides">
          {slides.map((branches, i) => {
            if (branches.length === 1) {
              return <section key={i}>{renderNodeArray(branches[0])}</section>;
            }
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
