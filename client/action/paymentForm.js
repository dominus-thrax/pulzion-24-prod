import axios from "axios";
import apiConfig from "../configs/api";

export const paymentForm = async (transaction_id, referal_code, events, combos) => {
  const pulzion = JSON.parse(localStorage.getItem("pulzion"));
  let event_id = [];
  let combo_id = [];
  events.map((item) => {
    event_id.push(item.id);
  });

  combos.map((item) => {
    combo_id.push(item.id);
  });

  if (referal_code === "" || referal_code === undefined) {
    referal_code = ''
  }
  console.log(event_id)
  console.log(combo_id)
  console.log(transaction_id)
  console.log("referal_code")
  console.log(referal_code)

  const options = {
    method: "POST",
    url: `${apiConfig.url}/transaction`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${pulzion.token}`,
    },
    data: {
      event_id,
      combo_id,
      transaction_id,
      referal_code,
    },
  };
  try {
    await axios(options).then((res) => {
      console.log(res)
      return res;
    }).catch((err) => {
      console.log(err)
      return err;
    });
  } catch (e) {

    if (e?.response?.data) {
      return e.response.data;
    }
    console.log(res);
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
    console.log(res);
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
      console.log("abc", res)
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
