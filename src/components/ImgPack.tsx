import React, { useContext } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
type ImgProps = {
  name: string;
  folder?: string;
  alt?: string;
  style?: React.CSSProperties;
};

export const ImgBaseContext = React.createContext('@site/static/img');

export const ImgBaseProvider: React.FC<{ base: string; children: React.ReactNode }> = ({ base, children }) => {
  return <ImgBaseContext.Provider value={base}>{children}</ImgBaseContext.Provider>;
};

export default function Img({ name, alt = '', style }: ImgProps) {
  const imgBase = useContext(ImgBaseContext);
  console.log(useBaseUrl(`${imgBase}/${name}`));
  return <img src={useBaseUrl(`${imgBase}/${name}`)} alt={alt} style={style} />;
}
