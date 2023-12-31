import axios from "axios";
import apiConfig from "../configs/api";

export const getEvent = async (id) => {
  const options = {
    method: "GET",
    url: `${apiConfig.url}/events/${id}`,
  };
  try {
    const res = await axios(options);
    //console.log(id + " ", res)
    //console.log(res.data);
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
export const getEventLogin = async (id) => {
  const pulzion = JSON.parse(localStorage.getItem("pulzion"));
  const options = {
    method: "GET",
    url: `${apiConfig.url}/events/combo/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${pulzion.token}`,
    },
  };
  try {
    const res = await axios(options);
    //console.log(id + " ", res)
    //console.log(res.data);
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
export const getAllEvents = async () => {
  const options = {
    method: "GET",
    url: `${apiConfig.url}/events`,
  };
  try {
    const res = await axios(options);
    //console.log(res);
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

export const getRegisteredEvents = async (dispatchEvents) => {
  const pulzion = JSON.parse(localStorage.getItem("pulzion"));
  if (pulzion.type === "user") {
    const options = {
      method: "GET",
      url: `${apiConfig.url}/user_events`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${pulzion.token}`,
      },
    };
    try {
      const res = await axios(options);
      dispatchEvents({
        type: "SET_EVENTS",
        events: res.data.events,
      });
      return res.data;
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

export const registerEvent = async (formId, status) => {
  const pulzion = JSON.parse(localStorage.getItem("pulzion"));
  if (pulzion?.type === "admin") {
    const options = {
      method: "POST",
      url: `${apiConfig.url}/admin/eventRegister`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${pulzion.token}`,
      },
      data: {
        payment_form_id: formId,
        status: status,
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
  }
};

export const userRegisterEvent = async (event_id, dispatchEvents) => {
  const pulzion = JSON.parse(localStorage.getItem("pulzion"));
  if (pulzion?.type === "user") {
    const options = {
      method: "POST",
      url: `${apiConfig.url}/user_events`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${pulzion.token}`,
      },
      data: {
        event_id
      },
    };
    try {
      const res = await axios(options);
      if (!res.data?.error) {
        dispatchEvents({
          type: "ADD_EVENT",
          event: res.data.event
        })
      }
      return res.data;
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
