"use client";

import AppartmenrServices from "@/components/AppartmentService";

export interface PageProps {}

export default function Page({}: PageProps) {
  return (
    <div className=" pt-5 px-[30px] pb-10 md:pt-10 md:px-10 md:pb-[60px] lg:p-10 lg:pb-20 xl:p-20">
      <AppartmenrServices />
    </div>
  );
}
