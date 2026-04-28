import { useEffect, useState } from "react";

import API from "../../services/api";
import DashboardLayout from "../../layouts/DashboardLayout";

import "./activities.css";

export default function ActivitiesPage() {
  const [activities, setActivities] = useState([]);

  const fetchActivities = () => {
    API.get("/activities")
      .then((res) => {
        setActivities(res.data);
      })
      .catch(() => {
        alert("Failed loading activities");
      });
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const deleteActivity = async (id) => {
    if (!window.confirm("Delete Activity ?")) return;

    await API.delete(`/activities/${id}`);
    fetchActivities();
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="crm-page-title">Activity History</h1>
        <p className="crm-page-subtitle">
          Recent calls, meetings, notes, and follow-ups across the CRM.
        </p>
      </div>

      <div className="activity-grid">
        {activities.length === 0 ? (
          <div className="crm-empty">No activities found.</div>
        ) : (
          activities.map((a) => (
            <article className="crm-card activity-card" key={a._id}>
              <div className="activity-card__header">
                <span className="crm-badge bg-brand-50 text-brand-700">{a.type}</span>
              </div>

              <h2 className="activity-card__title">{a.description}</h2>
              <p className="activity-card__meta">Lead: {a.leadId?.name || "Lead"}</p>
              <p className="activity-card__meta">By: {a.createdBy?.name || "Unknown"}</p>

              <button className="crm-button-danger mt-4 w-full" onClick={() => deleteActivity(a._id)}>
                Delete
              </button>
            </article>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}
