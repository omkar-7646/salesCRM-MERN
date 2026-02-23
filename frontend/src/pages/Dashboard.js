import { useEffect, useState } from "react";

import API from "../services/api";

import DashboardLayout from "../layouts/DashboardLayout";

export default function Dashboard() {
  const [leadCount, setLeadCount] = useState(0);

  const [dealCount, setDealCount] = useState(0);

  const [activityCount, setActivityCount] = useState(0);

  // FETCH DATA

  useEffect(() => {
    // Leads

    API.get("/leads")

      .then((res) => {
        setLeadCount(res.data.length);
      });

    // Deals

    API.get("/deals")

      .then((res) => {
        setDealCount(res.data.length);
      })

      .catch(() => {});

    // Activities

    API.get("/activities")

      .then((res) => {
        setActivityCount(res.data.length);
      })

      .catch(() => {});
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <DashboardLayout>
      <h3>
        Welcome {user?.name}({user?.role})
      </h3>

      <div className="row mt-4">
        {/* TOTAL LEADS */}

        <div className="col-md-4">
          <div className="card bg-success text-white p-4 shadow">
            <h5>Total Leads</h5>

            <h2>{leadCount}</h2>
          </div>
        </div>

        {/* DEALS */}

        <div className="col-md-4">
          <div className="card bg-warning p-4 shadow">
            <h5>Deals Pipeline</h5>

            <h2>{dealCount}</h2>
          </div>
        </div>

        {/* ACTIVITIES */}

        <div className="col-md-4">
          <div className="card bg-info text-white p-4 shadow">
            <h5>Activities</h5>

            <h2>{activityCount}</h2>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
