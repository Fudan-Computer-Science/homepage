import React, {type ReactNode} from 'react';
import Layout from '@theme-original/DocItem/Layout';
import type LayoutType from '@theme/DocItem/Layout';
import type {WrapperProps} from '@docusaurus/types';
import Comment from '@site/src/components/GiscusComment'; 
import { useDoc } from '@docusaurus/plugin-content-docs/client';

type Props = WrapperProps<typeof LayoutType>;

export default function LayoutWrapper(props: Props): ReactNode {  
  const { frontMatter } = useDoc();
  const { hide_comment: hideComment } = frontMatter;
  return (
    <>
      <Layout {...props} />
      {!hideComment && <div style={{ marginTop: '4rem' }}>
        <Comment />
      </div>}
    </>
  );
}
