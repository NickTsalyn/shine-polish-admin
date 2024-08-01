import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useEffect, useState } from "react";
import axios from "axios";
import { setAuthHeader } from "./AreasModal";
import CloseButton from "./UI/CloseButton";
import { clear } from "console";

type Props = {
	onClose: () => void;
};


export default function PriceForm({onClose}: Props) {
	const [result, setResult] = useState<{ base: number; coff: number; bathPrice: number } | null>(null);
	const [base, setBase] = useState<string>("");
	const [coff, setCoff] = useState<string>("");
	const [bathPrice, setBathPrice] = useState<string>("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const {data} = await axios.get("https://shine-polish-server.onrender.com/bookings/options");
				setResult(data);
                setBase(data.base.toString());
				setCoff(data.coff.toString());
				setBathPrice(data.bathPrice.toString());
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		if (name === "base") {
			if (/^\d*$/.test(value)) {
				setBase(value);
			}
		} else if (name === "coff") {
			if (/^\d*$/.test(value)) {
				setCoff(value);
			}
		} else if (name === "bathPrice") {
			if (/^\d*$/.test(value)) {
				setBathPrice(value);
			}
		}
	};

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

        const updatedPricing = {
            base: Number(base),
            coff: Number(coff),
            bathPrice: Number(bathPrice),
		};

		const {data} = await axios.put(`https://shine-polish-server.onrender.com/admin/bookings/pricing`, updatedPricing);

		setResult(data);
	};

	return (
		<div className="w-[400px] h-[427px] bg-white rounded-xl flex flex-col gap-8">
			<h2 className="text-accent text-4xl">Change Price</h2>
			<Box
				component="form"
				noValidate
				autoComplete="off"
				className="flex flex-col gap-8 items-center text-sand"
				onSubmit={handleSubmit}
			>
				<div className="flex flex-row justify-between items-center w-full">
					<TextField
						id="outlined-basic"
						label="Base"
						variant="outlined"
						size="small"
						className=" border-2 border-solid border-sand rounded-xl text-sm w-3/4"
						value={base}
						name="base"
						onChange={handleChange}
					/>
					<button className="w-1/4 text-main">
						<EditRoundedIcon fontSize="large" />
					</button>
				</div>
				<div className="flex flex-row justify-between items-center w-full">
					<TextField
						id="outlined-basic"
						label="Coff"
						variant="outlined"
						size="small"
						className=" border-2 border-solid border-sand rounded-xl text-sm w-3/4"
						value={coff}
						name="coff"
						onChange={handleChange}
					/>
					<button className="w-1/4 text-main">
						<EditRoundedIcon fontSize="large" />
					</button>
				</div>
				<div className="flex flex-row justify-between items-center w-full">
					<TextField
						id="outlined-basic"
						label="BathPrice"
						variant="outlined"
						size="small"
						className=" border-2 border-solid border-sand rounded-xl text-sm w-3/4"
						value={bathPrice}
						name="bathPrice"
						onChange={handleChange}
					/>
					<button className="w-1/4 text-main">
						<EditRoundedIcon fontSize="large" />
					</button>
				</div>
				<CloseButton type="button" onClick={onClose} />
			</Box>
		</div>
	);
}
