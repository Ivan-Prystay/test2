import Layout from "../components/Layout";
import "../styles/global.css";

interface PageProps {}

function DragsDelivery({
  Component,
  pageProps,
}: {
  Component: React.FC<PageProps>;
  pageProps: PageProps;
}) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
export default DragsDelivery;
