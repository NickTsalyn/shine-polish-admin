'use client'
import AreasModal from '@/components/AreasModal';
import PriceModal from '@/components/PriceModal';
import { signin } from '@/helpers/api';
import * as React from 'react';



export default function Price () {


	const handleSignin = async () => {
		const response = await signin({
			email: "AlvaroCapibaraTESTER@mail.com",
			password: "qwerty123",});
	};
  return (
	<div>
	  <PriceModal/>
	  <div><button onClick={handleSignin}>signIn</button></div>
	</div>
  );
}
