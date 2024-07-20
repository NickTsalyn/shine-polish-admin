"use client";

import Link from "next/link";
import { FC } from "react";

import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { SOCIAL_MEDIA_LINKS } from "@/global/navigation";

interface SocialMediaLink {
  href: string;
}

interface SocialMediaLinkProps {
  links: SocialMediaLink[];
}

const SocialMedia: FC<SocialMediaLinkProps> = () => {
  const renderIcon = (href: string) => {
    if (href.includes("facebook")) return <FacebookRoundedIcon />;
    if (href.includes("instagram")) return <InstagramIcon />;
    if (href.includes("whatsapp")) return <WhatsAppIcon />;
    return null;
  };
  return (
    <div className="flex gap-2 mb-3">
      {SOCIAL_MEDIA_LINKS.map((link, index) => (
        <Link key={index} href={link.href} passHref>
          <span className="text-white">{renderIcon(link.href)}</span>
        </Link>
      ))}
    </div>
  );
};

export default SocialMedia;
