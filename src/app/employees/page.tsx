"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import Image from "next/image";
import ImageModal from "@/components/UI/ImageModal";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DialogAgree from "@/components/DialogAgree";
import { deleteEmployee, getEmployees } from "@/helpers/api";
import { Employee } from "@/types/interfaces";
import EditEmployee from "@/components/Modals/EditEmployee";

interface TableHeaders {
  [key: string]: string;
}

const tableHeaders: TableHeaders = {
  username: "Name",
  phone: "Phone",
  area: "Area",
  email: "Email",
  avatar: "Avatar",
  edite: "Edit",
  delete: "Delete",
};

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [employeeId, setEmployeeId] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ВСІ EMPLOYEES
    const fetchData = async () => {
      const data = await getEmployees();
      setEmployees(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  // ВІДКРИТТЯ МОДАЛКИ ВИДАЛЕННЯ
  const handleOpenDeleteModal = (id: string) => {
    setEmployeeId(id);
    setOpenDelete(true);
  };
  // ВИДАЛЕННЯ EMPLOYEE
  const handleDelete = async () => {
    if (!employeeId) return;
    try {
      await deleteEmployee(employeeId);
      setEmployees((prevState) => prevState.filter((employee) => employee._id !== employeeId));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    } finally {
      setOpenDelete(false);
      setEmployeeId(null);
    }
  };
  //ЗАКРИТТЯ МОДАЛКИ ВИДАЛЕННЯ
  const handleCloseDelete = () => {
    setOpenDelete(false);
    setEmployeeId(null);
  };

  //ВІДКРИТТЯ МОДАЛКИ РЕДАГУВАННЯ
  const handleOpenEditModal = (id: string) => {
//  if (!employeeId) return;
    const empl = employees.find((employee) => employee._id === id);
   
    setSelectedEmployee(empl as Employee);
    setEmployeeId(id);
    setOpenEdit(true);
  };
  //ЗАКРИТТЯ МОДАЛКИ РЕДАГУВАННЯ
  const handleCloseEdit = () => {
    setOpenEdit(false);
    setEmployeeId(null);
    setSelectedEmployee(null);
  };
  // ВІДКРИТТЯ МОДАЛКИ ФОТО
  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  //ЗАКРИТТЯ МОДАЛКИ ФОТО
  const handleCloseModal = () => {
    setIsModalOpen(false);
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
                <div className="flex justify-center items-center ">
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
                <button onClick={() => handleOpenEditModal(employee._id)}>
                  <EditRoundedIcon className="size-4  md:size-6 xl:size-9 text-accent" />
                </button>
                {openEdit && selectedEmployee && (
                  <EditEmployee
                    open={openEdit && employeeId === employee._id}
                    onClose={handleCloseEdit}
                    employee={selectedEmployee}
                  />
                )}
              </td>
              <td className="border-2 border-secondary p-2">
                <button onClick={() => handleOpenDeleteModal(employee._id)}>
                  <CloseRoundedIcon className="size-4  md:size-6 xl:size-9 text-main" />
                </button>
                <DialogAgree
                  open={openDelete && employeeId === employee._id}
                  onClose={handleCloseDelete}
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
