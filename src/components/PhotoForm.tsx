import React, { useState, useEffect } from "react";
import CloseButton from "./UI/CloseButton";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Box, CircularProgress, TextField } from "@mui/material";
import Image from "next/image";
import axios from "axios";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import ImageModal from "./ImageModal";
import { getPhotos } from "@/helpers/api";

const VisuallyHiddenInput = styled("input")({
	clip: "rect(0 0 0 0)",
	clipPath: "inset(50%)",
	overflow: "hidden",
	position: "absolute",
	height: "1px",
	width: "1px",
	margin: "-1px",
	padding: "0",
	border: "0",
});

type Props = {
	onClose: () => void;
};

export default function PhotoForm({ onClose }: Props) {
	const [beforeFile, setBeforeFile] = useState<File | null>(null);
	const [afterFile, setAfterFile] = useState<File | null>(null);
	const [photo, setPhoto] = useState<{ beforeImageURL: string; afterImageURL: string; _id: string }[] | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

	useEffect(() => {
        getPhotos().then((res) => {
            setPhoto(res);
            setLoading(false);
          }).catch((error) => {
            console.error(error);
            setLoading(false);
          });
	}, []);

	const handleBeforeFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			const file = event.target.files[0];
			setBeforeFile(file);
		}
	};

	const handleAfterFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			const file = event.target.files[0];
			setAfterFile(file);
		}
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		const formData = new FormData();
		if (beforeFile) {
			formData.append("beforeFile", beforeFile);
		}
		if (afterFile) {
			formData.append("afterFile", afterFile);
		}

		const res = await axios.post("https://shine-polish-server.onrender.com/admin/files/images/upload", formData);
		setPhoto((prevState) => (prevState ? [...prevState, res.data] : [res.data]));
		setBeforeFile(null);
		setAfterFile(null);
	};

	const handleDelete = async (id: string) => {
		await axios.delete(`https://shine-polish-server.onrender.com/admin/files/images/${id}`);
		setPhoto((prevState) => prevState?.filter((item) => item._id !== id) || []);
	};

	const handleImageClick = (imageUrl: string) => {
		setSelectedImage(imageUrl);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedImage(null);
	};

    if (loading) {
        return (
            <Box sx={{ display: "flex", color: "#006778" }}>
            <CircularProgress />
          </Box>)
      }

	return (
		<div className="w-[343px] h-[527px] bg-white rounded-xl flex flex-col gap-8">
			<h2 className="text-accent text-4xl">Upload Photos</h2>
			<form className="flex flex-col gap-7" onSubmit={handleSubmit}>
				<div className="flex justify-between gap-7">
					<TextField
						id="before-file"
						label="Before"
						variant="outlined"
						size="small"
						className="border-2 border-solid border-sand rounded-xl text-sm w-3/4"
						value={beforeFile ? beforeFile.name : ""}
						InputProps={{
							readOnly: true,
						}}
					/>
					<Button component="label" variant="contained" className="bg-sand">
						Choose file
						<VisuallyHiddenInput type="file" onChange={handleBeforeFileChange} />
					</Button>
				</div>
				<div className="flex justify-between gap-7">
					<TextField
						id="after-file"
						label="After"
						variant="outlined"
						size="small"
						className="border-2 border-solid border-sand rounded-xl text-sm w-3/4"
						value={afterFile ? afterFile.name : ""}
						InputProps={{
							readOnly: true,
						}}
					/>
					<Button component="label" variant="contained" className="bg-sand">
						Choose file
						<VisuallyHiddenInput type="file" onChange={handleAfterFileChange} />
					</Button>
				</div>
				<button
					type="submit"
					className="flex justify-center items-center h-[40px] bg-sand rounded-[12px] border border-solid"
				>
					Confirm
				</button>
			</form>
			<ul className="mt-4 flex gap-5 flex-col max-h-[280px] overflow-y-auto">
				{photo?.map(({ beforeImageURL, afterImageURL, _id }) => (
					<li key={_id} className="flex gap-7 ">
						<Image
							src={beforeImageURL}
							alt="before"
							width={80}
							height={80}
							className=" rounded-lg "
							onClick={() => handleImageClick(beforeImageURL)}
						/>
						<Image
							src={afterImageURL}
							alt="after"
							width={80}
							height={80}
							className=" rounded-lg"
							onClick={() => handleImageClick(afterImageURL)}
						/>
						<div className="flex gap-4 flex-col">
							<button>
								<EditRoundedIcon fontSize="large" className="text-main" />
							</button>
							<button onClick={() => handleDelete(_id)}>
								<DeleteForeverRoundedIcon fontSize="large" className="text-accent" />
							</button>
						</div>
					</li>
				))}
			</ul>
			<CloseButton type="button" onClick={onClose} />
			{selectedImage && <ImageModal isOpen={isModalOpen} onClose={handleCloseModal} imageUrl={selectedImage} />}
		</div>
	);
}
