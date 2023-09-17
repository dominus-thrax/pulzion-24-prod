import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import AdminLayout from "../../Components/AdminLayout";
import privateAdminRoute from "../../routes/privateAdminRoute";
import { getRegestrations } from "../../action/dashboard";
import AppContext from "../../context/AppContext";
import PrimaryButton from "../../Components/Button/PrimaryButton";
import Select from "react-select";

const Registerations = () => {
  const [data, setData] = useState([]);

  const { contEvents } = useContext(AppContext);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    (async () => {
      const res = await getRegestrations();
      
      setData(res);
    })();
  }, []);
  const newFilters = [];
  contEvents.forEach((val) => {
    newFilters.push({
      value: val.name,
      label: val.name,
    });
  });
  const options = newFilters;
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
      if (!val.slot_id) {
        val.slot_id = "NA";
        val.start_time = "NA";
        val.end_time = "NA";
      }
      let propertiesArray = Object.values(val);
      combinedData += propertiesArray.join(",") + "\r\n";
    });
    return combinedData;
  };
  const visible = data.filter((item) =>
    filter?.value ? filter.value === item.name : true
  );
  const handleCSVDownload = (e) => {
    var link = document.createElement("a");
    let d = getFormatedArray(visible);
    var encodedUri = encodeURI(d);
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "subscribers.csv");
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
                value={filter}
                onChange={handleSingleChange}
              />
              <PrimaryButton handleClick={handleCSVDownload}>
                Export CSV
              </PrimaryButton>
            </div>
            <table className="min-w-full border-2 border-gray-900">
              <tr>
                <th className="px-2 py-2 text-base text-center border-2 border-gray-900">
                  User Id
                </th>
                <th className="px-2 py-2 text-base text-center border-2 border-gray-900">
                  Event ID
                </th>
                <th className="px-2 py-2 text-base text-center border-2 border-gray-900">
                  Slot ID
                </th>
                <th className="px-2 py-2 text-base text-center border-2 border-gray-900">
                  Event Name
                </th>
                <th className="px-2 py-2 text-base text-center border-2 border-gray-900">
                  First Name
                </th>
                <th className="px-2 py-2 text-base text-center border-2 border-gray-900">
                  Last Name
                </th>
                <th className="px-2 py-2 text-base text-center border-2 border-gray-900">
                  Email
                </th>
                <th className="px-2 py-2 text-base text-center border-2 border-gray-900">
                  Phone
                </th>
                <th className="px-2 py-2 text-base text-center border-2 border-gray-900">
                  Country
                </th>
                <th className="px-2 py-2 text-base text-center border-2 border-gray-900">
                  Event type
                </th>
                <th className="px-2 py-2 text-base text-center border-2 border-gray-900">
                  Start Date & Time
                </th>
                <th className="px-2 py-2 text-base text-center border-2 border-gray-900">
                  End Date & Time
                </th>
              </tr>
              {visible &&
                visible.map((val, idx) => (
                  <tr key={idx}>
                    <td className="px-2 py-2 text-base text-center border-2 border-gray-900">
                      {val.user_id}
                    </td>
                    <td className="px-2 py-2 text-base text-center border-2 border-gray-900">
                      {val.event_id}
                    </td>
                    <td className="px-2 py-2 text-base text-center border-2 border-gray-900">
                      {val.slot_id ? val.slot_id : "NA"}
                    </td>
                    <td className="px-2 py-2 text-base text-center border-2 border-gray-900">
                      {val.name}
                    </td>
                    <td className="px-2 py-2 text-base text-center border-2 border-gray-900">
                      {val.first_name}
                    </td>
                    <td className="px-2 py-2 text-base text-center border-2 border-gray-900">
                      {val.last_name}
                    </td>
                    <td className="px-2 py-2 text-base text-center border-2 border-gray-900">
                      {val.email}
                    </td>
                    <td className="px-2 py-2 text-base text-center border-2 border-gray-900">
                      {val.mobile_number}
                    </td>
                    <td className="px-2 py-2 text-base text-center border-2 border-gray-900">
                      {val.country}
                    </td>
                    <td className="px-2 py-2 text-base text-center border-2 border-gray-900">
                      {val.type}
                    </td>
                    <td className="px-2 py-2 text-base text-center border-2 border-gray-900">
                      {val.start_time
                        ? new Date(val.start_time).toLocaleString()
                        : "NA"}
                    </td>
                    <td className="px-2 py-2 text-base text-center border-2 border-gray-900">
                      {val.end_time
                        ? new Date(val.end_time).toLocaleString()
                        : "NA"}
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

export default privateAdminRoute(Registerations);
