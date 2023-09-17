import axios from 'axios';
import apiConfig from '../configs/api';

export const getAdminSlots = async (event_id) => {
  const options = {
    method: "GET",
    url: `${apiConfig.url}/slots?event_id=${event_id}`,
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

export const addSlots = async (values, event_id) => {
  const pulzion = JSON.parse(localStorage.getItem("pulzion"));
  if (pulzion?.type === 'admin') {
    const options = {
      method: "POST",
      url: `${apiConfig.url}/slots`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${pulzion.token}`,
      },
      data: {
        ...values,
        capacity: parseInt(values.capacity),
        fk_event: event_id
      }
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
  }
}

export const deleteSlot = async (id) => {
  const pulzion = JSON.parse(localStorage.getItem("pulzion"));
  if (pulzion?.type === 'admin') {
    const options = {
      method: "DELETE",
      url: `${apiConfig.url}/slots?slot_id=${id}`,
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
  }
}

export const getSlots = async (event_id) => {
  const pulzion = JSON.parse(localStorage.getItem("pulzion"));
  if (pulzion?.type === 'user') {
    const options = {
      method: "GET",
      url: `${apiConfig.url}/user_slots?event_id=${event_id}`,
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
  }
}


export const bookSlot = async (event_id, slot_id, dispatchEvents) => {
  const pulzion = JSON.parse(localStorage.getItem("pulzion"));
  if (pulzion?.type === 'user') {
    const options = {
      method: "POST",
      url: `${apiConfig.url}/user_slots`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${pulzion.token}`,
      },
      data: {
        event_id,
        slot_id
      }
    };
    try {
      const res = await axios(options);
      const data = res.data
      dispatchEvents({
        type: "UPDATE_EVENT",
        id: data?.id,
        updates: {
          fk_slot: data?.fk_slot,
          start_time: data?.start_time,
          end_time: data?.end_time
        }
      })
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
}