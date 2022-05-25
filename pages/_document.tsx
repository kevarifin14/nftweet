import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />

        <body className="bg-light dark:bg-dark transition-colors duration-500">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
