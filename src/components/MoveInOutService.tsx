import { MOVE_INOUT_SERVICES } from "@/global/move-cleaning";
import BasicBreadcrumbs from "./UI/Breadcrumbs";

export default function MoveServices() {
  const {
    title,
    paragraphs,
    benefits,
    outServices,
    inServices,
    involves,
    aboutUs,
  } = MOVE_INOUT_SERVICES;
  return (
    <div className=" body text-text  flex flex-col justify-start items-start ">
      <h1 className=" subtitle-booking md:text-5xl lg:text-6xl md:leading-6 text-main max-w-64 md:max-w-[682px] lg:max-w-[920px] text-start mb-5 md:mb-10 lg:mb-7 ">
        {title}
      </h1>
      <div className=" mb-2 md:mb-5 lg:mb-0">
        <BasicBreadcrumbs
          pageHref="move-in-out-services"
          roomName="Move-In and Move-Out Cleaning"
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
        <h2 className=" text-xl md:text-3xl text-main mb-5 md:mb-0  ">
          {outServices.title}
        </h2>
        <ul className="flex flex-col gap-5 lg:gap-8 mb-5 lg:mb-8">
          {outServices.paragraphs.map((p, index) => (
            <li key={index}>
              <p>{p}</p>
            </li>
          ))}
        </ul>
        <h2 className=" text-xl md:text-3xl text-main mb-5 md:mb-0  ">
          {inServices.title}
        </h2>
        <p className="mb-5 lg:mb-8">{inServices.paragraphs}</p>
        <h2 className=" text-xl md:text-3xl text-main ">{involves.title}</h2>
        <p className="mb-5 lg:mb-8"> {involves.paragraph}</p>
        <h3 className=" mb-5 font-bold lg:mb-8">{involves.smallTitle}</h3>
        <h3 className=" font-bold">Kitchen</h3>
        <p className=" mb-5 lg:mb-8">{involves.kitchen}</p>
        <h3 className=" font-bold">General dusting</h3>
        <ul className="flex flex-col gap-1 mb-5 md:mb-1 ">
          {involves.generalDusting.map((p, index) => (
            <li key={index}>
              <p>{p}</p>
            </li>
          ))}
        </ul>
        <p className=" mb-5 lg:mb-8">{involves.generalDustingParagraph}</p>
        <h3 className="mb-1 font-bold">General dusting</h3>
        <ul className="flex flex-col gap-1 mb-5 md:mb-1 ">
          {involves.generalDustingSecond.map((p, index) => (
            <li key={index}>
              <p>{p}</p>
            </li>
          ))}
        </ul>

        <p className=" mb-5 lg:mb-8">
          {involves.generalDustingParagraphSecond}

          <span className=" font-bold">
            {involves.generalDustingParagraphThird}
          </span>
        </p>
        <ul className="flex flex-col gap-1 mb-5 ">
          {involves.generalDustingThird.map((p, index) => (
            <li key={index}>
              <p>{p}</p>
            </li>
          ))}
        </ul>
        <h2 className=" text-xl md:text-3xl text-main ">{benefits.titel}</h2>
        <p className="mb-5">{benefits.paragraph}</p>
        <h3 className="mb-1 font-bold">{benefits.subTitleFirst}</h3>
        <p className="mb-5">{benefits.paragraphFirst}</p>
        <h3 className="mb-1 font-bold">{benefits.subTitleSecond}</h3>
        <p className="mb-5">{benefits.paragraphSecond}</p>
        <h3 className="mb-1 font-bold">{benefits.subTitleThird}</h3>
        <p className="mb-5">{benefits.paragraphThird}</p>
        <h2 className=" text-xl md:text-3xl text-main ">{aboutUs.title}</h2>
        <ul className="flex flex-col gap-5  ">
          {aboutUs.paragraps.map((p, index) => (
            <li key={index}>
              <p>{p}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
