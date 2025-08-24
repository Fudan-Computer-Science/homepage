import React from "react";
import Marquee from "react-fast-marquee";
import "./BannerMarquee.css";
import useBaseUrl from '@docusaurus/useBaseUrl';


export default function BannerMarquee() {
  return (
    <div>
      <Marquee gradient={false} speed={50}>
        <img src={useBaseUrl("/img/main_screen/news_ticker/114_test_time.png")} className="banner-img" />
      </Marquee>
    </div>
  );
}

