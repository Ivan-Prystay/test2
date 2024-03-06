import React from "react";

import "../styles/global.css";

interface PageProps {}

function DragsDelivery({
  Component,
  pageProps,
}: {
  Component: React.FC<PageProps>;
  pageProps: PageProps;
}) {
  return <Component {...pageProps} />;
}
export default DragsDelivery;
