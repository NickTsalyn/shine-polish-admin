import Image from "next/image";
import Link from "next/link";

export const DarkLogo = () => {
  return (
    <Link href={"/home"} className="w-full h-full relative">
      <Image
        src="/icons/logo/logo_dark_bg.svg"
        alt="Logo"
        layout="fill"
        objectFit="contain"
        priority
      />
    </Link>
  );
};
export const ShineLogo = () => {
  return (
    <Link href={"/home"} className="w-full h-full relative">
      <Image
        src="/icons/logo/logo_shine.svg"
        alt="Logo"
        layout="fill"
        objectFit="contain"
        priority
      />
    </Link>
  );
};
