const base = 100;
const coff = 0.25;
const bathPrice = 30;

export const discount = [
	{ name: "One-time service", value: 1 },
	{ name: "Every week", value: 0.8 },
	{ name: "Every 2 weeks", value: 0.85 },
	{ name: "Every 4 weeks", value: 0.9 },
];

export const area = [
	{ name: "Midtown", value: 1 },
	{ name: "Buckhead", value: 1 },
	{ name: "Sandy Springs", value: 1 },
	{ name: "Smyrna", value: 1.15 },
	{ name: "Dunwoody", value: 1.15 },
	{ name: "Roswell", value: 1.15 },
	{ name: "Decatur", value: 1.15 },
	{ name: "Alpharetta", value: 1.25 },
	{ name: "Johns Creek", value: 1.25 },
	{ name: "Marietta", value: 1.25 },
	{ name: "Downtown", value: 1.25 },
];

// export const ServicesOptions = [
// 	{ value: "Basic Cleaning", label: "Basic Cleaning" },
// 	{ value: "Deep Cleaning", label: "Deep Cleaning" },
// 	{ value: "Move In/Move Out", label: "Move In/Move Out" },
// 	{ value: "Post Constraction", label: "Post Constraction" },
// ];

export const serviceOption = [
	{ name: "Basic Cleaning", value: 1 },
	{ name: "Deep Cleaning", value: 3 },
	{ name: "Move In/Move Out", value: 2 },
	{ name: "Post Constraction", value: 2.5 },
]

export const extrasOption = [
	{name: "Organizing", value: 30},
	{name: "Load of Laundry", value: 30},
	{name: "Inside Fridge", value: 50},
	{name: "Inside Oven", value: 50},
	{name: "Inside Windows", value: 150},
	{name: "Unload dishwasher", value: 15},
	{name: "Blinds", value: 15},
	{name: "Ironing", value: 30},
	{name: "Walls", value: 40},
	{name: "Basement", value: 50},
]
export const getPrice = (
	bedrooms: number,
	bathrooms: number,
	selectedArea?: string | number,
	discountType?: string | number,
	selectedService?: string | number,
	selectedExtras?: string[]
) => {

	const areaCoefficient = area.find((area) => area.name === selectedArea)?.value || 1;
	const discountValue = discount.find((discount) => discount.name === discountType)?.value || 1;
	const cleaningValue = serviceOption.find((service) => service.name === selectedService)?.value || 1;
	const extraValue = extrasOption.reduce((acc, item) => {
		if (selectedExtras?.includes(item.name)) {
			return acc + item.value
		} else {
			return acc
		}
	}, 0)

	if (bedrooms === 1 && bathrooms === 1) {
		return base 
	}

	const basePrice = base * (1.1 + ((bedrooms) - 2) * coff) + (bathrooms) * bathPrice;
	const finalPrice = basePrice * areaCoefficient * discountValue * cleaningValue + extraValue
	return finalPrice;
};

export default getPrice;