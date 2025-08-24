import React, { useEffect, useRef } from "react";
import './Card.css';
import Link from "@docusaurus/Link";
import BrowserOnly from "@docusaurus/BrowserOnly";

export type ColorSet = {
  backgroundColor: string;
  textColor: string;
  imgColor: string;
};

export type CardProps = {
  text: string;
  link: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  color: ColorSet;
  width: number;
  height: number;
};

export default function Card(props: CardProps): React.ReactElement {
  const svgRef = useRef<SVGSVGElement>(null);

  return (
    <BrowserOnly>
      {() => {
        const { text, link, Svg, color, width, height } = props;

        // Card 容器
        const divStyle: React.CSSProperties = {
          width,
          height,
          backgroundColor: color.backgroundColor,
          color: color.imgColor,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        };

        // 文字樣式
        const textStyle: React.CSSProperties = {
          fontSize: height * 0.1,
          textAlign: 'center',
          margin: 0,
          padding: 0,
          color: color.textColor,
          fontFamily: "Cute Regular"
        };

        // 上色 SVG（自動判斷 stroke / fill）
        React.useEffect(() => {
          if (!svgRef.current) return;
          const elements = svgRef.current.querySelectorAll(
            'path, line, circle, rect, polygon, ellipse'
          );
          elements.forEach(el => {
            el.setAttribute('stroke', color.imgColor);
            if (el.getAttribute('fill') !== null && el.getAttribute('fill') !== 'none') {
              el.setAttribute('fill', color.imgColor);
            }
          });
        }, [color.imgColor]);

        return (
          <Link href={link}>
            <div style={divStyle} className="menu-card">
              <Svg ref={svgRef} style={{ width: '100%', height: '100%' }} />
              <p style={textStyle}>{text}</p>
            </div>
          </Link>
        );
      }}
    </BrowserOnly>
  );
}