import axios from "axios";
import apiConfig from "../configs/api";
import { toast } from "react-toastify";

export const addItem = async (id) => {

  const pulzion = JSON.parse(localStorage.getItem("pulzion"));

  const data = id;
  const options = {
    method: "POST",
    url: `${apiConfig.url}/cart/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${pulzion.token}`,
    },
    data: { event_id: data },
  };
  try {
    const res = await axios(options);
    return res.data
  } catch (e) {
    
    if (e?.response?.data) {
      return e.response.data;
    }
    return {
      error: "Something Went Wrong",
    };
  }
};

export const deleteFromCart = async (id) => {
  const pulzion = JSON.parse(localStorage.getItem("pulzion"));

  const options = {
    method: "DELETE",
    url: `${apiConfig.url}/cart/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${pulzion.token}`,
    },
  };
  try {
    const res = await axios(options);
    return res.data
  } catch (e) {
    
    if (e?.response?.data) {
      return e.response.data;
    }
    return {
      error: "Something Went Wrong",
    };
  }
};

export const getEventFromCart = async () => {
  const pulzion = JSON.parse(localStorage.getItem("pulzion"));
  const options = {
    method: "GET",
    url: `${apiConfig.url}/cart/`,
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

export const clearCart = async() => {
  const pulzion = JSON.parse(localStorage.getItem("pulzion"));

  const options = {
    method: "DELETE",
    url: `${apiConfig.url}/cart/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${pulzion.token}`,
    },
  };

  try {
    const res = await axios(options);
  } catch(e) {
    
  }
}
