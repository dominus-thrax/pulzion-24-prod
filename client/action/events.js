import axios from "axios";
import apiConfig from "../configs/api";

export const adminAllEvents = async (dispatchEvents) => {
  const pulzion = JSON.parse(localStorage.getItem("pulzion"));
  if (pulzion?.type === "admin") {
    const options = {
      method: "GET",
      url: `${apiConfig.url}/events`,
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

export const createEvent = async (values, dispatchEvents) => {
  const pulzion = JSON.parse(localStorage.getItem("pulzion"));
  if (pulzion?.type === "admin") {
    const options = {
      method: "POST",
      url: `${apiConfig.url}/admin_events`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${pulzion.token}`,
      },
      data: {
        ...values,
        type: values.type.value,
        mode: values.mode.value,
      },
    };
    try {
      const res = await axios(options);
      dispatchEvents({
        type: "ADD_EVENT",
        event: res.data.event,
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

export const updateEvent = async (id, values, dispatchEvents) => {
  const pulzion = JSON.parse(localStorage.getItem("pulzion"));
  if (pulzion?.type === "admin") {
    const options = {
      method: "PUT",
      url: `${apiConfig.url}/admin_events/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${pulzion.token}`,
      },
      data: {
        ...values,
        type: values.type.value,
        mode: values.mode.value,
      },
    };
    try {
      const res = await axios(options);
      dispatchEvents({
        type: "UPDATE_EVENT",
        id,
        updates: res.data.event,
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

export const deleteEvent = async (id, dispatchEvents) => {
  const pulzion = JSON.parse(localStorage.getItem("pulzion"));
  if (pulzion?.type === "admin") {
    const options = {
      method: "DELETE",
      url: `${apiConfig.url}/admin_events/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${pulzion.token}`,
      },
    };
    try {
      const res = await axios(options);
      dispatchEvents({
        type: "REMOVE_EVENT",
        id,
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
