'use client'
import AreasModal from '@/components/AreasModal';
import * as React from 'react';
import { signin } from '@/helpers/api';



export default function App () {

	const handleSignin = async () => {
		const response = await signin({
			email: "AlvaroCapibaraTESTER@mail.com",
			password: "qwerty123",});
	};

  return (
	<div>
		<div>
		<AreasModal/>
		</div>
	<div><button onClick={handleSignin}>signIn</button></div>
	</div>
  );
}
