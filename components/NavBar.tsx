import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Shop" },
  { href: "/cart", label: "Shopping Cart" },
  { href: "/history", label: "History" },
  { href: "/coupons", label: "Coupons" },
];

const NavBar = () => {
  const pathName = usePathname();

  return (
    <nav>
      <ul className="text-white flex justify-start gap-12 text-2xl py-10">
        {links.map((link, index) => (
          <li
            key={index}
            className={
              index !== links.length - 1
                ? "border-r-2 border-gray-400 pr-10"
                : ""
            }
          >
            <Link
              href={link.href}
              className={`ease-linear duration-700 hover:duration-300 hover:ease-linear hover:bg-red-400 bg-indigo-500 py-2 px-4 rounded-xl ${
                pathName === link.href ? "bg-red-400" : " "
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
