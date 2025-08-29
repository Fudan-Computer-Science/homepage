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
/* 
加入svg後請先
在terminal輸入
npx ts-node ./static/img/main_screen/svg-to-currentColor.ts ./static/img/main_screen/raw_svg ./static/img/main_screen
來置換
*/
import A1Code from "@site/static/img/main_screen/A1Code";
import a2_register_now from "@site/static/img/main_screen/A2RegisterNow";
import a3_faq from "@site/static/img/main_screen/A3Faq";
import a4_blog from "@site/static/img/main_screen/A4Blog";
import a5_ddj from "@site/static/img/main_screen/A5Ddj"; 
import a6_intro_textbook from "@site/static/img/main_screen/A6IntroTextbook";
import a7_textbook from "@site/static/img/main_screen/A7Textbook"; 
import a8_contect_us from "@site/static/img/main_screen/A8ContectUs";
import a9_competition_result from "@site/static/img/main_screen/A9CompetitionResult";
import a10_bulletin_board from "@site/static/img/main_screen/A10BulletinBoard";

const cardsData: CardProps[] = [
  { text: "關於程式設計班", link: "/homepage/docs/intro/intro/程設班介紹", img: A1Code},
  { text: "加入我們", link: "/homepage/docs/intro/intro/入班考試資訊", img: a2_register_now},
  { text: "FAQ", link: "/docs/InGrid/FAQ", img: a3_faq},
  { text: "部落格", link: "/blog", img: a4_blog},
  { text: "旦旦解題網", link: "https://dandanjudge.fdhs.tyc.edu.tw/", img: a5_ddj},
  { text: "入班考講義", link: "/homepage/docs/category/入班考講義", img: a6_intro_textbook},
  { text: "課堂講義", link: "/homepage/docs/category/歷屆講義", img: a7_textbook},
  { text: "聯絡我們", link: "/docs/InGrid/ConnectUs", img: a8_contect_us},
  {text: "競賽成果", link: "/docs/InGrid/CompetitionResult", img: a9_competition_result},
  {text: "公布欄", link: "/blog/tags/announcement", img: a10_bulletin_board},
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
