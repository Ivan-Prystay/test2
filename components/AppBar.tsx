import Link from "next/link";

export default function AppBar() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/"></Link>
          </li>
          |
          <li>
            <Link href="/cart"></Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
