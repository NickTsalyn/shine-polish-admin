"use client";

import React, { useContext } from "react";
import { useEffect } from "react";
import ClientCardList from "@/components/ClientCard/ClientCardList";
import CalendarComponent from "@/components/Calendar/CalendarComponent";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/components/AuthContext";

export default function Home() {
	const [events, setEvents] = React.useState([]);
	const { isLoggedIn } = useContext(AuthContext);
	const router = useRouter();

	useEffect(() => {
		if (!isLoggedIn) {
			router.push("/");
		}
	}, [isLoggedIn, router]);

	function updateEvent(updateEvent: any): void {
		throw new Error("Function not implemented.");
	}

	function deleteEvent(eventId: number): void {
		throw new Error("Function not implemented.");
	}
	return (
		<div className="py-5 md:p-7 lg:py-20">
			<h1 className="text-2xl font-medium text-center text-accent">Home</h1>
			<div className="flex flex-col lg:flex-row">
				{/* <ClientCard /> */}
				<ClientCardList />
				<CalendarComponent events={events} onUpdateEvent={updateEvent} onDeleteEvent={deleteEvent} />
			</div>
		</div>
	);
}
