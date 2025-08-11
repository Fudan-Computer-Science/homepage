import React, { useEffect, useRef } from "react";
import MarkdownIt from "markdown-it";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/black.css";

interface SlideProps {
  children: React.ReactNode;
  enabled?: boolean;
  height?: string;
}

const md = new MarkdownIt();

function isHR(node: any) {
  if (!node) return false;
  if (typeof node === "object") {
    if (node.type === "hr") return true;
    if (node.props?.mdxType === "hr") return true;
  }
  if (typeof node === "string") {
    return /^-{3,}$/.test(node.trim());
  }
  return false;
}

function splitSlides(children: React.ReactNode): React.ReactNode[][] {
  const arr = React.Children.toArray(children);
  const groups: React.ReactNode[][] = [[]];

  arr.forEach((child) => {
    if (isHR(child)) {
      groups.push([]);
    } else {
      groups[groups.length - 1].push(child);
    }
  });

  return groups.filter((g) => g.length > 0);
}

export default function Slide({
  children,
  enabled = true,
  height = "80vh",
}: SlideProps) {
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;
    if (typeof window === "undefined") return;

    let cancelled = false;

    const addCss = (href: string) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        document.head.appendChild(link);
      }
    };

    addCss("https://cdn.jsdelivr.net/npm/reveal.js/dist/reveal.css");
    addCss("https://cdn.jsdelivr.net/npm/reveal.js/dist/theme/black.css");

    (async () => {
      try {
        const mod = await import("reveal.js");
        const Reveal = (mod as any).default ?? mod;
        if (cancelled) return;

        if (revealRef.current && Reveal) {
          const deck = new Reveal(revealRef.current);
          deck.initialize({
            embedded: true,
            hash: true,
            slideNumber: true,
            transition: "slide",
          });
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("Reveal.js load error:", e);
      }
    })();

    return () => {
      cancelled = true;
      try {
        const win = window as any;
        if (win.Reveal && typeof win.Reveal.destroy === "function") {
          win.Reveal.destroy();
        }
      } catch {}
    };
  }, [enabled]);

  if (!enabled) {
    return <div>{children}</div>;
  }

  const slides = splitSlides(children);

  return (
    <div
      className="reveal"
      ref={revealRef}
      style={{ width: "100%", height, boxSizing: "border-box" }}
    >
      <div className="slides">
        {slides.map((group, idx) => (
          <section key={idx} style={{ padding: "2rem" }}>
            {group}
          </section>
        ))}
      </div>
    </div>
  );
}
