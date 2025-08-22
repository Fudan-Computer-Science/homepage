import React from "react";
import Marquee from "react-fast-marquee";
import "./BannerMarquee.css";

const banners = [
  "static/img/main_screen/news_ticker/114_test_time.png"
];

export default function BannerMarquee() {
  return (
    <Marquee gradient={false} speed={50}>
      {banners.map((src, index) => (
        <img key={index} src={src} alt={`Banner ${index}`} className="banner-img" />
      ))}
    </Marquee>
  );
}
