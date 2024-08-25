"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getBookings } from "@/helpers/api";
import { Box, CircularProgress } from "@mui/material";
import { Booking } from "@/interfaces";


interface TableHeaders {
	[key: string]: string;
}

const tableHeaders: TableHeaders = {
	number: "#",
	name: "Name",
	area: "Area",
	bedBath: "Bed/Bath",
	phone: "Phone",
	email: "Email",
	selectedDate: "Date",
	assignment: "Assignment",
	price: "Total Price",
};

export default function Transactions() {
	const [clients, setClients] = useState<Booking[]>([]);
	const [loading, setLoading] = useState(true);


	useEffect(() => {
		const getClients = async () => {
			const response = await getBookings();
			setClients(response);
			setLoading(false);
		};
		getClients();
	}, []);

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
				Transactions
			</h1>
			<table className="min-w-full  border-2  border-secondary ">
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
					{clients.map((client, index) => (
						<tr key={index} className="text-center">
							<td className="border-2 border-secondary p-2">{index + 1}</td>
							<td className="border-2 border-secondary p-2">{client.name}</td>
							<td className="border-2 border-secondary p-2">{client.area}</td>
							<td className="border-2 border-secondary p-2">
								{client.bedroom} / {client.bathroom}
							</td>
							<td className="border-2 border-secondary py-2">{client.phone}</td>
							<td className="border-2 border-secondary py-2">{client.email}</td>
							<td className="border-2 border-secondary py-2">
								{dayjs(client.selectedDate, "MM/DD/YYYY").format("MMMM D, YYYY")}
							</td>

							<td className="border-2 border-secondary py-2">Rab</td>
							<td className="border-2 border-secondary py-2">{client.totalPrice}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
