import Constantes from '../Constantes';

const createPaymentIntent = (id) => {
  return window
    .fetch(`${Constantes.RUTA_API}/stripe/create-payment-intent?id=${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        return null;
      }
    })
    .then(data => {
      console.log(data);
      if (!data || data.error) {
        console.log("API error:", { data });
        throw new Error("PaymentIntent API Error");
      } else {
        return data.client_secret;
      }
    });
};
/*
const getProductDetails = (id) => {
  return window
    .fetch(`${Constantes.RUTA_API}/stripe/product-details?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        return null;
      }
    })
    .then(data => {
      if (!data || data.error) {
        console.log("API error:", { data });
        throw Error("API Error");
      } else {
        return data;
      }
    });
};
*/
const getPublicStripeKey = options => {
  return window
    .fetch(`${Constantes.RUTA_API}/stripe/public-key`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        return null;
      }
    })
    .then(data => {
      if (!data || data.error) {
        console.log("API error:", { data });
        throw Error("API Error");
      } else {
        return data.publicKey;
      }
    });
};

const api = {
  createPaymentIntent,
  getPublicStripeKey: getPublicStripeKey,
  //getProductDetails: getProductDetails
};

export default api;
