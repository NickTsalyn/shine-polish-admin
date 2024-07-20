import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Autocomplete from "react-google-autocomplete";
import Input from "../components/UI/Input";
import useFormStorage from "@/hooks/formStorage";
import { useForm } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
// const API_KEY = "AIzaSyCjw4zjS8V3L0IwDnqWwWz5bXh6w9b4Hc8";

type FormValues = {
	address: {};
	aptSuite: string;
	city: string;
	zipCode: string;
	selectedDate: string;
	time: string;
};

interface AddressFormProps {
	address: any;
}

const AddressForm: React.FC<AddressFormProps> = ({ address }) => {
	const { form, handleCustomChange, handleInputChange } = useFormStorage(
		JSON.parse(localStorage.getItem("form") || "{}") || {
			areas: "",
			bedroom: 1,
			bathroom: 1,
			address: "",
			frequency: "",
			homeAccess: "",
			aboutUs: "",
			specialInstructions: "",
			extras: [],
			services: "",
			selectedDate: dayjs().format("MM/DD/YYYY"),
			time: dayjs().format("h:mm A"),
		}
	);

	const formData = useForm<FormValues>();
	const [inputValue, setInputValue] = useState("");
	const [addressDetails, setAddressDetails] = useState({
		street: form.address?.street || "",
		city: form.address?.city || "",
		state: form.address?.state || "",
		zip: form.address?.zip || "",
    aptSuite: form.address?.aptSuite || ""
	});

	const {
		register,
		formState: { errors },
	} = formData;

	const prevAddressDetails = useRef(addressDetails);

	useEffect(() => {
		if (prevAddressDetails.current !== addressDetails) {
			handleCustomChange("address", addressDetails);
			prevAddressDetails.current = addressDetails;
		}
	}, [addressDetails, handleCustomChange]);

	const handlePlaceSelected = (place: google.maps.places.PlaceResult) => {
		if (!place || !place.address_components) {
			return;
		}

		const addressComponents = place.address_components;
		let streetNumber = "";
		let streetName = "";
		let city = "";
		let state = "";
		let zip = "";
    let aptSuite = "";

		const fullAddress = place.formatted_address;

		addressComponents.forEach((component) => {
			const types = component.types;
			if (types.includes("street_number")) {
				streetNumber = component.long_name;
			}
			if (types.includes("route")) {
				streetName = component.long_name;
			}
			if (types.includes("locality")) {
				city = component.long_name;
			}
			if (types.includes("administrative_area_level_1")) {
				state = component.short_name;
			}
			if (types.includes("postal_code")) {
				zip = component.long_name;
			}
		});
		const street = `${streetNumber} ${streetName}`.trim();
		setAddressDetails((prevAddressDetails) => ({
			...prevAddressDetails,
			street,
			city,
			state,
			zip,
      aptSuite: "" // reset aptSuite
		}));
		setInputValue(fullAddress ?? "");
	};

	const handleAutoCompleteChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const inputStyles =
		"block mx-full mb-[10px] w-full hx-full h-full py-[8px] lg:py-[12px] px-[8px] lg:px-[16px] bg-transparent text-text border-solid border-2 focus:border-[3px] border-secondary rounded-[12px] focus:shadow-input-shadow outline-none xl:placeholder:text-[16px] placeholder:text-secondary-placeholder placeholder-opacity-50";

	return (
		<div className="w-full">
			<div className="flex flex-col gap-5">
				<div className="flex gap-5 flex-col lg:flex-row min-w-[280px]">
					<div className="md:w-full lg:w-1/2 md:h-[48px]">
						<Autocomplete
							apiKey={API_KEY}
							onPlaceSelected={handlePlaceSelected}
							options={{
								types: ["address"],
								componentRestrictions: { country: "us" },
							}}
							className={inputStyles}
							placeholder="Address*"
							value={inputValue || addressDetails.street}
							onChange={handleAutoCompleteChange}
							name="street"
						/>
					</div>
					<div className="md:w-full lg:w-1/2 md:h-[48px]">
						<Input
							type="text"
							style="form-input"
							placeholder="Apt/Suite#"
              onChange={(e) => setAddressDetails((prevAddressDetails) => ({ ...prevAddressDetails, aptSuite: e.target.value }))}
              value={addressDetails.aptSuite}
							name="aptSuite"
						/>
						{/* {errors.aptSuite && (
							<p className="error" role="alert">
								{errors.aptSuite.message}
							</p>
						)} */}
					</div>
				</div>
				<div className="flex gap-5 flex-col md:flex-row">
					<div className="md:w-3/4 md:h-[48px] gap-5">
						<Input
							type="text"
							style="form-input"
							placeholder="City*"
							onChange={handleInputChange}
							value={addressDetails.city}
							name="city"
						/>
					</div>
					<div className="md:w-full md:h-[48px] gap-5">
						<Input
							type="text"
							style="form-input"
							placeholder="State*"
							onChange={handleInputChange}
							value={addressDetails.state}
							name="state"
						/>
					</div>
					<div className="md:w-1/4 md:h-[48px]">
						<Input
							type="text"
							style="form-input"
							placeholder="Zip Code*"
							value={addressDetails.zip}
							onChange={handleInputChange}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddressForm;
