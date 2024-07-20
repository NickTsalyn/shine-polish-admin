import BasicBreadcrumbs from "../UI/Breadcrumbs";
import { AboutUs } from "./AboutUs";

const cards = [
  {
    h2: "Regular Clean",
    p: "For those who HAVE used professional cleaning service or cleaned yourself within the last 45 days. The regular clean is perfect for maintaining a healthy home environment.",
  },

  {
    h2: "Kitchen and Eating Area",
    li: [
      "Clean appliance surfaces (fridge, oven and dishwasher)",
      "Load dishwasher",
      "Clean outside/inside of microwave",
      "Clean and disinfect countertops",
      "Clean and polish sinks and faucets",
      "General dusting",
      "Sweep/vacuum floor",
      "Damp mop hard floor",
      "Empty trash",
    ],
  },
  {
    h2: "Bedrooms and Living Areas",
    p: "Clean sliding glass door",
    li: [
      "Clean all horizontal surfaces (tables, stands, dressers, etc)",
      "General dusting",
      "Make beds and tidy pillows (change linens if left out)",
      "Clean mirrors",
      "Remove trash",
      "Vacuum floors and stairs",
      "Damp mop hard floors and stairs",
    ],
  },
  {
    h2: "Bathrooms",
    li: [
      "Clean and disinfect tubs and showers",
      "Clean shower doors and tracks",
      "Clean and disinfect towel bars",
      "Clean mirrors",
      "Clean and disinfect countertops, sinks and faucets",
      "Clean and disinfect toilets",
      "General dusting",
      "Empty trash",
      "Sweep/vacuum floor",
      "Damp mop hard floors",
    ],
  },
  {
    h2: "Move In/Move Out",
    p: "For those who are moving in or out - property must be empty! Includes all items from deep cleaning plus the following:",
    li: [
      "Inside fridge",
      "Inside oven",
      "Inside cabinets/drawers",
      "Sweep garage",
    ],
    warning: "Does not include inside windows*",
  },
  {
    h2: "Post construction",
    p: "For those who are moving in or out - property must be empty! Includes all items from deep cleaning plus the following:",
    li: [
      "Inside fridge",
      "Inside oven",
      "Inside cabinets/drawers",
      "Sweep garage",
    ],
    warning: "Does not include inside windows*",
  },
  {
    h2: "Deep Clean",
    p: "For those who HAVE used professional cleaning service or cleaned yourself within the last 45 days. The regular clean is perfect for maintaining a healthy home environment. For those who want their home cleaned from top to bottom. Best for first time customers, customers who HAVE NOT had a professional clean or cleaned themselves in the last 45 days. This allows us more time to be detailed, thorough and be sure to remove all the extra dirt and debris.",
    li: [
      {
        h3: "All items from the Kitchen and Eating Areas Regular Clean list plus the following:",
        list: [
          "Clean outside of cabinets",
          "Clean baseboards",
          "Clean individual items/decorations",
          "Clean doors and door frames",
        ],
      },
      {
        h3: "All items from the Bathrooms Regular Clean list plus the following:",
        list: [
          "Remove hard water stains from shower doors",
          "Remove heavy stains from tubs and showers",
          "Clean outside cabinets",
          "Clean baseboards",
          "Detail clean individual items/decorations",
          "Clean doors and door frames",
        ],
      },
      {
        h3: "All items from the Bedrooms and Living Areas Regular Clean list plus the following:",
        list: [
          "Clean ceiling fans",
          "Clean window sills and blinds",
          "Clean sliding glass door tracks",
          "Clean doors and door frames",
          "Vacuum/dust mop under beds and accessible furniture within reach/reason",
          "Clean baseboards",
        ],
      },
    ],
  },
  {
    h2: `What We Don't Do`,
    li: [
      "Clean bio-hazardous substances (feces, blood, etc)",
      "Organization and decluttering, we are there to clean/disinfect",
      "Outside window cleaning",
      "Lifting or moving heavy furniture",
      "Carpet/steam cleaning (but we can refer you to a partnered company)",
      "Clean areas that are out of reach with a 2-step ladder/stool",
      "Service clients who are disrespectful to our cleaners",
    ],
  },
];

export const Checklist = () => {
  return (
    <section>
      <div className="container center">
        <div className="p-5">
          <h1 className="h3 text-main mb-3 md:mb-[18px] lg:mb-7">Checklists</h1>
          <BasicBreadcrumbs roomName="Checklist" />
        </div>
        <div className="grid grid-cols-1  lg:grid-cols-2 auto-rows-auto gap-[60px]">
          <ul className="grid grid-cols-1 auto-rows-auto gap-[60px]">
            {cards.map((card, index) => {
              if (index <= 5) {
                return (
                  <li
                    key={index}
                    // className=" max-w-[275px] md:max-w-[686px] lg:max-w-[546px] xl:max-w-[760px] shadow-main-shadow"
                    className="shadow-main-shadow w-full lg:max-w-[546px] xl:max-w-[760px] p-5 rounded-xl"
                  >
                    <div>
                      <h2 className="text-[18px] md:text-[24px] font-normal leading-[21.6px] md:leading-[28.8px] text-accent mb-[16px] md:mb-[20px] lg:mb-[24px] xl:mb-[32px] ">
                        {card.h2}
                      </h2>
                      {card.p && (
                        <p className="text-[16px] md:text-[20px] leading-[20px] md:leading-[24px] text-text">
                          {card.p}
                        </p>
                      )}
                      {card.li && (
                        <ul className="pl-5">
                          {card.li.map((list, index) => {
                            if (typeof list === "string") {
                              return (
                                <li key={index} className="list-disc ">
                                  <p className="text-text text-[16px] md:text-[20px] leading-[20px] md:leading-[24px]">
                                    {list}
                                  </p>
                                </li>
                              );
                            }
                            if (
                              typeof list === "object" &&
                              list.h3 &&
                              list.list
                            ) {
                              return (
                                <li key={index}>
                                  <h3 className="text-text text-[16px] md:text-[20px] leading-[20px] md:leading-[24px] font-bold mt-[16px]">
                                    {list.h3}
                                  </h3>
                                  <ul>
                                    {list.list.map((sublist, subIndex) => (
                                      <li key={subIndex} className="">
                                        <p className="text-text text-[16px] md:text-[20px] leading-[20px] md:leading-[24px] list-disc list-inside">
                                          {sublist}
                                        </p>
                                      </li>
                                    ))}
                                  </ul>
                                </li>
                              );
                            }
                          })}
                        </ul>
                      )}
                      {card.warning && (
                        <p className="text-accent mt-[20px]"><strong >{card.warning}</strong></p>
                       
                      )}
                    </div>
                  </li>
                );
              }
            })}
          </ul>
          <ul className="grid grid-cols-1  gap-[60px]">
            {cards.map((card, index) => {
              if (index > 5) {
                return (
                  <li
                    key={index}
                    className="shadow-main-shadow w-full lg:max-w-[546px] xl:max-w-[760px]  p-5 rounded-xl"
                  >
                    <div>
                      <h2 className="text-[18px] md:text-[24px] font-normal leading-[21.6px] md:leading-[28.8px] text-accent mb-[16px] md:mb-[20px] lg:mb-[24px] xl:mb-[32px] ">
                        {card.h2}
                      </h2>
                      {card.p && (
                        <p className="text-[16px] md:text-[20px] leading-[20px] md:leading-[24px] text-text">
                          {card.p}
                        </p>
                      )}
                      {card.li && (
                        <ul className="pl-5">
                          {card.li.map((list, index) => {
                            if (typeof list === "string") {
                              return (
                                <li
                                  key={index}
                                  className="list-disc row-span-1"
                                >
                                  <p className="text-text text-[16px] md:text-[20px] leading-[20px] md:leading-[24px]">
                                    {list}
                                  </p>
                                </li>
                              );
                            }
                            if (
                              typeof list === "object" &&
                              list.h3 &&
                              list.list
                            ) {
                              return (
                                <li key={index} className="row-span-2">
                                  <h3 className="text-text text-[16px] md:text-[20px] leading-[20px] md:leading-[24px] font-bold mt-[16px]">
                                    {list.h3}
                                  </h3>
                                  <ul>
                                    {list.list.map((sublist, subIndex) => (
                                      <li
                                        key={subIndex}
                                        className=" list-disc "
                                      >
                                        <p className="text-text text-[16px] md:text-[20px] leading-[20px] md:leading-[24px] list-disc ">
                                          {sublist}
                                        </p>
                                      </li>
                                    ))}
                                  </ul>
                                </li>
                              );
                            }
                          })}
                        </ul>
                      )}
                      {card.warning && (
                        <strong className="text-accent mt-[16px]">{card.warning}</strong>
                      )}
                    </div>
                  </li>
                );
              }
            })}
            <li className="row-span-2  min-h-[200px] md:min-h-[304px] lg:min-h-[625px] xl:min-h-[646px] w-full lg:max-w-[546px] xl:max-w-[760px] shadow-main-shadow p-5 ">
              <AboutUs />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Checklist;
