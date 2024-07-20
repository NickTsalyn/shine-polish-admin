"use client";
import Button from "@/components/UI/Button";
import Image from "next/image";
import Link from "next/link";

const BgnImg = () => {
  return (
    <div className="absolute inset-0 z-[-1]">
      <div
        className="absolute z-10 drop-shadow-[0px_4px_4px_0_rgba(0, 0, 0, 0.25)] size-full"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.25)",
          backgroundPosition: "[19.499px -81.19px ]",
          backgroundSize: "[99.461% 107.491%]",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      <div>
        <Image
          src="/images/pexels_pixabay.webp"
          alt="photo bedroom"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority
        />
      </div>
    </div>
  );
};

const BookingFormHome = () => {
  return (
    <div className="relative h-[calc(100vh-84px)] md:h-[calc(100vh-96px)] lg:h-screen w-full ">
      <BgnImg />
      <div className="container flex flex-col  py-9 md:py-11 lg:py-12 h-full">
        <div>
          <h1 className="h2 font-bold text-white text-center mb-4 md:mb-6 lg:mb-9">
            Tell us about your house
          </h1>
          <p className=" subtitle-booking text-white text-center">
            We don’t share your personal information with anyone
          </p>
        </div>
        <div className="mt-auto w-full">
          <p className=" subtitle-booking text-white text-center mb-4 md:mb-6 lg:mb-9">
            So let’s start to
          </p>
          <div className="flex justify-center items-center">
          <Button type="button" style="complete-booking">
            <Link
              href={"/booking/step_1"}
              className="text-white subtitle-booking xl:text-[42px] font-bold mx-auto"
            >
              complete your booking
            </Link>
          </Button>
        </div>
        </div>
      </div>
    </div>
  );
};
export default BookingFormHome;
