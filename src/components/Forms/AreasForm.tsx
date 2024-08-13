"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CloseButton from "@/components/UI/CloseButton";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import { getAreas } from "@/helpers/api";
import { CircularProgress } from "@mui/material";
import { styledTextField } from "../../styles/overrides";

type Props = {
  onClose: () => void;
};

export default function AreasForm({ onClose }: Props) {
  const [result, setResult] = useState<{
    areaOptions: { name: string; value: number }[];
  } | null>(null);
  const [place, setPlace] = useState("");
  const [coff, setCoff] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAreas().then((res) => {
      setResult(res);
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await axios.patch(
      `https://shine-polish-server.onrender.com/admin/bookings/areaOptions`,
      {
        name: place,
        value: Number(coff),
      }
    );

    setResult(response.data);
    setPlace("");
    setCoff("");
  };

  const handleDelete = async (name: string) => {
    await axios.delete(
      `https://shine-polish-server.onrender.com/admin/bookings/areaOptions/${name}`
    );
    setResult((prevState) => ({
      ...prevState,
      areaOptions:
        prevState?.areaOptions.filter((item) => item.name !== name) || [],
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

  if (loading) {
    return (
      <Box sx={{ display: "flex", color: "#006778" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <div className=" w-[280px] md:w-[400px] lg:w-[572px] xl:w-[672px]  flex flex-col gap-4 md:gap-6  ">
        <h2 className="text-accent text-2xl md:text-4xl lg:text-5xl">
          Add Areas
        </h2>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          className="flex justify-center gap-4  items-center text-secondary "
          onSubmit={handleSubmit}
        >
          <TextField
            id="outlined-basic"
            label="Place"
            variant="outlined"
            size="small"
            value={place}
            name="place"
            onChange={handleChange}
            sx={{
              width: "56%",
              ...styledTextField,
            }}
          />
          <TextField
            id="outlined-basic"
            label="Coff"
            variant="outlined"
            size="small"
            value={coff}
            name="coff"
            onChange={handleChange}
            sx={{
              width: "32%",
              ...styledTextField,
            }}
          />
          <button className="flex justify-center items-center w-[12%]">
            <AddCircleOutlineRoundedIcon fontSize="large" />
          </button>
        </Box>
        <ul className="flex flex-col gap-3 max-h-[300px] overflow-y-auto custom-scrollbar mb-4 md:mb-6 xl:mb-8 ">
          {result &&
            result.areaOptions.map((item) => (
              <li key={item.name} className="flex gap-1 flex-col relative">
                <p className="text-secondary">{item.name}</p>
                <span className="h-0.5 border border-sand/25"></span>
                <button onClick={() => handleDelete(item.name)}>
                  <RemoveCircleOutlineRoundedIcon className="absolute top-0 right-0 text-[#de005d]" />
                </button>
              </li>
            ))}
        </ul>
      </div>
      <CloseButton type="button" onClick={onClose} />
    </>
  );
}
