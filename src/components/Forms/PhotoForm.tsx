import React, { useState, useEffect } from "react";
import CloseButton from "../UI/CloseButton";
import { Box, CircularProgress, TextField } from "@mui/material";
import Image from "next/image";
import axios from "axios";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import ImageModal from "../UI/ImageModal";
import { getPhotos } from "@/helpers/api";
import UploadButton from "../UI/UploadButton";
import { styledTextField } from "@/styles/overrides";

type Props = {
  onClose: () => void;
};

export default function PhotoForm({ onClose }: Props) {
  const [beforeFile, setBeforeFile] = useState<File | null>(null);
  const [afterFile, setAfterFile] = useState<File | null>(null);
  const [photo, setPhoto] = useState<
    { beforeImageURL: string; afterImageURL: string; _id: string }[] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPhotos()
      .then((res) => {
        setPhoto(res);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleBeforeFileChange = (file: File | null) => {
    setBeforeFile(file);
  };

  const handleAfterFileChange = (file: File | null) => {
    setAfterFile(file);
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

    const res = await axios.post(
      "https://shine-polish-server.onrender.com/admin/files/images/upload",
      formData
    );
    setPhoto((prevState) =>
      prevState ? [...prevState, res.data] : [res.data]
    );
    setBeforeFile(null);
    setAfterFile(null);
  };

  const handleDelete = async (id: string) => {
    await axios.delete(
      `https://shine-polish-server.onrender.com/admin/files/images/${id}`
    );
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

  console.log(photo);

  if (loading) {
    return (
      <Box sx={{ display: "flex", color: "#006778" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="flex flex-col gap-4 md:gap-6 ">
      <h2 className="text-accent text-2xl md:text-4xl lg:text-5xl">
        Upload Photos
      </h2>
      <form className="flex flex-col gap-4 md:gap-6" onSubmit={handleSubmit}>
        <div className="flex  gap-3 md:gap-5">
          <TextField
            id="before-file"
            label="Before"
            variant="outlined"
            size="small"
            value={beforeFile ? beforeFile.name : ""}
            InputProps={{
              readOnly: true,
            }}
            sx={{
              width: "70%",
              ...styledTextField,
            }}
          />
          <UploadButton
            onFileChange={handleBeforeFileChange}
            label="Choose file"
            accept="image/*"
          />
        </div>
        <div className="flex  gap-3 md:gap-5">
          <TextField
            id="after-file"
            label="After"
            variant="outlined"
            size="small"
            value={afterFile ? afterFile.name : ""}
            InputProps={{
              readOnly: true,
            }}
            sx={{
              width: "70%",
              ...styledTextField,
            }}
          />
          <UploadButton
            onFileChange={handleAfterFileChange}
            label="Choose file"
            accept="image/*"
          />
        </div>

        <ul className="pb-4 flex gap-5 md:gap-6 flex-col justify-start  md:flex-wrap max-h-[280px] overflow-y-auto md:overflow-x-auto ">
          {photo?.map(({ beforeImageURL, afterImageURL, _id }) => (
            <li key={_id} className="flex justify-center gap-4  ">
              <Image
                src={beforeImageURL}
                alt="before"
                width={80}
                height={80}
                className="rounded-lg "
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

              <button onClick={() => handleDelete(_id)}>
                <DeleteForeverRoundedIcon
                  fontSize="large"
                  className="text-accent"
                />
              </button>
            </li>
          ))}
        </ul>
        <button
          type="submit"
          className="flex justify-center items-center h-[40px] bg-sand hover:bg-secondary rounded-xl border border-solid text-accent"
        >
          Confirm
        </button>
      </form>
      <CloseButton type="button" onClick={onClose} />
      {selectedImage && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          imageUrl={selectedImage}
        />
      )}
    </div>
  );
}
