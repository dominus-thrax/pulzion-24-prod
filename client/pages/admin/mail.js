import React, { useContext, useState } from "react";
import Head from "next/head";
import { toast } from "react-toastify";
import privateAdminRoute from "../../routes/privateAdminRoute";
import AdminLayout from "../../Components/AdminLayout";
import { eventWiseMail } from "../../action/adminMailing";

const Mail = () => {
  const [subject, setSubject] = useState("");
  const [event, setEvent] = useState("");
  const [htmlPart, setHtmlPart] = useState("");

  function onchange(e) {
    if (e.target.id === "subject") {
      setSubject(e.target.value);
    }
    if (e.target.id === "event_id") {
      setEvent(e.target.value);
    }
    if (e.target.id === "htmlPart") {
      setHtmlPart(e.target.value);
    }
  }

  async function submitEvent(e) {
    e.preventDefault();
    try {
      const data = await eventWiseMail(subject, htmlPart, event);
      
      if (data?.error) {
        toast.error(data?.error);
        return;
      }
      toast.success(data?.msg);
    } catch (e) {
      toast.error("Something went wrong");
    }
  }

  return (
    <AdminLayout>
      <Head>
        <title>Pulzion'23 | Admin</title>
      </Head>
      <div>
        <form>
          <div className="flex flex-col gap-4">
            <label htmlFor="subject" className="text-white">
              Subject of mail
            </label>
            <input
              id="subject"
              type={"string"}
              placeholder={"Subject"}
              className="block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    bg-primaries-700 
                    text-primaries-100 
                    bg-clip-padding bg-no-repeat
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-primaries-100 focus:bg-primaries-700 focus:border-blue-600 focus:outline-none"
              onChange={onchange}
              required={true}
            />
            {subject === undefined || subject === null ? (
              <div className="text-red-500">Form Id cannot be empty</div>
            ) : null}

            <label htmlFor="subject" className="text-white">
              Html Part of mail
            </label>
            <input
              id="htmlPart"
              type={"string"}
              placeholder={"Html Part"}
              className="block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    bg-primaries-700 
                    text-primaries-100 
                    bg-clip-padding bg-no-repeat
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-primaries-100 focus:bg-primaries-700 focus:border-blue-600 focus:outline-none"
              onChange={onchange}
              required={true}
            />
            {htmlPart === undefined || htmlPart === null ? (
              <div className="text-red-500">Html Part cannot be empty</div>
            ) : null}

            <label
              className="block text-lg font-bold text-primaries-100"
              htmlFor="event_id"
            >
              Event
            </label>
            <select
              id="event_id"
              name="event_id"
              className="form-select appearance-none
                    block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    bg-primaries-700 
                    text-primaries-100 
                    bg-clip-padding bg-no-repeat
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-primaries-100 focus:bg-primaries-700 focus:border-blue-600 focus:outline-none"
              aria-label="Default select example"
              onChange={onchange}
            >
              <option value="0">Select Status</option>
              <option value="1">Codelicious</option>
              <option value="2">Compute & Compete</option>
              <option value="3">Bug Off</option>
              <option value="4">Hire Hustle</option>
              <option value="5">CodeX</option>
              <option value="6">Web + App Dev</option>
              <option value="7">DataQuest</option>
              <option value="8">ElectroQuest</option>
              <option value="9">Dextrous</option>
              <option value="10">Fandom (Western OTTs + Sidcoms)</option>
              <option value="11">Fandom Anime</option>
              <option value="12">Fandom (Marvel)</option>
              <option value="13">Fandom (Indian OTTs)</option>
              <option value="14">Paper presentation</option>
              <option value="15">Insight</option>
              <option value="16">Photoshop Royale</option>
              <option value="18">Freeze The Second</option>
            </select>
            {event === "" ? (
              <div className="text-red-500">Event cannot be empty</div>
            ) : null}

            <br></br>
            <button
              onClick={async (e) => {
                await submitEvent(e);
              }}
              className="float-right px-4 py-2 w-[55%] text-center border-2 border-primaries-500 text-primaries-100 rounded-xl"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default privateAdminRoute(Mail);
