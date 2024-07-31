import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "../styles/globals.css";
import { Sidebar } from "@/components/Sidebar";
import Header from "@/components/Header/Header";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Shine&Polish",
  description: "Cleaning service Atlanta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <Header/>
        <Sidebar />
        <main className="lg:ml-[200px] xl:ml-[244px]">{children}</main>
      </body>
    </html>
  );
}
