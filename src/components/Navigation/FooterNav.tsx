"use client";

import Link from "next/link";
import { FC } from "react";

interface FooterNavLink {
  href: string;
  text: string;
}

interface FooterNavLinkProps {
  links: FooterNavLink[];
}

const FooterMainNav: FC<FooterNavLinkProps> = ({ links }) => {
  return (
    <ul className="grid lg:flex lg:justify-between lg:auto-rows-auto">
      {links.map((link, index) => (
        <li
          key={index}
          className="mb-2 text-3 md:text-4 lg:text-3 text-white lg:text-main font-light"
        >
          <Link href={link.href}>{link.text}</Link>
        </li>
      ))}
    </ul>
  );
};
export default FooterMainNav;
