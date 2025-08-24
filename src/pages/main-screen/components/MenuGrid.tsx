import React, { useState, useEffect } from "react";
import Card, { ColorSet } from "./Card";
import "./MenuGrid.css";
import BrowserOnly from "@docusaurus/BrowserOnly";
const baseUrl:string = "@site/static/img/main_screen/";

import coding from "@site/static/img/main_screen/coding.svg";

type CardProps = {
  text: string;
  link: string;
  img: React.ComponentType<React.ComponentProps<'svg'>>;
};
const cardsData: CardProps[] = [
  { text: "關於程式設計班", link: "/homepage", img: coding},
  { text: "加入我們", link: "/page2", img: coding},
  { text: "FAQ", link: "/page3", img: coding},
  { text: "部落格", link: "/page3", img: coding},
  { text: "旦旦解題網", link: "/page3", img: coding},
  { text: "入班考講義", link: "/page3", img: coding},
  { text: "課堂講義", link: "/page3", img: coding},
  { text: "聯絡我們", link: "/page3", img: coding},
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
  const [screenW, setScreenW] = useState(0);

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

  return (
    <BrowserOnly>
      {() => 
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
                  height={cardWidth} // 高度也等於寬度 → 保持正方形
                />
              })}
            </div>
          );
        })}
      </div>
      }
    </BrowserOnly>
  );
}
