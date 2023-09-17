import axios from "axios";
import apiConfig from "../configs/api";

export const eventWiseMail = async (subject, htmlPart, event_id) => {
  
  const pulzion = JSON.parse(localStorage.getItem("pulzion"));
  if (pulzion?.type === "admin") {
    const options = {
      method: "POST",
      url: `${apiConfig.url}/admin_mail/sendEventwiseEmail/${event_id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${pulzion.token}`,
      },
      data: {
        subject: subject,
        htmlPart: htmlPart,
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
