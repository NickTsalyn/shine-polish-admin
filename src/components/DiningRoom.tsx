import Image from "next/legacy/image";
import BasicBreadcrumbs from "./UI/Breadcrumbs";
import { DINING_ROOM_SERVICES } from "@/global/dining-room";
import IconPlus from "../../public/icons/Icon_plus-min.png";
import { DiningroomImage } from "@/global/images";
import { CustomTooltip, diningroomIcons } from "./UI/Tooltip";

export default function DiningRoomServices() {
  const { title, paragraph, processes, frequencies, needs } =
    DINING_ROOM_SERVICES;

  return (
    <div className="body text-text">
      <h1 className=" h3 text-main mb-3 md:mb-[18px] lg:mb-7">{title}</h1>

      <BasicBreadcrumbs
        pageHref="cleaning-process"
        pageName="Cleaning Process"
        roomName="Dining Room"
      />

      <div className="relative mb-5 md:mb-10 lg:mb-[60px]">
        <DiningroomImage />

        {diningroomIcons.map((icon, index) => (
          <CustomTooltip key={index} title={icon.title} placement="right-end">
            <div
              className="absolute z-20  flex items-center justify-center size-5 md:size-9 lg:size-14"
              style={{ top: icon.top, left: icon.left }}
            >
              <Image src={IconPlus} alt="icon plus" />
            </div>
          </CustomTooltip>
        ))}
      </div>

      <ul className="flex flex-col gap-1.5 mb-3 md:mb-[18px] lg:mb-7">
        {paragraph.map((p, index) => (
          <li key={index}>
            <p className="indent-1.5">{p}</p>
          </li>
        ))}
      </ul>

      <h2 className="text-main h4 mb-1 md:mb-2 lg:mb-4">{processes.title}</h2>
      <p className="mb-1">{processes.text}</p>
      <ol className="flex flex-col gap-1.5 list-decimal marker:font-semibold">
        {processes.items.map((item, index) => (
          <li key={index}>
            <h3 className="font-semibold mb-1">{item.title}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ol>

      <p className="mb-3 md:mb-[18px] lg:mb-7 indent-1.5">
        {processes.summary}
      </p>

      <h2 className="text-main h4 mb-1 md:mb-2 lg:mb-4">{frequencies.title}</h2>
      <p className="mb-1">{frequencies.text}</p>
      <ul className="flex flex-col gap-1.5">
        {frequencies.items.map((item, index) => (
          <li key={index}>
            <h3 className="font-semibold text-main mb-1">{item.title}</h3>
            <ol className="list-disc pl-6">
              {item.description.map((d, index) => (
                <li key={index}>
                  <p>{d}</p>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ul>
      <p className="mb-3 md:mb-[18px] lg:mb-7 indent-1.5">
        {frequencies.summary}
      </p>

      <h2 className="text-main h4 mb-1 md:mb-2 lg:mb-4">{needs.title}</h2>
      <p className="mb-1">{needs.text}</p>
      <ol className="flex flex-col gap-1.5 mb-3 md:mb-[18px] lg:mb-7 list-decimal marker:font-semibold">
        {needs.items.map((item, index) => (
          <li key={index}>
            <h3 className="font-semibold mb-1">{item.title}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ol>
      <p className="mb-3 md:mb-[18px] lg:mb-7 indent-1.5 font-semibold">
        {needs.summary}
      </p>
    </div>
  );
}
