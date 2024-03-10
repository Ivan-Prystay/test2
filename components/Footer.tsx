import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="bg-indigo-200 text-center fixed bottom-0 w-full py-4">
      <p>
        {"Copyright © "}
        <Link color="inherit" href="https://github.com/Ivan-Prystay">
          Created by Ivan Prystay
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </p>
    </footer>
  );
}
export default Footer;
