import React from "react";
import Marquee from "react-fast-marquee";
import styles from "./BannerMarquee.module.css";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Heading from "@theme/Heading";
import useBaseUrl from "@docusaurus/useBaseUrl";

const banners:string[] = [
  "/img/main_screen/news_ticker/114_test_time.png",
  "/img/main_screen/news_ticker/14th.jpg"
]

export default function BannerMarquee() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <header className={clsx("hero", styles.heroBanner)}>
      {/* 背景跑馬燈 */}
      <div className={styles.marqueeBg}>
        <Marquee speed={50} gradient={false}>
          {[...banners, ...banners].map((link, idx) => (
            <div
              key={idx}
              style={{
                height: 400,     // Banner 高度
                flexShrink: 0,
                overflow: "hidden",
                position: "relative",
                //width: 600       // 每張圖片寬度，可調整
              }}
            >
              <img
                src={useBaseUrl(link)}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }}
                alt="banner"
              />
            </div>
          ))}
        </Marquee>
      </div>


      {/* 文字內容 */}
      <div className={styles.textOverlay}>
        <Heading as="h1" className={styles.title}>
          {siteConfig.title}
        </Heading>
        <p className={styles.subtitle}>{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

/*         <Link
          className="button button--secondary button--lg"
          to="/docs/intro/intro/入班考試資訊"
        >
          入班考資訊
        </Link> */
