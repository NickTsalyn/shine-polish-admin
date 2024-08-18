"use client";

import { setAuthHeader } from "@/components/Modals/AreasModal";
import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { signin } from "@/helpers/api";
import { Box, CircularProgress } from "@mui/material";

interface Client {
  id: string;
  name: string;
  phone: string;
  area: string;
  email: string;
  selectedDate: string;
  bedroom: number;
  bathroom: number;
  totalPrice: number;
}

interface TableHeaders {
  [key: string]: string;
}

const tableHeaders: TableHeaders = {
  number: "#",
  name: "Name",
  phone: "Phone",
  area: "Area",
  email: "Email",
  selectedDate: "Date",
  bedBath: "Bedrooms/Bathrooms",
  assignment: "Assignment",
  price: "Total Price",
};

export default function Transactions() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    signin({ email: "AlvaroCapibaraTESTER@mail.com", password: "qwerty123" });
  }, []);

  useEffect(() => {
    const getClients = async () => {
      // setAuthHeader(
      // 	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NmVlOGM3MzE3MmUzNDM3OTNlNjQwZiIsImVtYWlsIjoiQWx2YXJvQ2FwaWJhcmFURVNURVJAbWFpbC5jb20iLCJ1c2VybmFtZSI6IkFsdmFybyBDYXBpYmFyYSIsInJvbGVzIjpbIkFETUlOIl0sImlhdCI6MTcyMzUyMjYyMywiZXhwIjoxNzIzNjA5MDIzfQ.iP6RfrD3vVaVNQKls0faQVjBSatM24tpWxkk1YqXe2Y"
      // );
      const response = await axios.get(`https://shine-polish-server.onrender.com/admin/bookings`);
      // const sortedClients = response.data.sort((a: Client, b: Client) => {
      // 	return dayjs(a.selectedDate, "MM/DD/YYYY").diff(dayjs(b.selectedDate, "MM/DD/YYYY"));
      // });

      setClients(response.data);

      setLoading(false);
    };
    getClients();
  }, []);
  console.log(clients);

  if (loading) {
    return (
      <Box sx={{ display: "flex", color: "#006778" }}>
        <CircularProgress />
      </Box>
    );
  }
  console.log(clients);
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
            <tr key={client.id} className="text-center">
              <td className="border-2 border-secondary p-2">{index + 1}</td>
              <td className="border-2 border-secondary p-2">{client.name}</td>
              <td className="border-2 border-secondary p-2">{client.area}</td>
              <td className="border-2 border-secondary p-2">
                {client.bedroom} / {client.bathroom}
              </td>
              <td className="border-2 border-secondary px-4 py-2">{client.phone}</td>
              <td className="border-2 border-secondary px-4 py-2">{client.email}</td>
              <td className="border-2 border-secondary px-4 py-2">
                {dayjs(client.selectedDate, "MM/DD/YYYY").format("MMMM D, YYYY")}
              </td>

              <td className="border-2 border-secondary px-4 py-2">Rab</td>
              <td className="border-2 border-secondary px-4 py-2">{client.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
