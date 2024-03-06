import React from "react";
import Link from "next/link";

function Home() {
  return (
    <div>
      <h1>Shop</h1>
      <Link href="/cart"> Cart</Link>
    </div>
  );
}

export default Home;
