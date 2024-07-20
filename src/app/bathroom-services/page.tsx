"use client";

import Bathroom from "@/components/Bathroom";

export interface PageProps {}

export default function Page({}: PageProps) {
  return (
    <div className=" p-5 md:p-7 lg:p-[42px] xl:p-20">
      <Bathroom />
    </div>
  );
}