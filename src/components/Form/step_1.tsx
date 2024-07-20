import Image from "next/image";
import BasicSelect from "../UI/Select";
import RadioButton from "../UI/RadioButton";
import dayjs from "dayjs";

import img_stub from "../../../public/images/service-area/image-map-stub.png";
import {
  areaOptions,
  bathroomOptions,
  bedroomOptions,
  frequencyOptions,
} from "@/data/booking-form/step_1";
import useFormStorage from "@/hooks/formStorage";

const Step1 = () => {
  const {
    form,
    handleInputChange,
    handleRadioChange
  } = useFormStorage({
    areas: "",
    bedroom: 1,
    bathroom: 1,
    frequency: "",
    homeAccess: "",
    aboutUs: "",
    specialInstructions: "",
    extras: [],
    services: "",
    selectedDate: dayjs().format("MM/DD/YYYY"),
    time: dayjs().format("h:mm A"),
    address: "",
  });

	return (
		<div className="py-4 md:py-6 lg:py-9 flex flex-col gap-6 md:gap-[26px] lg:grid lg:grid-flow-col lg:grid-cols-2 lg:gap-[66px] xl:gap-[80px]">
			<div className="md:flex md:flex-row md:justify-between lg:flex-col lg:gap-[33px] xl:gap-[30px] lg:col-span-2 lg:row-span-2">
				<div className="flex flex-col gap-4 md:gap-6">
					<h2 className=" text-2xl md:text-4xl font-medium">Choose area</h2>
					<BasicSelect
						name="areas"
						placeholder="Select an area*"
						value={form.areas as string}
						items={areaOptions}
						onChange={handleInputChange}
					/>
				</div>
				<div className="hidden md:block md:w-[338px] md:h-[330px] lg:w-[540px] lg:h-[454px] xl:w-[780px] xl:h-[450px] relative">
					<Image
						src={img_stub}
						alt="map"
						// width={338}
						layout="fill"
						objectFit="cover"
						objectPosition="center"
						priority
						className="w-full h-full"
					/>
				</div>
			</div>
			<div className="flex flex-col gap-4 md:gap-6 lg:col-span-1">
				<h2 className="text-2xl md:text-4xl font-medium">How many rooms?</h2>
				<div className="flex flex-col gap-3 md:gap-6">
					<BasicSelect
						name="bedroom"
						value={form.bedroom as number}
						items={bedroomOptions}
						onChange={handleInputChange}
					/>
					<BasicSelect
						name="bathroom"
						value={form.bathroom as number}
						items={bathroomOptions}
						onChange={handleInputChange}
					/>
				</div>
			</div>
			<div className="flex flex-col gap-4 md:gap-6 lg:col-span-1 mt-auto">
				<h2 className="text-2xl md:text-4xl font-medium">How often?</h2>
				<p className="hidden md:block text-base lg:text-[26px] lg:font-medium text-bookingSubText">
					Scheduling is flexible. Cancel or reschedule anytime.
				</p>
				<ul className="flex flex-wrap justify-center gap-5 lg:gap-6 lg:w-[562px]  md:justify-around md:flex-nowrap lg:flex-wrap">
					{frequencyOptions.map(({ value, label }) => {
						return (
							<li key={value} className="flex justify-center items-center w-[132px] md:min-w-[160px] lg:min-w-[260px]">
								<RadioButton
									value={value}
									style=" py-[10px] px-[20px] md:py-[8px] md:px-[10px] lg:py-[20px] h-full w-full text-main"
									isActive={value === form.frequency}
									onClick={() => handleRadioChange("frequency", value)}
								>
									<span className="inline-block lg:text-2xl">{label}</span>
								</RadioButton>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default Step1;
