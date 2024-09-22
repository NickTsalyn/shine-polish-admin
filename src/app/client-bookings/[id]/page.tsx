"use client";

import ClientBookings from "@/components/ClientBookings/ClientBookings";


export interface PageProps {
  params: { id: string };
}
export default function Page({params}: PageProps) {

  return (
    <div className="py-5 md:p-7 lg:p-10 xl:p-16 lg:py-20 min-h-screen">
      <ClientBookings ownerId={params.id} />
    </div>
  );
}
