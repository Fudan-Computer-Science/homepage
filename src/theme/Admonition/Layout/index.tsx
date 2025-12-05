import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';

import type {Props} from '@theme/Admonition/Layout';

import styles from './styles.module.css';

function AdmonitionContainer({
  type,
  className,
  children,
}: Pick<Props, 'type' | 'className'> & {children: ReactNode}) {
  return (
    <div
      className={clsx(
        ThemeClassNames.common.admonition,
        ThemeClassNames.common.admonitionType(type),
        styles.admonition,
        className,
      )}>
      {children}
    </div>
  );
}

function AdmonitionHeading({icon, title}: Pick<Props, 'icon' | 'title'>) {
  return (
    <summary className={styles.admonitionHeading}>
      <span className={styles.admonitionIcon}>{icon}</span>
      {title}
    </summary>
  );
}

function AdmonitionContent({children}: Pick<Props, 'children'>) {
  return children ? (
    <div className={styles.admonitionContent}>{children}</div>
  ) : null;
}

export default function AdmonitionLayout(props: Props): ReactNode {
  const {type, icon, title, children, className} = props;
  if(typeof title === 'string' || (Array.isArray(title) && typeof title[0] === 'string')){
    let newTitle = title;
    if(typeof newTitle === 'string'){
      newTitle = newTitle.replace("?=spoiler","");
    } else if(Array.isArray(newTitle) && typeof newTitle[0] === 'string'){
      newTitle = [newTitle[0].replace("?=spoiler",""), ...newTitle.slice(1)];
    }
    return (
      <AdmonitionContainer type={type} className={className}>
        <details>
            {newTitle || icon ? <AdmonitionHeading title={newTitle} icon={icon} /> : null}
            <AdmonitionContent>{children}</AdmonitionContent>
        </details>
      </AdmonitionContainer>
    )
  }
  return (
    <AdmonitionContainer type={type} className={className}>
      {title || icon ? <AdmonitionHeading title={title} icon={icon} /> : null}
      <AdmonitionContent>{children}</AdmonitionContent>
    </AdmonitionContainer>
  );
}
