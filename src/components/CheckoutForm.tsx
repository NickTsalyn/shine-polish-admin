"use client";

import { FC, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { StripePaymentElementOptions } from "@stripe/stripe-js";

// interface FormProps {
//   message: string | null;
//   isLoading: boolean;
// }

// const CheckoutForm = (): FormProps => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [message, setMessage] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
const CheckoutForm: FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000", // Замість цього URL повинен бути ваш URL
      },
    });

    if (error) {
      setMessage(error.message ?? "An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default CheckoutForm;

// "use client";

// import { FC, useState } from "react";
// import {
//   PaymentElement,
//   useStripe,
//   useElements,
//   CardElement,
// } from "@stripe/react-stripe-js";
// import { StripePaymentElementOptions } from "@stripe/stripe-js";

// interface CheckoutFormProps {}
// const CheckoutForm: FC<CheckoutFormProps> = () => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const [message, setMessage] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     setIsLoading(true);

//     const cardElement = elements.getElement(CardElement);

//     if (cardElement) {
//       const { error, paymentMethod } = await stripe.createPaymentMethod({
//         type: "card",
//         card: cardElement,
//       });

//       if (error) {
//         setMessage(error.message ?? "An unexpected error occurred.");
//       } else {
//         setMessage(`Payment method created: ${paymentMethod.id}`);
//       }
//     }

//     setIsLoading(false);
//   };

//   const paymentElementOptions: StripePaymentElementOptions = {
//     layout: "tabs",
//   };

//   return (
//     <form id="payment-form" onSubmit={handleSubmit}>
//       <CardElement />
//       {/* <PaymentElement id="payment-element" options={paymentElementOptions} /> */}
//       <button disabled={isLoading || !stripe || !elements} id="submit">
//         <span id="button-text">
//           {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
//         </span>
//       </button>
//       {message && <div id="payment-message">{message}</div>}
//     </form>
//   );
// };

// export default CheckoutForm;
