import { useEffect, useState } from "react";

import API from "../services/api";

import DashboardLayout from "../layouts/DashboardLayout";

import "./dashboard.css";

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
      <section className="dashboard-hero crm-panel">
        <div>
          <p className="dashboard-hero__eyebrow">Performance overview</p>
          <h1 className="crm-page-title">{user?.name || "User"}&apos;s workspace</h1>
          <p className="crm-page-subtitle">
            You are signed in as <span className="font-semibold text-brand-100">{user?.role}</span>.
          </p>
        </div>

        <span className="crm-badge bg-white/80 text-brand-700">Standard CRM</span>
      </section>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <div className="dashboard-stat dashboard-stat-leads">
          <p className="dashboard-stat__label">Total Leads</p>
          <h2 className="dashboard-stat__value">{leadCount}</h2>
        </div>

        <div className="dashboard-stat dashboard-stat-deals">
          <p className="dashboard-stat__label">Deals Pipeline</p>
          <h2 className="dashboard-stat__value">{dealCount}</h2>
        </div>

        <div className="dashboard-stat dashboard-stat-activities">
          <p className="dashboard-stat__label">Activities</p>
          <h2 className="dashboard-stat__value">{activityCount}</h2>
        </div>
      </div>
    </DashboardLayout>
  );
}
