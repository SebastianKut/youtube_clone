// custom document is only rendered on the server, so handelers like onCLick cant be used on Document
// you can update html tags etc

import { createGetInitialProps } from '@mantine/next';
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    // These tags can be modified
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.getInitialProps = createGetInitialProps();
