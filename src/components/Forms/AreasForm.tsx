"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CloseButton from "@/components/UI/CloseButton";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import { CircularProgress } from "@mui/material";
import { deleteOption, getOptions, updateOptions } from "@/helpers/api";
import { styledTextField } from "../../styles/overrides";
import { useSnackbar } from "notistack";

type Props = {
  onClose: () => void;
};

export default function AreasForm({ onClose }: Props) {
  const {enqueueSnackbar} = useSnackbar();
  const [result, setResult] = useState<{
    areaOptions: { name: string; value: number }[];
  } | null>(null);
  const [place, setPlace] = useState("");
  const [coff, setCoff] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const areas = await getOptions();
        setResult(areas.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      name: place,
      value: Number(coff),
    };
    try {
      await updateOptions(data);
      setResult((prevState) => ({
        ...prevState,
        areaOptions: [...(prevState?.areaOptions || []), data],
      }));
      setPlace("");
      setCoff(0);
      enqueueSnackbar(`${data.name} added successfully`, { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Error adding area", { variant: "error" });
    }
  };

  const handleDelete = async (optionType: string, name: string) => {
    try {
      await deleteOption(optionType, name);
      setResult((prevState) => ({
        ...prevState,
        areaOptions: prevState?.areaOptions.filter((item) => item.name !== name) || [],
      }));
      enqueueSnackbar(`${name} deleted successfully`, { variant: "success" });
    } catch (error) {
     enqueueSnackbar("Error deleting area", { variant: "error" });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "place") {
      setPlace(value);
    } else {
      if (/^\d*$/.test(value)) {
        setCoff(Number(value));
      }
    }
  };

  return (
    <>
      <div className=" flex flex-col gap-4 md:gap-6  ">
        <h2 className="text-accent text-2xl md:text-4xl lg:text-5xl">Add Areas</h2>
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
          <button className="flex justify-center items-center w-auto">
            <AddCircleOutlineRoundedIcon fontSize="large" />
          </button>
        </Box>
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
          <ul className="flex flex-col gap-3 max-h-[300px] custom-scrollbar mb-4 md:mb-6 xl:mb-8 ">
            {result &&
              result.areaOptions.map((item) => (
                <li key={item.name} className="flex gap-1 flex-col relative">
                  <p className="text-secondary">{item.name}</p>
                  <span className="h-0.5 border border-sand/25"></span>
                  <button onClick={() => handleDelete("areaOptions", item.name)}>
                    <RemoveCircleOutlineRoundedIcon className="absolute top-0 right-0 text-[#de005d]" />
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>
      <CloseButton type="button" onClick={onClose} />
    </>
  );
}