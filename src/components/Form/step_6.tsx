import useFormStorage from "@/hooks/formStorage";
// import { getPrice, serviceOption } from "../../../formula";
import { useEffect, useState } from "react";
import { area, discount, serviceOption, extrasOption ,getPrice} from "../../../formula";

import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

const Step6 = () => {
	const { form } = useFormStorage({});
	const [subTotal, setSubTotal] = useState(0);
	const [total, setTotal] = useState(0);

	const [loading, setLoading] = useState(false);
  // const origin = window.location.origin; // Отримати поточний URL звідки виконується код
  

	useEffect(() => {
		if (Object.keys(form).length === 0) {
			if (subTotal !== 0 || total !== 0) {
				setSubTotal(0);
				setTotal(0);
			}
			return;
		}

		const { bedroom, bathroom, areas, frequency, services, extras } = form;

		const areaCoefficient = area.find((area) => area.name === areas)?.value || 1;
		const discountValue = discount.find((discount) => discount.name === frequency)?.value || 1;
		const cleaningValue = serviceOption.find((service) => service.name === services)?.value || 1;
		const extraValue = extrasOption.reduce((acc, item) => {
			return (extras as string[]).includes(item.name) ? acc + item.value : acc;
		}, 0);
	
		const calculatedPrice = getPrice(Number(bedroom), Number(bathroom)) * areaCoefficient * discountValue  * cleaningValue + extraValue
		setSubTotal(calculatedPrice);
		
		const totalPrice = calculatedPrice * 1.06;
		setTotal(totalPrice);

	}, [form, subTotal, total]);


	const handleCheckout = async () => {
		setLoading(true);
	
		// Отримайте остаточну ціну з вашої форми букінгу
		const price = total * 100; // Наприклад, 50.00 USD
	
		const response = await fetch('/api/create-checkout-session', {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({ price }), // ціна у центах
		});
	
		const session = await response.json();
	
		const stripe = await stripePromise;
	
		if (!stripe) {
		  console.error('Stripe has not been initialized');
		  setLoading(false);
		  return;
		}
		const { error } = await stripe.redirectToCheckout({ sessionId: session.id });
	
		if (error) {
		  console.error('Error redirecting to checkout:', error);
		  setLoading(false);
		}
	  };

	return (
		<div className="p-4 md:p-6 lg:p-9 flex flex-col gap-5">
			<div>
				<h2 className=" text-black text-2xl text-center mb-2">BOOKING SUMMARY</h2>
				<p className="text-bookingSubText text-base">
					By clicking the Book Now button, you agree to our Terms of Service and Privacy Policy.
				</p>
			</div>
			<ul className="list-disc ml-6 flex flex-col gap-0.5">
				{Object.entries(form).map(([key, value]) => {
					if (['bedroom', 'bathroom', 'areas', 'frequency', 'services'].includes(key) && value !== "") {
						return (
							<li key={key} className="text-base ">
								<span>{key === "bathroom" || key === "bedroom" ? `${value} ${key}(s)` : value}</span>
							</li>
						);
					}
				})}
			</ul>
			{Array.isArray(form.extras)
					? <>
					<p>Extras</p><ul className="list-disc ml-6 flex flex-col gap-0.5">
					{form.extras.map((extra, index) => (
						<li key={index} className="text-base">
							{extra}
						</li>
					))}

				</ul>
				</>
			: null}
			<div className="flex flex-col gap-2 ">
				<div className=" flex justify-between text-xl">
					<span>SUB-TOTAL</span>
					<span className=" ">$ {subTotal.toFixed(2)}</span>
				</div>
				<div className=" flex justify-between text-xl">
					<span>SALES TAX</span>
					<span className="">$ {(subTotal * 0.06).toFixed(2)}</span>
				</div>
				<div className=" flex justify-between text-xl text-main">
					<span>TOTAL</span>
					<span className="">$ {total.toFixed(2)}</span>
				</div>
			</div>
			<button
				className=" flex justify-center items-center text-white bg-accent rounded-xl py-1.5 w-3/4 m-auto"
				type="submit"
				onClick={handleCheckout}
				disabled={loading}
			>
				<span className="text-white text-2xl">BOOK NOW</span>
			</button>
		</div>
	);
};

export default Step6;
