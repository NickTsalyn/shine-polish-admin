"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import Image from "next/image";
import ImageModal from "@/components/UI/ImageModal";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DialogAgree from "@/components/DialogAgree";

interface Employee {
  _id: string;
  username: string;
  phone: number;
  area: string;
  email: string;
  avatar: File | string;
}

interface TableHeaders {
  [key: string]: string;
}

const tableHeaders: TableHeaders = {
  username: "Name",
  phone: "Phone",
  area: "Area",
  email: "Email",
  avatar: "Avatar",
  delete: "Delete",
};

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeeId, setEmployeeId] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`https://shine-polish-server.onrender.com/admin/employees`);
      setEmployees(response.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const handleClick = (id: string) => {
	setEmployeeId(id)
    setOpen(true);
  };

  const handleDelete = async () => {
	if (!employeeId) return;
    try {
      await axios.delete(`https://shine-polish-server.onrender.com/admin/employees/${employeeId}`);
      setEmployees((prevState) => prevState.filter((employee) => employee._id !== employeeId));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
    setOpen(false);
    setEmployeeId(null);
  };

  const handleClose = () => {
    setOpen(false);
	setEmployeeId(null)
  };  

  if (loading) {
    return (
      <Box sx={{ display: "flex", color: "#006778" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="py-5 md:p-7 lg:py-20 text-text">
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-medium mb-4 md:mb-6 xl:mb-8 text-center text-accent">
        Employees
      </h1>
      <table className="min-w-full border-collapse border-2 border-secondary">
        <thead>
          <tr>
            {Object.keys(tableHeaders).map((key) => (
              <th key={key} className="border-2 border-secondary p-2">
                {tableHeaders[key]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id} className="text-center">
              <td className="border-2 border-secondary p-2">{employee.username}</td>
              <td className="border-2 border-secondary p-2">{employee.phone}</td>
              <td className="border-2 border-secondary p-2">{employee.area}</td>
              <td className="border-2 border-secondary p-2">{employee.email}</td>
              <td className="border-2 border-secondary p-2 text-center">
              <div className="flex justify-center items-center">
                <Image
                  src={employee.avatar instanceof File ? URL.createObjectURL(employee.avatar) : employee.avatar}
                  alt="Avatar"
                  width={50}
                  height={50}
                  onClick={() =>
                    handleImageClick(
                      employee.avatar instanceof File ? URL.createObjectURL(employee.avatar) : employee.avatar
                    )
                  }
                  className="cursor-pointer "
                />
              </div>
              </td>
              <td className="border-2 border-secondary p-2">
			  <button onClick={() => handleClick(employee._id)}>
                  <CloseRoundedIcon className="size-6  md:size-9 text-main" />
                </button>
				<DialogAgree
                  open={open && employeeId === employee._id}
                  onClose={handleClose}
                  onConfirm={handleDelete}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedImage && <ImageModal isOpen={isModalOpen} onClose={handleCloseModal} imageUrl={selectedImage} />}
    </div>
  );
};

export default Employees;
