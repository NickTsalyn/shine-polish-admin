"use client";

import Link from "next/link";
import { FC, useState } from "react";
import CleaningOptions from "../Menu/CleaningOptions";
import { PROCESSES_LINKS, SERVICES_LINKS } from "@/global/navigation";

interface NavLink {
  href: string;
  text: string;
}

interface NavLinksProps {
  links: NavLink[];
  handleClose?: () => void;
}

const NavLinks: FC<NavLinksProps> = ({ links, handleClose }) => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const handleClick = (index: number | null) => {
    setSelectedItem(index);
  };

  return (
    <ul className="flex flex-col gap-5 justify-start text-[18px] xl:text-[20px] font-normal leading-[1.2] text-white">
      {links.map((link, index) => (
        <li key={index} className="relative" onClick={handleClose}>
          <Link href={link.href} onClick={() => handleClick(index)}>
            {link.text}
          </Link>
          {selectedItem === index && (
            <span
              className="absolute top-0 right-0 bottom-0 w-[2px]  bg-white rounded"
              style={{ content: "" }}
            />
          )}
        </li>
      ))}
      <li>
        <CleaningOptions
          color="#fff"
          buttonText="Cleaning Process"
          links={PROCESSES_LINKS}
        />
      </li>
      <li>
        <CleaningOptions
          color="#fff"
          buttonText="Cleaning Services"
          links={SERVICES_LINKS}
        />
      </li>
    </ul>
  );
};
export default NavLinks;
