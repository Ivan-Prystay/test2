import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <>
      <Head>
        <title>Drags delivery</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <Header />
      <main className="px-3">{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
