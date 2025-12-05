import { visit } from 'unist-util-visit';
import type { Parent, Literal } from 'unist';

type TextNode = Literal & { value: string };
type ParentNode = Parent & { children: Array<any> };

export default function remarkSpoiler() {
  return (tree: ParentNode) => {
    visit(tree, 'text', (node: TextNode, index: number | null, parent: ParentNode | null) => {
      if (!parent) return;
      const value = (node.value || '').toString();
      if (!value || value.indexOf('||') === -1) return;

      const parts: Array<any> = [];
      const regex = /\|\|([\s\S]+?)\|\|/g;
      let lastIndex = 0;
      let m: RegExpExecArray | null;
      while ((m = regex.exec(value)) !== null) {
        if (m.index > lastIndex) {
          parts.push({ type: 'text', value: value.slice(lastIndex, m.index) });
        }
        const inner = m[1];
        const el = {
          type: 'element',
          tagName: 'span',
          properties: { className: ['spoiler'] },
          children: [{ type: 'text', value: inner }],
        };
        parts.push(el);
        lastIndex = m.index + m[0].length;
      }
      if (lastIndex < value.length) {
        parts.push({ type: 'text', value: value.slice(lastIndex) });
      }

      const nodeIdx = parent.children.indexOf(node);
      if (nodeIdx !== -1) {
        parent.children.splice(nodeIdx, 1, ...parts);
      }
    });
  };
}