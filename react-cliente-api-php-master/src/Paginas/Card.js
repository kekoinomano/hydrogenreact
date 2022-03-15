import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../ConsultasAPI/stripe";
import api from "../ConsultasAPI/stripe-api";

import "./Stripe.css";

const stripePromise = api.getPublicStripeKey().then(key => loadStripe(key));

export default function Card(props) {
  return (
    <div className='popUp'>
      <div className='login' >
        <button className="closeForm" onClick={() => {props.setView(false)}}>X</button>
      <div className="sr-root">
        <div className="sr-main">
          <header className="sr-header">
            <div className="sr-header__logo" />
          </header>
          <Elements stripe={stripePromise}>
            <CheckoutForm id={props.id} />
          </Elements>
        </div>

        <div className="sr-content">
          <div className="pasha-image-stack">
            <img
              alt=""
              src="https://picsum.photos/280/320?random=1"
              width="140"
              height="160"
            />
            <img
              alt=""
              src="https://picsum.photos/280/320?random=2"
              width="140"
              height="160"
            />
            <img
              alt=""
              src="https://picsum.photos/280/320?random=3"
              width="140"
              height="160"
            />
            <img
              alt=""
              src="https://picsum.photos/280/320?random=4"
              width="140"
              height="160"
            />
          </div>
        </div>
      </div>
      
    </div>
    </div>
  );
}
