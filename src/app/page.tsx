import localFont from "next/font/local";

import Hero from "@/components/hero";
import SectionEstimate from "@/components/SectionEstimate";
import BeforeAfter from "@/components/BeforeAfter";
import dataSlider from "@/data/slider-data.json";
import { Reviews } from "@/components/Reviews";
import ServiceAreas from "@/components/ServiceAreas";
import SectionJustAsk from "@/components/JustAskSection";
import React from "react";
import WorkWithUs from "@/components/WorkWithUs";
import LastSectionHome from "@/components/LastSectionHome";
import dataBackground from "@/data/background-data.json";
import dataHeroBackground from "@/data/background-hero.json";

export default function Home() {
  return (
    <>
      <Hero data={dataHeroBackground} />
      <SectionEstimate />
      <BeforeAfter data={dataSlider} />
      <Reviews />
      <ServiceAreas />
      <SectionJustAsk />
      <WorkWithUs />
      <LastSectionHome data={dataBackground} />
    </>
  );
}
