"use client";

import Link from "next/link";
import { FC } from "react";

interface FooterLink {
  href: string;
  text: string;
}

interface FooterLinksProps {
  links: FooterLink[];
}

const FooterNavMobile: FC<FooterLinksProps> = ({ links }) => {
  return (
    <ul className="">
      {links.map((link, index) => (
        <li key={index} className="mb-2 text-3 md:text-4 text-white font-light">
          <Link href={link.href}>{link.text}</Link>
        </li>
      ))}
    </ul>
  );
};
export default FooterNavMobile;
