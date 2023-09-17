import axios from "axios";
import apiConfig from "../configs/api";
// import Razorpay from "razorpay";
// const Razorpay = require("razorpay");
export const initPayment = async (data) => {
  const pulzion = JSON.parse(localStorage.getItem("pulzion"));

  const options = {
    key: "rzp_test_k5xIodHIZVMEhV",
    amount: data.amount,
    currency: data.currency,
    name: "PASC",
    description: "Test Transaction",
    image: "/Pasc-logo.webp",
    order_id: data.id,
    handler: async (response) => {
      const option = {
        method: "POST",
        url: `${apiConfig.url}/user_events/verify`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${pulzion.token}`,
        },
        data: response,
      };
      try {
        const { data } = await axios(option, response);
        
      } catch (error) {
        
      }
    },
    theme: {
      color: "#0c4a6e",
    },
  };

  const rzp1 = new window.Razorpay(options);
  rzp1.open();
};

export const handlePayment = async () => {
  const pulzion = JSON.parse(localStorage.getItem("pulzion"));
  const option = {
    method: "POST",
    url: `${apiConfig.url}/user_events/payment`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${pulzion.token}`,
    },
  };
  try {
    

    const { data } = await axios(option);
    
    
    await initPayment(data.data);
    // localStorage.clear("CartItem");
  } catch (error) {
    
  }
};
