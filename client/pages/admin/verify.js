import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import AdminLayout from "../../Components/AdminLayout";
import privateAdminRoute from "../../routes/privateAdminRoute";
import AppContext from "../../context/AppContext";
import PrimaryButton from "../../Components/Button/PrimaryButton";
import Select from "react-select";
import { getPaymentDetails } from "../../action/paymentForm";

const VerifyPayments = () => {
  const [data, setData] = useState([]);

  const { contEvents } = useContext(AppContext);
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState([{}]);

  useEffect(() => {
    (async () => {
      const res = await getPaymentDetails();
      setData(res);
    })();
  }, []);

  const options = [
    { value: "accepted", label: "accepted" },
    { value: "pending", label: "pending" },
    { value: "rejected", label: "rejected" },
  ];
  const handleSingleChange = (selectedOption) => {
    setFilter(selectedOption);
  };
  const getFormatedArray = (arr) => {
    let cols = Object.keys(arr[0]);
    cols.shift();
    cols = cols.join(", ");

    let combinedData = `data:text/csv;charset=utf-8, ${cols}, \r\n`;
    // let combinedData =
    //   "data:text/csv;charset=utf-8, User Id, Event ID, Slot ID, Event Name, First Name, Last Name, Email, Phone, Event type, Start Date & Time, End Date & Time, \r\n";

    arr.forEach((val, idx) => {
      delete val.id;
      let propertiesArray = Object.values(val);
      combinedData += propertiesArray.join(",") + "\r\n";
    });
    return combinedData;
  };
  const visible = data.filter((item) =>
    filter?.value ? filter.value === item.status : true
  );
  const handleCSVDownload = (e) => {
    var link = document.createElement("a");
    let d = getFormatedArray(visible);
    var encodedUri = encodeURI(d);
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "register.csv");
    document.body.appendChild(link);
    link.click();
  };

 

  return (
    <AdminLayout>
      <Head>
        <title>Pulzion'23 | Admin</title>
      </Head>
      <div>
        <div className="grid">
          <div className="w-full px-4 py-4 mt-5 overflow-x-auto bg-primaries-800 text-primaries-100">
            <div className="flex justify-between mb-5">
              <Select
                options={options}
                className="w-60 text-primaries-700"
                onChange={handleSingleChange}
              />
              <PrimaryButton handleClick={handleCSVDownload}>
                Export CSV
              </PrimaryButton>
            </div>
            <table className="min-w-full border-2 border-gray-900">
              <tr>
                <th className="px-2 py-2 text-base text-center border-2 border-gray-900">
                  Form Id
                </th>
                <th className="px-2 py-2 text-base text-center border-2 border-gray-900">
                  User Id
                </th>
                <th className="px-2 py-2 text-base text-center border-2 border-gray-900">
                  Event IDS
                </th>
                <th className="px-2 py-2 text-base text-center border-2 border-gray-900">
                  Transaction ID
                </th>
                <th className="px-2 py-2 text-base text-center border-2 border-gray-900">
                  status
                </th>
                <th className="px-2 py-2 text-base text-center border-2 border-gray-900">
                  amount
                </th>
                <th className="px-2 py-2 text-base text-center border-2 border-gray-900">
                  Name
                </th>
                <th className="px-2 py-2 text-base text-center border-2 border-gray-900">
                  Email
                </th>
                <th className="px-2 py-2 text-base text-center border-2 border-gray-900">
                  Referal
                </th>
                <th className="px-2 py-2 text-base text-center border-2 border-gray-900">
                  Contact No
                </th>
              </tr>
              {visible &&
                visible.map((val, idx) => (
                  <tr key={idx}>
                    <td className="px-2 py-2 text-base text-center border-2 border-gray-900">
                      {val.id}
                    </td>
                    <td className="px-2 py-2 text-base text-center border-2 border-gray-900">
                      {val.user_id}
                    </td>
                    <td className="px-2 py-2 text-base text-center border-2 border-gray-900">
                      {val.event_id?.map((item) => (
                        <span key={item.toString()}>{item}, </span>
                      ))}
                    </td>
                    <td className="px-2 py-2 text-base text-center border-2 border-gray-900">
                      {val.transaction_id}
                    </td>
                    <td className="px-2 py-2 text-base text-center border-2 border-gray-900">
                      {val.status}
                    </td>
                    <td className="px-2 py-2 text-base text-center border-2 border-gray-900">
                      {val.amount}
                    </td>
                    <td className="px-2 py-2 text-base text-center border-2 border-gray-900">
                      {val.first_name + " " + val.last_name}
                    </td>
                    <td className="px-2 py-2 text-base text-center border-2 border-gray-900">
                      {val.email}
                    </td>
                    <td className="px-2 py-2 text-base text-center border-2 border-gray-900">
                      {val.referal_code}
                    </td>
                    <td className="px-2 py-2 text-base text-center border-2 border-gray-900">
                      {val.mobile_number}
                    </td>
                  </tr>
                ))}
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default privateAdminRoute(VerifyPayments);
