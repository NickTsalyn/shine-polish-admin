"use client";
import Image from "next/image";
import Button from "./UI/Button";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import Link from "next/link";

interface Background {
  id: number;
  descrImg: string;
  imageBg: string;
}
interface LastSectionBgProps {
  children?: React.ReactNode;
  data: Background[];
}

export default function LastSectionHome({
  children,
  data,
}: LastSectionBgProps) {
  return (
    <section className="relative">
      <div className="mx-0 my-auto">
        <div className="z-0 h-[258px] md:h-[592px] lg:h-[740px] lg:min-w-[1240px] xl:h-[1040px] xl:min-w-[1680px]">
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
                  <div className="h-[258px] md:h-[592px] lg:h-[740px] lg:min-w-[1240px] xl:h-[1040px] xl:min-w-[1680px]">
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
        <div className="z-1 absolute top-0 left-0 right-0 h-[258px] md:h-[592px] lg:h-[740px] lg:min-w-[1240px] xl:h-[1040px] xl:min-w-[1680px]  bg-background-img-grad"></div>
        <div className=" container pb-5 px-5 pt-5 lg:pr-[40px] xl:pr-[80px] md:pt-8 lg:pt-16 xl:pt-18 md:py-10 lg:pl-[40px] xl:pl-[80px] absolute top-1 inset-0 flex flex-col justify-between z-10 lg:h-[740px] xl:h-[1040px]">
          <h2 className="text-white h2 text-center drop-shadow-md top-0">
            Enjoy the time spent with your <br />
            loved ones...
          </h2>

          <div className="flex  items-center z-10 justify-between lg:pr-[40px] xl:pr-[80px] lg:pl-[40px] xl:pl-[80px]">
            <Button style="home-book-now" type="button">
              <Link href="/booking" className="text-secondary text-5 font-bold md:text-[36px] lg:text-5xl xl:text-6xl drop-shadow-md">
                Book Now
              </Link>
            </Button>
            <span className="h2 md:text-[36px] text-white">
              ...in a clean house
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
