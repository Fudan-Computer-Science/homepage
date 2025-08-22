import React from "react";
import "./MenuGrid.css";
import useBaseUrl from "@docusaurus/useBaseUrl";

const menuItems = [
  { link: "/img/main_screen", img: "/img/main_screen/1.png" },
  { link: "/page2", img: "/img/main_screen/2.png" },
  { link: "/page3", img: "/img/main_screen/3.png" },
  { link: "/page4", img: "/img/main_screen/4.png" },
  { link: "/page5", img: "/img/main_screen/5.png" },
  { link: "/page6", img: "/img/main_screen/6.png" },
  { link: "/page7", img: "/img/main_screen/7.png" },
  { link: "/page8", img: "/img/main_screen/8.png" },
];

export default function MenuGrid() {
  return (
    <div className="menu-grid">
      {menuItems.map((item, index) => (
        <a key={index} href={item.link} className="menu-item">
          <img src={useBaseUrl(item.img)} alt={`選單圖片 ${index + 1}`} />
        </a>
      ))}
    </div>
  );
}
