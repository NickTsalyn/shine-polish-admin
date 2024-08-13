import { Box, SelectChangeEvent } from "@mui/material";
import CloseButton from "../UI/CloseButton";
import BasicSelect from "../UI/Select";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { bathroomOptions, bedroomOptions } from "@/data/bookingOptions";
import MultipleSelectCheckmarks from "../UI/CheckedSelect";
import Button from "../UI/Button";

type Props = {
	onChange?: (event: SelectChangeEvent<string | number>) => void;
	onClose: () => void;
};

type Form = {
	area: string;
	bedroom: string;
	bathroom: string;
	frequency: string;
	service: string;
	extra: string[];
  };

export default function AddBookingForm({ onClose }: Props) {
	const [data, setData] = useState<{
		areaOptions: { name: string; value: number | string }[];
		discountOptions: { name: string; value: number }[];
		serviceOptions: { name: string; value: number }[];
		extrasOptions: { name: string; value: number }[];
	} | null>(null);
	const [form, setForm] = useState<Form>({
		area: "",
		bedroom: "",
		bathroom: "",
		frequency: "",
		service: "",
		extra: []
	  });
    const [result, setResult] = useState<{area: string; bedroom: string; bathroom: string; frequency: string; service: string; extra?: string[]} | null>(null);


	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("https://shine-polish-server.onrender.com/bookings/options");
				setData(response.data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);

	const areas =
		data?.areaOptions.map((area) => {
			return {
				value: area.name,
				label: area.name,
			};
		}) || [];

	const frequencyOptions =
		data?.discountOptions.map((item) => {
			return {
				value: item.name,
				label: item.name,
			};
		}) || [];

	const services =
		data?.serviceOptions.map((service) => {
			return {
				value: service.name,
				label: service.name,
			};
		}) || [];

	const extras =
		data?.extrasOptions.map((extra) => {
			return {
				value: extra.name,
				name: extra.name,
			};
		}) || [];

        useEffect(() => {
            if (result) {
                console.log(result);
            }
        }, [result]);

	const handleChange = (event: SelectChangeEvent<string | number>) => {
        const value = event.target.value as string;
		switch (event.target.name) {
			case "areas":
				setForm({ ...form, area: value });
				break;
			case "bedroom":
				setForm({ ...form, bedroom: value });
				break;
			case "bathroom":
				setForm({ ...form, bathroom: value });
				break;
			case "frequency":
				setForm({ ...form, frequency: value });
				break;
			case "service":
				setForm({ ...form, service: value });
				break;
			default:
				break;
		}
	};

	const handleCheckChange = (event: SelectChangeEvent<string[]>) => {
		const value = event.target.value as string[];
		setForm({ ...form, extra: value });
	};

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setResult(form)
        alert("Booking submitted successfully");
    };



	return (
		<div className="w-[400px] h-[600px] bg-white rounded-xl flex flex-col gap-8">
			<h2 className="text-accent text-4xl">Add Booking</h2>
			<form
				className="flex flex-col gap-8 items-center text-sand"
				onSubmit={handleSubmit}
			>
				<div className='flex flex-col gap-3'>
					<BasicSelect name="areas" placeholder="Select an area*" value={form.area} items={areas} onChange={handleChange} />
					<BasicSelect name="bedroom" placeholder="Select number of bedrooms*" value={form.bedroom} items={bedroomOptions} onChange={handleChange} />
					<BasicSelect name="bathroom" placeholder="Select number of bathrooms*" value={form.bathroom} items={bathroomOptions} onChange={handleChange} />
					<BasicSelect name="frequency" placeholder="Select booking frequency*" value={form.frequency} items={frequencyOptions} onChange={handleChange} />
					<BasicSelect name="service" placeholder="Select booking service*" value={form.service} items={services} onChange={handleChange} />
					<MultipleSelectCheckmarks
						name="extras"
						placeholder="Select extras*"
						value={form.extra || []}
						items={extras}
						onChange={handleCheckChange}
					/>
				</div>
                <Button type="submit" style="confirm">Submit</Button>
			</form>
				<CloseButton type="button" onClick={onClose} />
		</div>
	);
}
