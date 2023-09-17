import React, { useEffect, useState } from "react";
import Head from "next/head";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import AdminLayout from "../../Components/AdminLayout";
import privateAdminRoute from "../../routes/privateAdminRoute";
import { getCount } from "../../action/dashboard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [count, setCount] = useState({});
  const [eventCount, setEventCount] = useState({
    labels: [],
    counts: [],
    colors: [],
  });
  useEffect(() => {
    (async () => {
      const { categorised, eventCount } = await getCount();
      setCount({
        technical: categorised[0].count,
        nonTechnical: categorised[1].count,
      });
      const labels = [];
      const counts = [];
      const colors = [];
      eventCount.forEach((val, idx) => {
        labels.push(val.name);
        counts.push(val.count);
        let n = (Math.random() * 0xfffff * 1000000).toString(16);
        colors.push("#" + n.slice(0, 6));
      });
      setEventCount({
        ...eventCount,
        labels,
        counts,
        colors,
      });
    })();
  }, []);
  return (
    <AdminLayout>
      <Head>
        <title>Pulzion'23 | Admin</title>
      </Head>
      <div className="py-8">
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-primaries-800 rounded-xl shadow-md flex flex-col gap-2 items-center py-5 px-4">
            <p className="text-primaries-100 font-bold text-4xl tracking-wide text-center">
              {parseInt(count.technical) + parseInt(count.nonTechnical)}
            </p>
            <p className="text-primaries-100 font-bold text-xl tracking-wider text-center">
              Total
            </p>
          </div>
          <div className="bg-primaries-800 rounded-xl shadow-md flex flex-col gap-2 items-center py-5 px-4">
            <p className="text-primaries-100 font-bold text-4xl tracking-wide text-center">
              {count.technical}
            </p>
            <p className="text-primaries-100 font-bold text-xl tracking-wider text-center">
              Technical Events
            </p>
          </div>
          <div className="bg-primaries-800 rounded-xl shadow-md flex flex-col gap-2 items-center py-5 px-4">
            <p className="text-primaries-100 font-bold text-4xl tracking-wide text-center">
              {count.nonTechnical}
            </p>
            <p className="text-primaries-100 font-bold text-xl tracking-wider text-center">
              Non Technical Events
            </p>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="p-4 bg-primaries-800 rounded-xl col-span-8">
            <Line
              datasetIdKey="id"
              data={{
                labels: ["Mar 25", "Mar 26", "Mar 27", "Mar 28", "Mar 29"],
                datasets: [
                  {
                    label: "Registerations",
                    backgroundColor: "#46526d",
                    borderColor: "#46526d",
                    data: [0, 10, 5, 30, 50],
                  },
                ],
              }}
            />
          </div>
          <div className="p-4 bg-primaries-800 rounded-xl col-span-4">
            <Doughnut
              datasetIdKey="id"
              data={{
                labels: eventCount.labels,
                datasets: [
                  {
                    label: "Registerations",
                    data: eventCount.counts,
                    backgroundColor: eventCount.colors,
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default privateAdminRoute(Dashboard);
