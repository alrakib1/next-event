import Layout from "@/components/layout/layout";
import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Head>
          <title>Next Event</title>
          <meta
            name="description"
            content="Welcome to Next Event. We have various events for you. Feel free to checkout."
          />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
            key="viewport"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
