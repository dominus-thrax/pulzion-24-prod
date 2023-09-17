import axios from "axios";
import apiConfig from "../configs/api";

export const paymentForm = async (transaction_id, referal_code, cart) => {
  const pulzion = JSON.parse(localStorage.getItem("pulzion"));
  let event_id = [];
  cart.map((item) => {
    event_id.push(item.id);
  });

  const options = {
    method: "POST",
    url: `${apiConfig.url}/transaction`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${pulzion.token}`,
    },
    data: {
      event_id,
      transaction_id,
      referal_code,
    },
  };
  try {
    const res = await axios(options);
    return res.data;
  } catch (e) {
    
    if (e?.response?.data) {
      return e.response.data;
    }
    return {
      error: "Something Went Wrong",
    };
  }
};

export const getTransaction = async () => {
  const pulzion = JSON.parse(localStorage.getItem("pulzion"));

  const options = {
    method: "GET",
    url: `${apiConfig.url}/transaction`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${pulzion.token}`,
    },
  };
  try {
    const res = await axios(options);
    return res.data;
  } catch (e) {
    
    if (e?.response?.data) {
      return e.response.data;
    }
    return {
      error: "Something Went Wrong",
    };
  }
};

export const getPaymentDetails = async () => {
  const pulzion = JSON.parse(localStorage.getItem("pulzion"));
  if (pulzion?.type === "admin") {
    const options = {
      method: "GET",
      url: `${apiConfig.url}/admin/paymentForm`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${pulzion.token}`,
      },
    };
    try {
      const res = await axios(options);
      
      return res.data.verify;
    } catch (e) {
      
      if (e?.response?.data) {
        return e.response.data;
      }
      return {
        error: "Something Went Wrong",
      };
    }
  }
};
