import axios from "axios";
import apiConfig from "../configs/api";
import { toast } from "react-toastify";


export const addCombo = async (combo_id) => {
  const pulzion = JSON.parse(localStorage.getItem("pulzion"));
  const options = {
    method: "POST",
    url: `${apiConfig.url}/cart/combo/${combo_id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${pulzion.token}`,
    },
    data: {},
  };
  try {
    const res = await axios(options);
    return res;
  } catch (e) {
    if (e?.response?.data) {
      return e.response;
    }
    return {
      error: "Something Went Wrong",
    };
  }
}


export const addItem = async (id) => {

  const pulzion = JSON.parse(localStorage.getItem("pulzion"));

  // //console.log(data);
  const options = {
    method: "POST",
    url: `${apiConfig.url}/cart/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${pulzion.token}`,
    },
    data: { event_id: id },
  };
  try {
    const res = await axios(options);
    return res;
  } catch (e) {
    //console.log(e.response);
    if (e?.response?.data) {

      return e.response;
    }
    return {
      error: "Something Went Wrong",
    };
  }
};

export const deleteEventFromCart = async (id, combo_id) => {

  const pulzion = JSON.parse(localStorage.getItem("pulzion"));

  let data = {};

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

// Delete Combo
export const deleteComboFromCart = async (combo_id) => {

  const pulzion = JSON.parse(localStorage.getItem("pulzion"));

  let data = {};

  const options = {
    method: "DELETE",
    url: `${apiConfig.url}/cart/combo/${combo_id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${pulzion.token}`,
    },
    body: data,
  };

  try {
    const res = await axios(options);
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
    url: `${apiConfig.url}/cart`,
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
    console.log("Cart Clear Error")
    console.log(e.response);
  }
}
