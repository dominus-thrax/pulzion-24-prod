import React, { useContext, useState } from "react";
import Head from "next/head";
import { toast } from "react-toastify";
import privateAdminRoute from "../../routes/privateAdminRoute";
import AdminLayout from "../../Components/AdminLayout";
import { registerEvent } from "../../action/registeration";

const Register = () => {
  const [formId, setFormId] = useState();
  const [status, setStatus] = useState("");

  function onchange(e) {
    if (e.target.id === "form_id") {
      setFormId(e.target.value);
    }
    if (e.target.id === "status") {
      setStatus(e.target.value);
    }
  }

  async function submitEvent(e) {
    e.preventDefault();
    try {
      const data = await registerEvent(formId, status);
      if (data?.error) {
        toast.error(data.error);
        return;
      }
      toast.success(data.msg);
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
            <label htmlFor="form_id" className="text-white">
              Form Id
            </label>
            <input
              id="form_id"
              type={"number"}
              placeholder={"Form Id"}
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
            {formId === undefined || formId === null ? (
              <div className="text-red-500">Form Id cannot be empty</div>
            ) : null}

            <label
              className="block text-lg font-bold text-primaries-100"
              htmlFor="status"
            >
              status
            </label>
            <select
              id="status"
              name="status"
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
              <option value="">Select Status</option>
              <option value="accepted">accepted</option>
              <option value="rejected">rejected</option>
            </select>
            {status === "" ? (
              <div className="text-red-500">Status cannot be empty</div>
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

export default privateAdminRoute(Register);
