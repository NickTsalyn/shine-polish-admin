"use client";

import DeepCleaning from "@/components/DeepCleaning";

export interface PageProps {}

export default function Page({}: PageProps) {
  return (
    <div className=" pt-6 px-4 pb-[60px] md:pt-10 md:px-10 md:pb-[60px] lg:p-[60px] lg:pb-[100px] xl:p-20">
      <DeepCleaning />
    </div>
  );
}
