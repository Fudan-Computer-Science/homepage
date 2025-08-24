import React, { useState, useEffect } from "react";
import Card, { ColorSet } from "./Card";
import "./MenuGrid.css";
import BrowserOnly from "@docusaurus/BrowserOnly";
const baseUrl:string = "@site/static/img/main_screen/";



type CardProps = {
  text: string;
  link: string;
  img: React.ComponentType<React.ComponentProps<'svg'>>;
};

/* 此處新增主頁字卡 */
import coding from "@site/static/img/main_screen/coding.svg";
import a1_code from "@site/static/img/main_screen/a1_code.svg";
import a2_register_now from "@site/static/img/main_screen/a2_register_now.svg";
import a3_faq from "@site/static/img/main_screen/a3_faq.svg";
import a4_blog from "@site/static/img/main_screen/a4_blog.svg";
import a5_ddj from "@site/static/img/main_screen/a5_ddj.svg"; 
import a6_intro_textbook from "@site/static/img/main_screen/a6_intro_textbook.svg";
import a7_textbook from "@site/static/img/main_screen/a7_textbook.svg"; 
import a8_contect_us from "@site/static/img/main_screen/a8_contect_us.svg";
import a9_competition_result from "@site/static/img/main_screen/a9_competition_result.svg";
import a10_bulletin_board from "@site/static/img/main_screen/a10_bulletin_board.svg";

const cardsData: CardProps[] = [
  { text: "關於程式設計班", link: "/homepage", img: a1_code},
  { text: "加入我們", link: "/page2", img: a2_register_now},
  { text: "FAQ", link: "/page3", img: a3_faq},
  { text: "部落格", link: "/page3", img: a4_blog},
  { text: "旦旦解題網", link: "/page3", img: a5_ddj},
  { text: "入班考講義", link: "/page3", img: a6_intro_textbook},
  { text: "課堂講義", link: "/page3", img: a7_textbook},
  { text: "聯絡我們", link: "/page3", img: a8_contect_us},
  {text: "競賽成果", link: "/page3", img: a9_competition_result},
  {text: "公布欄", link: "/page3", img: a10_bulletin_board},
];

const theme:ColorSet[] = [
  {
    backgroundColor: "var(--ifm-color-primary-lightest)",
    textColor: "#ffffff",
    imgColor: "#6590b4"
  },
  {
    backgroundColor: "var(--ifm-color-primary-dark)",
    textColor: "#414141",
    imgColor: "#d9d9d9"
  }
]
export default function CardGrid(): React.ReactElement {
  const [maxCols, setMaxCols] = useState(4);
  const [screenW, setScreenW] = useState(1200);

  useEffect(() => {
    function updateGrid() {
      const width = window.innerWidth;
      let cols = 5;
      if (width <= 640) cols = 2;
      else if (width <= 1024) cols = 3;
      else if (width <= 1200) cols = 4;
      setMaxCols(cols);
      setScreenW(width);
    }
    updateGrid();
    window.addEventListener("resize", updateGrid);
    return () => window.removeEventListener("resize", updateGrid);
  }, []);

  // 切成每行 maxCols 張
  const rows: CardProps[][] = [];
  for (let i = 0; i < cardsData.length; i += maxCols) {
    rows.push(cardsData.slice(i, i + maxCols));
  }
  const cardHeight = screenW / maxCols;
  return (
      <div className="menu-card-div">
      {rows.map((cards, rowIdx) => {
        const cardWidth = screenW / cards.length; // 最後一行自動平均
        return (
          <div key={rowIdx} className="menu-row" style={{ display: "flex" }}>
            {cards.map((card, idx) => {
              const color = theme[(rowIdx+idx)%2];
              return <Card
                key={idx}
                text={card.text}
                link={card.link}
                Svg={card.img}
                color={color}
                width={cardWidth}
                height={cardHeight} // 高度也等於寬度 → 保持正方形
              />
            })}
          </div>
        );
      })}
    </div>
  );
}
