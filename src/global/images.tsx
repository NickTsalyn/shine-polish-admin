import Image from "next/image";

export const KitchenImage = () => {
  return (
    <Image
      src="/public/images/pexels-curtis-adams@2x.jpg"
      alt="Kitchen"
      width={1556}
      height={896}
      sizes="(max-width:378px) 279px, (width: 768px) 720px, (width: 1440px) 1076px; (width:1920px) 1556px;"
      // fill
      className="rounted-xl"
    />
  );
};

export const RoomImage = () => {
  return (
    <Image
      src="/images/living-room/living-room1.jpg"
      alt="photo of living room"
      sizes="(max-width: 375px) 278px, (max-width: 768px) 716px, (max-width: 1440px) 1076px"
      width={1556}
      height={100}
      // fill
      // style={{
      //   width: "100%",
      //   height: "auto",
      //   objectFit: "cover",
      //   objectPosition: "center",
      // }}
    />
  );
};

export const BathroomImage = () => {
  return (
    <>
      <Image
        src="/images/bathroom@2x.jpg"
        alt="photo of living room"
        width={278}
        height={159}
        // fill
      />
    </>
  );
};

export const BedroomImage = () => {
  return (
    <>
      <Image
        src="/images/bedroom/bedroom@2x.webp"
        alt="photo of bedroom"
        width={280}
        height={160}
        sizes="100vw"
        style={{
          width: "100%",
          height: "auto",
        }}
      />
    </>
  );
};

export const DiningroomImage = () => {
  return (
    <>
      <Image
        src="/images/diningroom@2x.jpg"
        alt="photo of dining room"
        width={278}
        height={159}
        // fill
        // sizes="100vw"
      />
    </>
  );
};

export const BackgroundImg = () => {
  return (
    <Image
      src="/images/last_section_photomin.jpg"
      alt="photo of happy family in the clean house"
      sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, 1440px, 1920px"
      // fill
      width={1440}
      height={738}
    />
  );
};

export const FriendsIcon: React.FC = () => {
  return (
    <Image
      src="/images/friends_sitting_by_the_window_and_talking-min.png"
      alt="happy friends tolking about something when their house is being cleaned by tye cleaning company Shine and Polish "
      width={667}
      height={900}
      // fill
      sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, 1200px"
    />
  );
};
export const FooterLogo = () => {
  return (
    <>
      <Image
        src="/icons/logo/logo_dark_bg.svg"
        height={28}
        width={30}
        alt="logo"
      ></Image>
    </>
  );
};

// export const FooterImg = () => {
//   return (
//     <div className="">
//       <Image
//         src="/images/atlantaSkylineSecondarySmall.png"
//         height={100}
//         width={1440}
//         layout="responsive"
//         objectFit="cover"
//         objectPosition="center"
//         alt="Footer Image"
//       ></Image>
//     </div>
//   );
// };

export const FooterImg = () => {
  return (
    <div className="z-[-1] absolute  bottom-0  opacity-60 w-full h-full ">
      <Image
        src="/images/atlantaSkylineSecondarySmall.png"
        // height={400}
        // width={1156}
        fill
        alt="Footer Image"
      ></Image>
    </div>
  );
};

export const CrossroadImage = () => {
  return (
    <>
      <Image
        src="/images/crossroad.png"
        alt="picture of road and buildings"
        width={400}
        height={300}
        // fill
      />
    </>
  );
};

export const DateTimeImage = () => {
  return (
    <>
      <Image
        src="/images/planning-with-days-marked-on-calendar.png"
        alt="picture calendar and clock"
        width={400}
        height={300}
      />
    </>
  );
};

export const DateIcon = () => {
  return (
    <>
      <Image src="/icons/date.svg" alt="date icon" width={48} height={48} />
    </>
  );
};

export const TimeIcon = () => {
  return (
    <>
      <Image src="/icons/time.svg" alt="time icon" width={48} height={48} />
    </>
  );
};
// export const DatePikerCustomIcon = () => {
//   return (
//     <>
//       <Image
//         src="/images/date-picker.svg"
//         alt="date picker icon"
//         width={24}
//         height={24}
//
//       />
//     </>
//   );
// };
export const ChecklistImg = () => {
  return (
    // <div className="z-[-1] relative  w-full h-full ">
    <Image
      className=" object-cover inset-0 "
      src="/images/checklist_icon.png"
      alt="Tell about us"
      objectFit="cover"
      layout="fill"
    ></Image>
    // </div>
  );
};
