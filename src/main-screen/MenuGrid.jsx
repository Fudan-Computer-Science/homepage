import React from "react";
import "./MenuGrid.css";

const menuItems = [
  { link: "/img/main_screen", img: require("./img/main_screen/1.png") },
  { link: "/page2", img: require("./img/main_screen/2.png") },
  { link: "/page3", img: require("./img/main_screen/3.png") },
  { link: "/page4", img: require("./img/main_screen/4.png") },
  { link: "/page5", img: require("./img/main_screen/5.png") },
  { link: "/page6", img: require("./img/main_screen/6.png") },
  { link: "/page7", img: require("./img/main_screen/7.png") },
  { link: "/page8", img: require("./img/main_screen/8.png") },
];

export default function MenuGrid() {
  return (
    <div className="menu-grid">
      {menuItems.map((item, index) => (
        <a key={index} href={item.link} className="menu-item">
          <img src={item.img} alt={`選單圖片 ${index + 1}`} />
        </a>
      ))}
    </div>
  );
}