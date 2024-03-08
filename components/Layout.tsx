import Header from "./Header";
import Footer from "./Footer";

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <main className="px-3">{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
