import { DEEP_CLEANING } from "@/global/deep-cleaning";
import BasicBreadcrumbs from "./UI/Breadcrumbs";

export default function DeepCleaning() {
  const { title, paragraphs, services, homeNeeds, yourArea } = DEEP_CLEANING;
  return (
    <div className=" body text-text  flex flex-col justify-start items-start ">
      <h1 className=" subtitle-booking md:text-5xl lg:text-6xl md:leading-6 text-main max-w-64 md:max-w-[682px] lg:max-w-[920px] text-start mb-5 md:mb-10 lg:mb-7 ">
        {title}
      </h1>
      <div className=" mb-2 md:mb-5 lg:mb-0">
        <BasicBreadcrumbs roomName="Deep Cleaning" />
      </div>
      <div>
        <ul className="flex flex-col gap-5 lg:gap-8 mb-5 lg:mb-8">
          {paragraphs.map((p, index) => (
            <li key={index}>
              <p>{p}</p>
            </li>
          ))}
        </ul>
        <h2 className=" text-xl md:text-3xl text-main ">{services.title}</h2>
        <p className=" mb-5 md:mb-8">
          {services.paragraphFirst}{" "}
          <span className=" font-bold">{services.paragraphAccent}</span>{" "}
          {services.paragraphSecond}
        </p>
        <h3 className="text-main lg:text-text lg:font-bold">
          {services.subtitleFirst}
        </h3>
        <ul className=" list-disc pl-5">
          {services.firstList.map((p, index) => (
            <li key={index}>{p}</li>
          ))}
        </ul>
        <p className=" mb-5 md:mb-8">{services.firstParagraph}</p>
        <h3 className="text-main  lg:text-text lg:font-bold">
          {services.subtitleSecond}
        </h3>
        <ul className=" list-disc pl-5 mb-5 md:mb-8">
          {services.listSecont.map((p, index) => (
            <li key={index}>{p}</li>
          ))}
        </ul>
        <h3 className="text-main  lg:text-text lg:font-bold">
          {services.subtitleThird}
        </h3>
        <p className=" mb-5 md:mb-8">{services.thirdParagraph}</p>
        <h3 className="text-main  lg:text-text lg:font-bold">
          {services.subtitleFourth}
        </h3>
        <ul className=" list-disc pl-5">
          {services.fourthList.map((p, index) => (
            <li key={index}>{p}</li>
          ))}
        </ul>
        <p className=" mb-5 md:mb-8">{services.fourthParagraph}</p>
        <h3 className="text-main  lg:text-text lg:font-bold">
          {services.subtitleFifth}
        </h3>
        <p className=" mb-5 md:mb-8">{services.fifthParagraph}</p>
        <h2 className=" text-xl md:text-3xl text-main ">{homeNeeds.title}</h2>
        <p className=" mb-5 md:mb-8">{homeNeeds.paragraph}</p>
        <h3 className="text-main  lg:text-text lg:font-bold">
          {homeNeeds.subtitle}
        </h3>
        <ul className="flex flex-col gap-5 lg:gap-8 mb-5 lg:mb-8">
          {homeNeeds.paragraphs.map((p, index) => (
            <li key={index}>{p}</li>
          ))}
        </ul>
        <h3 className="text-main  lg:text-text lg:font-bold">
          {homeNeeds.subtitleFirst}
        </h3>
        <p className=" mb-5 md:mb-8">{homeNeeds.firstParagraph}</p>
        <h3 className="text-main  lg:text-text lg:font-bold">
          {homeNeeds.subtitleSecond}
        </h3>
        <ul className="flex flex-col gap-5 lg:gap-8 mb-5 lg:mb-8">
          {homeNeeds.secondParagraphs.map((p, index) => (
            <li key={index}>{p}</li>
          ))}
        </ul>
        <h3 className="text-main  lg:text-text lg:font-bold">
          {homeNeeds.subtitleThird}
        </h3>
        <p className=" mb-5 md:mb-8">{homeNeeds.thirdParagraph}</p>
        <h3 className="text-main  lg:text-text lg:font-bold">
          {homeNeeds.subtitleFourth}
        </h3>
        <p className=" mb-5 md:mb-8">{homeNeeds.fourthParagraph}</p>
        <h3 className="text-main  lg:text-text lg:font-bold">
          {homeNeeds.subtitleFifth}
        </h3>
        <p className=" mb-5 md:mb-8">{homeNeeds.fifthParagraph}</p>
        <h2 className=" text-xl md:text-3xl text-main ">{yourArea.title}</h2>
        <p className=" mb-5 md:mb-8">{yourArea.paragraphs}</p>
      </div>
    </div>
  );
}
