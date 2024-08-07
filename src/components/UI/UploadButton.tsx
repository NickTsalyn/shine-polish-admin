import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material";

type UploadButtonProps = {
  onFileChange: (file: File | null) => void;
  label: string;
  accept?: string;
};

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

const UploadButton: React.FC<UploadButtonProps> = ({ onFileChange, label, accept }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onFileChange(file);
  };

  return (
    <Button component="label" variant="contained" className="bg-sand">
      {label}
      <VisuallyHiddenInput type="file" onChange={handleFileChange} accept={accept} />
    </Button>
  );
};

export default UploadButton;