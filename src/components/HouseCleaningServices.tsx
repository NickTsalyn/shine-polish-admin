import { HOUSE_SERVICES } from "@/global/house-cleaning";
import BasicBreadcrumbs from "./UI/Breadcrumbs";
import Link from "next/link";

export default function HouseServices() {
  const { title, paragraphs, types, benefits, outOfService } = HOUSE_SERVICES;
  return (
    <div className=" body text-text  flex flex-col justify-start items-start ">
      <h1 className=" subtitle-booking md:text-5xl lg:text-6xl md:leading-6 text-main max-w-64 md:max-w-[682px] lg:max-w-[920px] text-start mb-5 md:mb-10 lg:mb-7 ">
        {title}
      </h1>
      <div className=" mb-2 md:mb-5 lg:mb-0">
        <BasicBreadcrumbs
          pageHref="house-cleaning-services"
          roomName="House Cleaning"
        />
      </div>
      <div>
        <ul className="flex flex-col gap-5 lg:gap-8 mb-5 lg:mb-8">
          {paragraphs.map((p, index) => (
            <li key={index}>
              <p>{p}</p>
            </li>
          ))}
        </ul>
        <h2 className=" text-xl md:text-3xl text-main ">{types.title}</h2>
        <p>{types.paragraph}</p>
        <p>{types.subtitle}</p>
        <ul className=" list-disc pl-5">
          {types.list.map((p, index) => (
            <li key={index}>{p}</li>
          ))}
        </ul>
        <p className=" mb-5 lg:mb-8">
          {types.text}
          <Link href="tel:+4708003249" className=" text-main">
            {" "}
            contact us.
          </Link>
        </p>
        <h2 className=" text-xl md:text-3xl text-main ">{benefits.title}</h2>
        <p>{benefits.paragraph}</p>
        <h3 className=" font-bold">{benefits.subtitle1}</h3>
        <ul className="flex flex-col md:gap-1  ">
          {benefits.text1.map((p, index) => (
            <li key={index}>
              <p>{p}</p>
            </li>
          ))}
        </ul>
        <h3 className=" font-bold md:my-1">{benefits.subtitle2}</h3>
        <p>{benefits.text2}</p>
        <h3 className=" font-bold md:my-1">{benefits.subtitle3}</h3>
        <ul className="flex flex-col md:gap-1  ">
          {benefits.text3.map((p, index) => (
            <li key={index}>
              <p>{p}</p>
            </li>
          ))}
        </ul>
        <h3 className=" font-bold md:my-1">{benefits.subtitle4}</h3>
        <p>{benefits.text4}</p>
        <h3 className=" font-bold md:my-1">{benefits.subtitle5}</h3>
        <p>{benefits.text5}</p>
        <h3 className=" font-bold md:my-1">{benefits.subtitle6}</h3>
        <p>{benefits.text6}</p>
        <h3 className=" font-bold md:my-1">{benefits.subtitle7}</h3>
        <p>
          {benefits.text7_1}
          <Link href="/deep-cleaning">
            <span className=" text-main underline">deep cleaning</span>,
          </Link>
          <Link href="/move-in-out-services" className=" text-main">
            {" "}
            <span className=" text-main underline">
              move-in/move out cleaning
            </span>{" "}
          </Link>
          {benefits.text7_2}
        </p>
        <h3 className=" font-bold md:my-1">{benefits.subtitle8}</h3>
        <p>{benefits.text8}</p>
        <h3 className=" font-bold md:my-1 ">{benefits.subtitle9}</h3>
        <p className=" mb-5 lg:mb-8">{benefits.text9}</p>
        <h2 className=" text-xl md:text-3xl text-main ">
          {outOfService.title}
        </h2>
        <p className="md:my-1">{outOfService.paragraph}</p>
        <ul className=" list-disc pl-5 mb-1">
          {outOfService.list.map((p, index) => (
            <li key={index}>{p}</li>
          ))}
        </ul>
        <p>{outOfService.text}</p>
      </div>
    </div>
  );
}
