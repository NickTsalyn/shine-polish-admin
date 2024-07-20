"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import minus from "../../public/icons/logo/minus.svg";
import plus from "../../public/icons/logo/plus.svg";

import img from "../../public/images/young_it_specialist_with_a_laptop-min.png";
import getPrice from "../../formula";
import { useRouter } from "next/navigation";

const rooms = [
	{ id: 1, name: "bedrooms" },
	{ id: 2, name: "bathrooms" },
];

type Props = {};

type RoomCount = {
	[key: number]: number;
};

const SectionEstimate = (props: Props) => {
	const [total, setTotal] = useState(0);
	const router = useRouter();

	const [roomType, setRoomType] = useState<RoomCount>({
		1: 1,
		2: 1,
	});

	const handleIncrement = (id: number) => {
		if (roomType[id] < 9)
			setRoomType({
				...roomType,
				[id]: roomType[id] + 1,
			});
	};

	const handleDecrement = (id: number) => {
		if (roomType[id] > 1) {
			setRoomType({
				...roomType,
				[id]: roomType[id] - 1,
			});
		}
	};

	useEffect(() => {
		const calculateTotal = () => {
			const bedrooms = roomType[1];
			const bathrooms = roomType[2];

      const totalPrice = Number((getPrice(bedrooms, bathrooms) * 1.06))
			setTotal(totalPrice);
		};
		calculateTotal();
	}, [roomType]);

	return (
		<section className=" mb-[60px] md:mb-20 lg:mb-[120px] xl:mb-40">
			<div className=" container mx-auto my-0">
				<h2 className=" text-[30px] font-medium leading-[1.33] text-main text-center md:text-5xl mb-4 md:mb-11">
					Estimate Calculation
				</h2>
				<div className="flex flex-col gap-6 justify-evenly items-center md:flex-row">
					<div className=" flex flex-col gap-6 md:gap-10 lg:gap-12">
						<ul className="flex flex-col gap-6 md:gap-12">
							{rooms.map((room) => (
								<li key={room.id} className="flex flex-row justify-around">
									<p className=" font-normal text-base text-main flex justify-center items-center md:text-4xl md:leading-normal md:font-light">
										{room.name}:
									</p>
									<div className="flex gap-7 items-center justify-center leading-normal">
										<button onClick={() => handleDecrement(room.id)}>
											<Image src={minus} alt="minus icon" className=" w-7 h-6 md:w-[42px] md:h-[42px]" />
										</button>
										<span className=" font-medium text-base text-main md:text-4xl">{roomType[room.id]}</span>
										<button onClick={() => handleIncrement(room.id)}>
											<Image src={plus} alt="plus icon" className=" w-7 h-6 md:w-[42px] md:h-[42px]" />
										</button>
									</div>
								</li>
							))}
						</ul>
						<div className="flex flex-row justify-between items-center gap-5">
							<p className=" text-sand font-bold text-2xl md:font-normal md:text-[32px] lg:font-normal lg:text-5xl">
								Previous estimate:
							</p>
							<span className="font-bold text-2xl text-main md:font-normal md:text-[40px] lg:font-normal lg:text-5xl">
								{total.toFixed(2)} $
							</span>
						</div>
					</div>
					<div className="">
						<button
							onClick={() => router.push("/booking")}
							className=" relative pl-8  md:pl-5 lg:pl-[52px] w-[333px] h-[216px] rounded-xl bg-sand/25 flex items-center md:w-[226px] md:h-[243px] lg:w-[484px] lg:h-[338px]"
						>
							<span className="font-bold text-[44px] text-center text-accent md:text-[32px] lg:text-[64px] w-[220px] md:w-[138px] lg:w-[276px]">
								Full estimate
							</span>
							<div className="md:w-[180px] md:h-[300px] lg:w-[186px] lg:h-[400px] ">
								<Image
									src={img}
									alt="Yung cleaning service specialist with laptop"
									width={150}
									height={233}
									className="absolute right-0 bottom-0 md:h-[300px] lg:h-[450px] lg:w-[240px]"
								/>
							</div>
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SectionEstimate;
