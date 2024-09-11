import Link from "next/link";
import React from "react";

const links = [
  { label: "Home", href: "/" },
  { label: "Documentation", href: "/documentation" },
  { label: "Resources", href: "/resources" },
];

const Navbar = () => {
  return (
    <header className="flex items-center justify-between border-b px-8 py-3">
      <Link href="/" className="text-md text-black font-medium">
        TR<span className="text-yellow-500">rt</span>
      </Link>
      <div className="flex items-center gap-4">
        {links.map((item) => (
          <Link key={item.label} href={item.href} className="text-sm">
            {item.label}
          </Link>
        ))}
      </div>

      <div className="rounded-full text-white bg-black p-2 px-3 cursor-pointer text-xs">
        Get for free
      </div>
    </header>
  );
};

export default Navbar;
