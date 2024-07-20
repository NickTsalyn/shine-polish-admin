"use client";

import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import Image from "next/image";

import Button from "./UI/Button";
import Link from "next/link";

interface HeroSectionBgProps {
  children?: React.ReactNode;
  data: Background[];
}
interface Background {
  id: number;
  descrImg: string;
  imageBg: string;
}

export default function Hero({ data }: HeroSectionBgProps) {
  return (
    <section className="relative mb-[60px] md:mb-[80px] lg:mb-[120px] xl:mb-[120px]">
      <div className="z-0 h-[272px] md:h-[503px] lg:h-[792px] lg:min-w-[1240px] xl:h-[1018px] xl:min-w-[1680px]">
        <ul className="h-full w-full">
          <Swiper
            slidesPerView={1}
            effect={"fade"}
            fadeEffect={{ crossFade: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            speed={2000}
            loop={true}
            modules={[Autoplay, EffectFade]}
          >
            {data.map(({ id, imageBg, descrImg }) => (
              <SwiperSlide key={id}>
                <div className="h-[272px] md:h-[503px] lg:h-[792px] lg:min-w-[1240px] xl:h-[1018px] xl:min-w-[1680px]">
                  <Image
                    src={imageBg}
                    alt={descrImg}
                    fill={true}
                    style={{ objectFit: "cover" }}
                    sizes="100vw"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO88vx5PQAIXAMjsf8RCAAAAABJRU5ErkJggg=="
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </ul>
      </div>
      <div className="absolute z-10 top-0 left-0 right-0 p-5 lg:p-10 xl:p-16 container ">
        <h1 className="h1 text-white text-shadow max-w-[282px] md:max-w-[730px] lg:max-w-[1124px] xl:max-w-[1348px] text-xl md:text-[52px] lg:text-[80px] xl:text-8xl md:leading-normal text-center font-medium mb-[138px] md:mb-[248px] lg:mb-[390px] xl:mb-[600px] mr-auto ml-auto">
          Spend time on your loved ones, not on cleaning
        </h1>
        <div className="flex justify-between">
          <Button type="button" style="home-contact-us">
            <span className="text-secondary text-xl md:text-4xl lg:text-[64px] lg:leading-none font-bold">
              Contact Us
            </span>
          </Button>
          <Button type="button" style="home-book-now">
            <Link href="/booking" className="text-secondary text-xl md:text-4xl lg:text-[64px] lg:leading-none font-bold">
              Book Now
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
