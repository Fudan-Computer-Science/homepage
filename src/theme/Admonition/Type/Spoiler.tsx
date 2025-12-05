import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import type {Props} from '@theme/Admonition/Type/Note';
import AdmonitionLayout from '@theme/Admonition/Layout';

const infimaClassName = 'alert alert--secondary';

const defaultProps = {
  icon: <></>,
  title: (
    <Translate
      id="theme.admonition.spoiler"
      description="The default label used for the Spoiler admonition (:::spoiler)">
      spoiler
    </Translate>
  ),
};

export default function AdmonitionTypeSpoiler(props: Props): ReactNode {
  return (
    <AdmonitionLayout
      {...defaultProps}
      {...props}
      className={clsx(infimaClassName, props.className)}>
      {props.children}
    </AdmonitionLayout>
  );
}
