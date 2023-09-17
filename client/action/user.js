import axios from "axios";
import apiConfig from "../configs/api";
import { adminAllEvents } from "./events";
import { getRegisteredEvents } from "./registeration";

export const userRegister = async (values, dispatchUser) => {
  const data = values;
  const options = {
    method: "POST",
    url: `${apiConfig.url}/user/signup`,
    headers: {
      "Content-Type": "application/json",
    },
    data,
  };
  try {
    const res = await axios(options);
    localStorage.setItem(
      "pulzion",
      JSON.stringify({ token: res.data.token, type: "user" })
    );
    dispatchUser({
      type: "SET_USER",
      user: {
        ...res.data.user,
        type: "user",
      },
    });
    return res.data.user;
  } catch (e) {
    
    if (e?.response) {
      return e?.response?.data;
    }
    return {
      error: "Something Went Wrong",
    };
  }
};

export const sendOTP = async (email) => {
  const options = {
    method: "POST",
    url: `${apiConfig.url}/user/otp`,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      email,
    },
  };
  try {
    const res = await axios(options);
    return res.data;
  } catch (e) {
    
    if (e?.response) {
      return e?.response?.data;
    }
    return {
      error: "Something Went Wrong",
    };
  }
};

export const forgetPassword = async (values) => {
  const options = {
    method: "POST",
    url: `${apiConfig.url}/user/forget`,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      ...values,
      otp: parseInt(values.otp),
    },
  };
  try {
    const res = await axios(options);
    return res.data;
  } catch (e) {
    
    if (e?.response) {
      return e?.response?.data;
    }
    return {
      error: "Something Went Wrong",
    };
  }
};

export const userLogin = async (values, type, dispatchUser, dispatchEvents) => {
  const options = {
    method: "POST",
    url: `${apiConfig.url}/${type}/signin`,
    headers: {
      "Content-Type": "application/json",
    },
    data: values,
  };
  try {
    const res = await axios(options);
    localStorage.setItem(
      "pulzion",
      JSON.stringify({ token: res.data.token, type })
    );
    dispatchUser({
      type: "SET_USER",
      user: {
        ...res.data[type],
        type,
      },
    });
    if (type === "admin") {
      adminAllEvents(dispatchEvents);
    } else {
      getRegisteredEvents(dispatchEvents);
    }
    return res.data[type];
  } catch (e) {
    
    if (e?.response) {
      return e?.response?.data;
    }
    return {
      error: "Something Went Wrong",
    };
  }
};

export const loadUser = async (dispatchUser, dispatchEvents) => {
  const pulzion = JSON.parse(localStorage.getItem("pulzion"));
  if (pulzion) {
    const options = {
      method: "GET",
      url: `${apiConfig.url}/${pulzion.type}/me`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${pulzion.token}`,
      },
    };
    try {
      const res = await axios(options);
      dispatchUser({
        type: "SET_USER",
        user: {
          ...res.data[pulzion.type],
          type: pulzion.type,
        },
      });
      if (pulzion.type === "admin") {
        adminAllEvents(dispatchEvents);
      } else {
        getRegisteredEvents(dispatchEvents);
      }
      return {
        ...res.data[pulzion.type],
        type: pulzion.type,
      };
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

export const logout = async (dispatchUser, dispatchEvents) => {
  const pulzion = JSON.parse(localStorage.getItem("pulzion"));
  if (pulzion) {
    const options = {
      method: "POST",
      url: `${apiConfig.url}/${pulzion.type}/signout`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${pulzion.token}`,
      },
    };
    try {
      const res = await axios(options);
      localStorage.removeItem("pulzion");
      localStorage.removeItem("pulzionEvents");
      dispatchUser({
        type: "RESET_USER",
      });
      dispatchEvents({
        type: "RESET_EVENTS",
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
