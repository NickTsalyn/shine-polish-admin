import { APPARTMENT_SERVICES } from "@/global/appartmen-cleaning";
import BasicBreadcrumbs from "./UI/Breadcrumbs";

export default function AppartmenrServices() {
  const { title, paragraphs, benefits, services, deepCleaning, aboutUs } =
    APPARTMENT_SERVICES;
  return (
    <div className=" body text-text flex flex-col justify-center md:justify-start items-center md:items-start ">
      <h1 className=" subtitle-booking md:text-[32px] lg:text-6xl md:leading-6 text-main max-w-64 md:max-w-md lg:max-w-3xl text-center md:text-start mb-5 md:mb-10 lg:mb-7 ">
        {title}
      </h1>
      <div className=" mb-2 md:mb-5 lg:mb-0">
        <BasicBreadcrumbs
          pageHref="appartment-services"
          roomName="Professional Apartment Cleaning Service"
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
        <h2 className=" text-xl md:text-3xl text-main ">{benefits.title}</h2>
        <ul className="flex flex-col gap-5 lg:gap-8 mb-5 lg:mb-8">
          {benefits.paragraphs.map((p, index) => (
            <li key={index}>
              <p>{p}</p>
            </li>
          ))}
        </ul>
        <h2 className=" text-xl md:text-3xl text-main ">{services.title}</h2>
        <ul className="flex flex-col gap-5 lg:gap-8 mb-5 lg:mb-8">
          {services.paragraphs.map((p, index) => (
            <li key={index}>
              <p>{p}</p>
            </li>
          ))}
        </ul>
        <h3 className=" text-main">Kitchen</h3>
        <ul className=" list-disc pl-5">
          {services.kitchenServices.map((p, index) => (
            <li key={index}>
              <p className=" inline ">{p}</p>
            </li>
          ))}
        </ul>
        <h3 className=" text-main">Bathrooms</h3>
        <ul className=" list-disc pl-5">
          {services.bathroomServices.map((p, index) => (
            <li key={index}>
              <p className=" inline ">{p}</p>
            </li>
          ))}
        </ul>
        <h3 className=" text-main">Bedrooms</h3>
        <ul className=" list-disc pl-5 mb-5 lg:mb-8">
          {services.bedroomServices.map((p, index) => (
            <li key={index}>
              <p className=" inline ">{p}</p>
            </li>
          ))}
        </ul>
        <h2 className=" text-xl md:text-3xl text-main ">
          {deepCleaning.title}
        </h2>
        <ul className="flex flex-col  mb-5 lg:mb-8">
          {deepCleaning.paragraps.map((p, index) => (
            <li key={index} className={index === 0 ? "mb-5" : ""}>
              <p>{p}</p>
            </li>
          ))}
        </ul>
        <ul className=" list-disc pl-5 mb-5 lg:mb-8">
          {deepCleaning.resons.map((p, index) => (
            <li key={index}>
              <p className=" inline ">{p}</p>
            </li>
          ))}
        </ul>
        <h2 className=" text-xl md:text-3xl text-main ">{aboutUs.title}</h2>
        <ul className="flex flex-col gap-5 lg:gap-8">
          {aboutUs.paragraphs.map((p, index) => (
            <li key={index}>
              <p>{p}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
