"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CloseButton from "@/components/UI/CloseButton";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import { setAuthHeader } from "./AreasModal";

type Props = {
	onClose: () => void;
};

const user = JSON.parse(localStorage.getItem("user") || "{}");
const token = user.accessToken;

export default function AreasForm({ onClose }: Props) {
	const [result, setResult] = useState<{ areaOptions: { name: string; value: number }[] } | null>(null);
	const [place, setPlace] = useState("");
	const [coff, setCoff] = useState<string>("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("https://shine-polish-server.onrender.com/bookings/options");
				setResult(response.data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const response = await axios.patch(`https://shine-polish-server.onrender.com/admin/bookings/areaOptions`, {
			name: place,
			value: Number(coff),
		});

		setResult(response.data);
		setPlace("");
		setCoff("");
	};

	const handleDelete = async (name: string) => {
		 await axios.delete(`https://shine-polish-server.onrender.com/admin/bookings/areaOptions/${name}`);
        setResult(prevState => ({
            ...prevState,
            areaOptions: prevState?.areaOptions.filter(item => item.name !== name) || []
          }));
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		if (name === "place") {
			setPlace(value);
		} else {
			if (/^\d*$/.test(value)) {
				setCoff(value);
			}
		}
	};

	return (
		<div className="flex flex-col gap-8 px-4">
			<h2 className="text-accent text-4xl">Add Areas</h2>
			<Box
				component="form"
				noValidate
				autoComplete="off"
				className="flex justify-between gap-8 items-center text-sand "
				onSubmit={handleSubmit}
			>
				<TextField
					id="outlined-basic"
					label="Place"
					variant="outlined"
					size="small"
					className=" border-2 border-solid border-sand rounded-xl text-sm w-2/3"
					value={place}
					name="place"
					onChange={handleChange}
				/>
				<TextField
					id="outlined-basic"
					label="Coff"
					variant="outlined"
					size="small"
					className=" border-2 border-solid border-sand rounded-xl text-sm w-1/3"
					value={coff}
					name="coff"
					onChange={handleChange}
				/>
				<button className="flex justify-center items-center">
					<AddCircleOutlineRoundedIcon fontSize="large" />
				</button>
			</Box>
			<ul className="flex flex-col gap-3 max-h-[300px] overflow-y-auto custom-scrollbar mr-3">
				{result &&
					result.areaOptions.map((item) => (
						<li key={item.name} className="flex gap-1 flex-col relative">
							<p className="text-sand">{item.name}</p>
							<span className="h-0.5 border border-sand/25"></span>
							<button onClick={() => handleDelete(item.name)}>
								<RemoveCircleOutlineRoundedIcon className="absolute top-0 right-0 text-[#de005d]" />
							</button>
						</li>
					))}
			</ul>
			<CloseButton type="button" onClick={onClose} />
		</div>
	);
}
