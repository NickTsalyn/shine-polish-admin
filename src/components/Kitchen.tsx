import Image from "next/image";
import IconPlus from "../../public/icons/Icon_plus-min.png";
import { KITCHEN_SERVICES } from "@/global/kitchen";
import BasicBreadcrumbs from "./UI/Breadcrumbs";
import { CustomTooltip, kitchenIcons } from "./UI/Tooltip";
import { KitchenImage } from "@/global/images";

const KitchenServices: React.FC = () => {
  const { title, paragraph, processes, frequencies, needs } = KITCHEN_SERVICES;
  return (
    <div>
      <h1 className="h3 text-main mb-3 md:mb-[18px] lg:mb-7">{title}</h1>
      <BasicBreadcrumbs
        pageHref="cleaning-processes"
        pageName="Cleaning Process"
        roomName="Kitchen"
      />
      <div className="relative mb-5 md:mb-10 lg:mb-[60px]">
        <KitchenImage />
        {kitchenIcons.map((icon, index) => (
          <CustomTooltip key={index} title={icon.title} placement="right-end">
            <div
              key={index}
              style={{ top: icon.top, left: icon.left }}
              className="absolute z-20  flex items-center justify-center size-5 md:size-9 lg:size-14"
            >
              <Image src={IconPlus} alt="icon with plus" />
            </div>
          </CustomTooltip>
        ))}
      </div>
      <ul className="flex flex-col gap-1.5 mb-3 md:mb-[18px] lg:mb-7">
        {paragraph.map((p, index) => (
          <li key={index}>
            <p className="body">{p}</p>
          </li>
        ))}
      </ul>
      <h2 className="text-main h4 mb-1 md:mb-2 lg:mb-4">{processes.title}</h2>
      <p className="mb-1 body">{processes.text}</p>
      <ol className="flex flex-col gap-1.5 list-decimal pl-6 marker:font-semibold body">
        {processes.items.map((item, index) => (
          <li key={index}>
            <h3 className="font-semibold mb-1">{item.title}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ol>
      <p className="mb-3 md:mb-[18px] lg:mb-7 body">{processes.summary}</p>

      <h2 className="text-main h4 mb-1 md:mb-2 lg:mb-4">{frequencies.title}</h2>
      <p className="mb-1 body">{frequencies.text}</p>
      <ul className="flex flex-col gap-1.5 body">
        {frequencies.items.map((item, index) => (
          <li key={index}>
            <h3 className="font-semibold text-main mb-1">{item.title}</h3>
            <ol className="list-disc pl-6 body">
              {item.description.map((d, index) => (
                <li key={index}>
                  <p className="body">{d}</p>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ul>
      <p className="body mb-3 md:mb-[18px] lg:mb-7 ">{frequencies.summary}</p>

      <h2 className="text-main h4 mb-1 md:mb-2 lg:mb-4">{needs.title}</h2>
      <p className="body mb-1">{needs.text}</p>
      <ol className="flex flex-col gap-1.5 mb-3 md:mb-[18px] lg:mb-7 list-decimal pl-6 marker:font-semibold body">
        {needs.items.map((item, index) => (
          <li key={index}>
            <h3 className="font-semibold mb-1">{item.title}</h3>
            <p className="body">{item.description}</p>
          </li>
        ))}
      </ol>
      <p className="body mb-3 md:mb-[18px] lg:mb-7 font-semibold">
        {needs.summary}
      </p>
    </div>
  );
};

export default KitchenServices;
