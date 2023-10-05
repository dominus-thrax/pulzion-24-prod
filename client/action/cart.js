import axios from "axios";
import apiConfig from "../configs/api";
import { toast } from "react-toastify";

export const addItem = async (id, combo_id) => {

  const pulzion = JSON.parse(localStorage.getItem("pulzion"));

  let data;

  if (combo_id == null || combo_id == '') {
    data = { event_id: id }
  } else {
    data = { event_id: id, combo_id: combo_id }
  }

  console.log(data);
  const options = {
    method: "POST",
    url: `${apiConfig.url}/cart/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${pulzion.token}`,
    },
    data: data,
  };
  try {
    const res = await axios(options);
    return res;
  } catch (e) {
    console.log(e.response);
    if (e?.response?.data) {

      return e.response;
    }
    return {
      error: "Something Went Wrong",
    };
  }
};

export const deleteFromCart = async (id, combo_id) => {

  const pulzion = JSON.parse(localStorage.getItem("pulzion"));

  let data = {};

  if (combo_id) {
    data = { combo_id: combo_id }
    console.log("Delete: ", data)
  }


  console.log(data)

  const options = {
    method: "DELETE",
    url: `${apiConfig.url}/cart/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${pulzion.token}`,
    },
    body: data,
  };

  try {
    const res = await axios(options);
    console.log("LogDDel");
    console.log(res);
    return res.data
  } catch (e) {

    if (e?.response?.data) {
      return e.response;
    }
    return {
      error: "Something Went Wrong",
    };
  }
}


export const getEventFromCart = async () => {
  const pulzion = JSON.parse(localStorage.getItem("pulzion"));
  const options = {
    method: "GET",
    url: `${apiConfig.url}/cart/`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${pulzion.token}`,
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

export const clearCart = async () => {
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
  } catch (e) {

  }
}
