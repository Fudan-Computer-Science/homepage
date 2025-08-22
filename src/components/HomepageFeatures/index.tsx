/*
import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

export const openInNewTab = (url) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
  if (newWindow) newWindow.opener = null;
};

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
/*   {
    title: '最新消息',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        現在開放報名
      </>
    ),
  }, */
  {
    title: 'DanDanjudge',
    Svg: require('@site/static/img/ddj_logo.svg').default,
    description: (
      <>
      <Link to="./" href="#" onClick = {() => openInNewTab("https://dandanjudge.fdhs.tyc.edu.tw")}>旦旦解題網</Link>
      </>
    ),
  },
  {
    title: '公布欄',
    Svg: require('@site/static/img/13th_bigpic.svg').default,
    description: (
      <>
        <Link to="./blog/tags/announcement" href="#">點我前往</Link>
      </>
    ),
  },
  {
    title: '回饋',
    Svg: require('@site/static/img/13th_bigpic.svg').default,
    description: (
      <>
       <Link to="./blog/tags/feedback" href="#">點我前往</Link>
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
*/