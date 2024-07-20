"use client";

import React from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

interface Slide {
  id: number;
  descrBefore: string;
  descrAfter: string;
  imageBefore: string;
  imageAfter: string;
}
interface BeforeAfterProps {
  children?: React.ReactNode;
  data: Slide[];
}

export default function BeforeAfter({ children, data }: BeforeAfterProps) {
  return (
    <section className="mb-[60px] md:mb-[80px] lg:mb-[120px] xl:mb-[160px]">
      <div className="container mx-auto">
        <div className="mx-auto w-[335px] md:w-[712px] lg:w-[1156px] xl:w-[1516px]">
          <div className="hidden md:flex justify-around">
            <h2 className="block h2 text-main text-center mb-[9px] md:mb-[18px] lg:mb-[30px] xl:mb-[36px]">
              Before
            </h2>
            <h2 className="block h2 text-main text-center mb-[9px] md:mb-[18px] lg:mb-[30px] xl:mb-[36px]">
              After
            </h2>
          </div>

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
              {data.map(
                ({ id, descrBefore, descrAfter, imageBefore, imageAfter }) => (
                  <SwiperSlide key={id}>
                    <div className="h-[155px] md:h-[337px] lg:h-[472px] xl:h-[533px] w-full relative left-0 top-0 flex">
                      <div className="block w-[187px] md:w-[404px] lg:w-[653px] xl:w-[854px] h-[155px] md:h-[337px] lg:h-[472px] xl:h-[533px] clip-path-swiper-before absolute">
                        <Image
                          src={imageBefore}
                          alt={descrBefore}
                          fill={true}
                          style={{ objectFit: "cover" }}
                          sizes="50vw"
                          placeholder="blur"
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO88vx5PQAIXAMjsf8RCAAAAABJRU5ErkJggg=="
                        />
                      </div>
                      <div className="block w-[212px] md:w-[458px] lg:w-[741px] xl:w-[966px] h-[155px] md:h-[337px] lg:h-[472px] xl:h-[533px] clip-path-swiper-after absolute left-[123px] md:left-[254px] lg:left-[415px] xl:left-[552px]">
                        <Image
                          src={imageAfter}
                          alt={descrAfter}
                          fill={true}
                          style={{ objectFit: "cover" }}
                          sizes="50vw"
                          placeholder="blur"
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO88vx5PQAIXAMjsf8RCAAAAABJRU5ErkJggg=="
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                )
              )}
            </Swiper>
          </ul>
        </div>
      </div>
    </section>
  );
}
