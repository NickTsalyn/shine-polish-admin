"use client";

import MoveServices from "@/components/MoveInOutService";

export interface PageProps {}

export default function Page({}: PageProps) {
  return (
    <div className=" pt-5 px-[30px] pb-10 md:pt-10 md:px-10 md:pb-[60px] lg:p-[60px] lg:pb-[100px] xl:p-20">
      <MoveServices />
    </div>
  );
}
