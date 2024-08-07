'use client';

import { signin } from "@/helpers/api";
import { useEffect } from "react";

export default function Home() {

	useEffect(() => {
		signin({ email: "AlvaroCapibaraTESTER@mail.com", password: "qwerty123" });
	}, []);

	return (
		<div className="py-5 md:p-7 lg:py-20">
			<h1 className="text-2xl font-medium text-center text-accent">Home</h1>
		</div>
	);
}