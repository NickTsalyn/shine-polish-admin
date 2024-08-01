"use client";
import * as React from "react";
import { signin } from "@/helpers/api";
import PhotoModal from "@/components/PhotoModal";

export default function App() {
	const handleSignin = async () => {
		const response = await signin({
			email: "AlvaroCapibaraTESTER@mail.com",
			password: "qwerty123",
		});
	};

	return (
		<div>
			<div>
				<PhotoModal />
			</div>
			<div>
				<button onClick={handleSignin}>signIn</button>
			</div>
		</div>
	);
}
