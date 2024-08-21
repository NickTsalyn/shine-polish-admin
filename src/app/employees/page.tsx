"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { signin } from "@/helpers/api";
import Image from "next/image";
import ImageModal from "@/components/UI/ImageModal";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

interface Employee {
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
  avatar: "ID",
  delete: "Delete",
};

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    signin({ email: "AlvaroCapibaraTESTER@mail.com", password: "qwerty123" });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`https://shine-polish-server.onrender.com/admin/employees`);
      setEmployees(response.data);
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

  return (
    <div className="py-5 md:p-7 lg:py-20 text-text">
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-medium mb-4 md:mb-6 xl:mb-8 text-center text-accent">
        Clients
      </h1>
      <table className="min-w-full border-collapse border-2 border-secondary">
        <thead>
          <tr>
            {Object.keys(tableHeaders).map((key) => (
              <th key={key} className="border-2 border-secondary ">
                {tableHeaders[key]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index} className="text-center">
              <td className="border-2 border-secondary p-2">{employee.username}</td>
              <td className="border-2 border-secondary p-2">{employee.phone}</td>
              <td className="border-2 border-secondary p-2">{employee.area}</td>
              <td className="border-2 border-secondary p-2">{employee.email}</td>
              <td className="border-2 border-secondary p-2 text-center">
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
                  className="cursor-pointer"
                />
              </td>
              <td className="border-2 border-secondary p-2">
                <button
                //  onClick={() => handleDelete(_id)}
                >
                  <CloseRoundedIcon className='size-6  md:size-9 text-main'/>
				
				
                </button>
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
