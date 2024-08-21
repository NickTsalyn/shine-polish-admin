"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { signin } from "@/helpers/api";
import Image from "next/image";
import ImageModal from "@/components/UI/ImageModal";

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
		<div className="py-5 md:p-7 lg:py-20">
			<h1 className="text-2xl font-medium text-center text-accent">Clients</h1>
			<table className="min-w-full border-collapse border border-gray-200">
				<thead>
					<tr>
						{Object.keys(tableHeaders).map((key) => (
							<th key={key} className="border border-gray-200 px-4 py-2">
								{tableHeaders[key]}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{employees.map((employee, index) => (
						<tr key={index} className="text-center">
							<td className="border border-gray-200 px-4 py-2">{employee.username}</td>
							<td className="border border-gray-200 px-4 py-2">{employee.phone}</td>
							<td className="border border-gray-200 px-4 py-2">{employee.area}</td>
							<td className="border border-gray-200 px-4 py-2">{employee.email}</td>
							<td className="border border-gray-200 px-4 py-2">
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
						</tr>
					))}
				</tbody>
			</table>
			{selectedImage && <ImageModal isOpen={isModalOpen} onClose={handleCloseModal} imageUrl={selectedImage} />}
		</div>
	);
};

export default Employees;
