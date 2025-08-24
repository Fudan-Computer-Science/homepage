// svg-to-currentColor.ts
const fs = require("fs");
const path = require("path");
const glob = require("glob");

// 檔名轉 PascalCase
function toPascalCase(name: string): string {
  return name
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, c: string) => c.toUpperCase())
    .replace(/^(.)/, (_, c: string) => c.toUpperCase());
}

// kebab-case → camelCase
function toCamel(prop: string): string {
  return prop.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
}

// 把 style="a:b;c:d" 轉成 style={{ a: "b", c: "d" }}，且 key → camelCase
function convertInlineStyleToJsx(svg: string): string {
  return svg.replace(/style=(['"])(.*?)\1/gi, (_m, _q, css: string) => {
    const entries = css
      .split(";")
      .map(s => s.trim())
      .filter(Boolean)
      .map(pair => {
        const idx = pair.indexOf(":");
        if (idx === -1) return null;
        const key = toCamel(pair.slice(0, idx).trim());
        const val = pair.slice(idx + 1).trim();
        // 一律保守地當成字串值
        return `${key}: ${JSON.stringify(val)}`;
      })
      .filter(Boolean)
      .join(", ");
    return entries.length ? `style={{ ${entries} }}` : "";
  });
}

// 將常見的 SVG 屬性轉成 React 支援的屬名
function normalizeAttrNames(svg: string): string {
  const map: Array<[RegExp, string]> = [
    [/clip-path=/gi, "clipPath="],
    [/fill-rule=/gi, "fillRule="],
    [/fill-opacity=/gi, "fillOpacity="],
    [/stroke-width=/gi, "strokeWidth="],
    [/stroke-linecap=/gi, "strokeLinecap="],
    [/stroke-linejoin=/gi, "strokeLinejoin="],
    [/stroke-miterlimit=/gi, "strokeMiterlimit="],
    [/stroke-dasharray=/gi, "strokeDasharray="],
    [/stroke-dashoffset=/gi, "strokeDashoffset="],
    [/stop-color=/gi, "stopColor="],
    [/stop-opacity=/gi, "stopOpacity="],
    [/xlink:href=/gi, "xlinkHref="],
    [/xml:space=/gi, "xmlSpace="],
    // React 用 className
    [/\bclass=/gi, "className="],
  ];
  return map.reduce((acc, [re, rep]) => acc.replace(re, rep), svg);
}

// 清理、改色
function sanitizeSvgContent(raw: string): string {
  let svg = raw
    // 去掉 XML/DOCTYPE
    .replace(/<\?xml[^>]*\?>/gi, "")
    .replace(/<!DOCTYPE[^>]*>/gi, "")
    // 移除 React 不吃或冗餘屬性
    .replace(/\s+xmlns(:\w+)?="[^"]*"/gi, "")   // 移除所有 xmlns:xxx
    .replace(/\s+version="[^"]*"/gi, "")
    .replace(/\s+zoomAndPan="[^"]*"/gi, "")
    .replace(/\s+enable-background="[^"]*"/gi, "")
    .replace(/\s+xml:space="[^"]*"/gi, "")
    // 移除 namespace 元素 <something:tag>
    .replace(/<\w+:\w+[^>]*>/gi, "")
    .replace(/<\/\w+:\w+>/gi, "");

  // 先把 style 內的 fill/stroke 改 currentColor（保留 none）
  svg = svg
    .replace(/fill:\s*(?!none\b)[^;"]+;?/gi, "fill: currentColor;")
    .replace(/stroke:\s*(?!none\b)[^;"]+;?/gi, "stroke: currentColor;");

  // 把屬性 fill/stroke 改 currentColor（保留 none）
  svg = svg
    .replace(/fill=(['"])(?!none\b).*?\1/gi, 'fill="currentColor"')
    .replace(/stroke=(['"])(?!none\b).*?\1/gi, 'stroke="currentColor"');

  // 轉 style="..." → style={{ ... }}
  svg = convertInlineStyleToJsx(svg);

  // 屬性名 camelCase
  svg = normalizeAttrNames(svg);

  // 清掉多餘空白
  return svg.replace(/\s{2,}/g, " ").trim();
}

// 包成 React Component（讓 props 覆寫預設）
function wrapAsReactComponent(svg: string, name: string): string {
  // 在 <svg ...> 上加 fill={color} {...props}（props 放後面以便覆寫）
  svg = svg.replace(
    /<svg([^>]*)>/i,
    (_m, attrs) => `<svg${attrs} fill={color} {...props}>`
  );

  return `import React from "react";

export type IconProps = React.SVGProps<SVGSVGElement> & { color?: string };

const ${name}: React.FC<IconProps> = ({ color = "currentColor", ...props }) => (
  ${svg}
);

export default ${name};
`;
}

function generateFromFolder(inputDir: string, outputDir: string) {
  const inDir = path.resolve(inputDir);
  const outDir = path.resolve(outputDir);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const files = glob.sync(path.join(inDir, "**/*.svg"));
  if (!files.length) {
    console.log("No SVG files found.");
    return;
  }

  files.forEach(file => {
    const raw = fs.readFileSync(file, "utf8");
    const name = toPascalCase(path.basename(file, ".svg"));
    const cleaned = sanitizeSvgContent(raw);

    // 若 <svg> 沒有 viewBox，但有 width/height，可選擇補個預設（可按需開啟）
    // if (!/viewBox=/.test(cleaned)) {
    //   cleaned.replace(/<svg([^>]*)>/, `<svg$1 viewBox="0 0 24 24">`);
    // }

    const tsx = wrapAsReactComponent(cleaned, name);
    const out = path.join(outDir, `${name}.tsx`);
    fs.writeFileSync(out, tsx, "utf8");
    console.log(`✅ Generated: ${out}`);
  });
}

// CLI：npx ts-node svg-to-currentColor.ts ./static/img/icons ./src/components/icons
if (require.main === module) {
  const input = process.argv[2];
  const output = process.argv[3];
  if (!input || !output) {
    console.error("Usage: ts-node svg-to-currentColor.ts <input_folder> <output_folder>");
    process.exit(1);
  }
  generateFromFolder(input, output);
}

