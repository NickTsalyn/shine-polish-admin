import React, { useState, useEffect } from "react";
import CloseButton from "./UI/CloseButton";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import Image from "next/image";
import axios from "axios";

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
  const [beforeFileUrl, setBeforeFileUrl] = useState<string | null>(null);
  const [afterFile, setAfterFile] = useState<File | null>(null);
  const [afterFileUrl, setAfterFileUrl] = useState<string | null>(null);
  const [result, setResult] = useState<FormData | null>(null);

  const before = []
  const after = []

  const handleBeforeFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setBeforeFile(file);
      setBeforeFileUrl(URL.createObjectURL(file));
    }
  };

  const handleAfterFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setAfterFile(file);
      setAfterFileUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async(event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    if (beforeFile) {
        formData.append("beforeFile", beforeFile);
        before.push(beforeFile)
    }
    if (afterFile) {
        formData.append("afterFile", afterFile);
        after.push(afterFile)
    }
       setResult(formData);
    

    // formData.forEach((value, key) => {
    //   console.log(key, value);
    // });

        
    try {
        const res = await axios.post("https://shine-polish-server.onrender.com/admin/files/images/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log('post', res.data);
    } catch (error) {
        console.error('Error uploading files:', error);
    }
  };

//   console.log(formData)
 
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get("https://shine-polish-server.onrender.com/admin/files/images");
           console.log(response.data)
        } catch (error) {
            console.error(error);
        }
    };

    fetchData();
}, []);


  return (
    <div className="w-[400px] h-[527px] bg-white rounded-xl flex flex-col gap-8">
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
          <Button
            component="label"
            variant="contained"
            className="bg-sand"
          >
            Choose file
            <VisuallyHiddenInput
              type="file"
              onChange={handleBeforeFileChange}
            />
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
          <Button
            component="label"
            variant="contained"
            className="bg-sand"
          >
            Choose file
            <VisuallyHiddenInput
              type="file"
              onChange={handleAfterFileChange}
            />
          </Button>
        </div>
        <button
          type="submit"
          className="flex justify-center items-center h-[40px] bg-sand rounded-[12px] border border-solid"
        >
          Confirm
        </button>
      </form>
      <ul className="mt-4 flex gap-4">
        {beforeFileUrl && (
          <li>
            <Image src={beforeFileUrl} alt="Before" width={200} height={200} className="h-20 w-20 object-cover" />
          </li>
        )}
        {afterFileUrl && (
          <li>
            <Image src={afterFileUrl} alt="After" width={200} height={200} className="h-20 w-20 object-cover" />
          </li>
        )}
      </ul>
      <CloseButton type="button" onClick={onClose} />
    </div>
  );
}
