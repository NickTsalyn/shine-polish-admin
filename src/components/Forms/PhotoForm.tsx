import React, { useState, useEffect } from "react";
import CloseButton from "../UI/CloseButton";
import { Box, CircularProgress, TextField } from "@mui/material";
import Image from "next/image";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import ImageModal from "../UI/ImageModal";
import { getPhotos, deletePhotos, addPhotos } from "@/helpers/api";
import UploadButton from "../UI/UploadButton";
import { styledTextField } from "@/styles/overrides";

type Props = {
  onClose: () => void;
};

export default function PhotoForm({ onClose }: Props) {
  const [beforeFile, setBeforeFile] = useState<File | null>(null);
  const [afterFile, setAfterFile] = useState<File | null>(null);
  const [photo, setPhoto] = useState<{ beforeImageURL: string; afterImageURL: string; _id: string }[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const photos = await getPhotos();
        setPhoto(photos);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleBeforeFileChange = (file: File | null) => {
    setBeforeFile(file);
  };

  const handleAfterFileChange = (file: File | null) => {
    setAfterFile(file);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!beforeFile || !afterFile) {
      return;
    }

    const formData = new FormData();
    if (beforeFile) {
      formData.append("beforeFile", beforeFile);
    }
    if (afterFile) {
      formData.append("afterFile", afterFile);
    }

    try {
      setIsLoading(true);
      const res = await addPhotos(formData);
      const newPhoto = res.data;
      setPhoto((prevState) => (prevState ? [...prevState, newPhoto] : [newPhoto]));
      setIsLoading(false);
      setBeforeFile(null);
      setAfterFile(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setIsLoading(true);
      await deletePhotos(id);
      setPhoto((prevState) => prevState?.filter((item) => item._id !== id) || []);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="flex flex-col gap-4 md:gap-6 ">
      <h2 className="text-accent text-2xl md:text-4xl lg:text-5xl">Upload Photos</h2>
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
          <UploadButton onFileChange={handleBeforeFileChange} label="Choose file" accept="image/*" />
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
          <UploadButton onFileChange={handleAfterFileChange} label="Choose file" accept="image/*" />
        </div>
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#006778",
              height: "300px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
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
                  <DeleteForeverRoundedIcon fontSize="large" className="text-accent" />
                </button>
              </li>
            ))}
          </ul>
        )}
        <button
          type="submit"
          className="flex justify-center items-center h-[40px] bg-sand hover:bg-secondary rounded-xl border border-solid text-accent"
        >
          Confirm
        </button>
      </form>
      <CloseButton type="button" onClick={onClose} />
      {selectedImage && <ImageModal isOpen={isModalOpen} onClose={handleCloseModal} imageUrl={selectedImage} />}
    </div>
  );
}
