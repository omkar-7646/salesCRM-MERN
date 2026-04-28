import { useEffect, useState } from "react";

import API from "../../services/api";
import DashboardLayout from "../../layouts/DashboardLayout";

import "./deals.css";

export default function DealsPage() {
  const [deals, setDeals] = useState([]);

  const fetchDeals = () => {
    API.get("/deals")
      .then((res) => {
        setDeals(res.data);
      })
      .catch(() => {
        alert("Failed Loading Deals");
      });
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  const updateStage = async (id, stage) => {
    await API.put(`/deals/${id}`, { stage });
    fetchDeals();
  };

  const deleteDeal = async (id) => {
    if (!window.confirm("Delete Deal ?")) return;

    await API.delete(`/deals/${id}`);
    fetchDeals();
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="crm-page-title">Deals Pipeline</h1>
        <p className="crm-page-subtitle">
          Monitor active opportunities and update deal stages quickly.
        </p>
      </div>

      <div className="deal-grid">
        {deals.length === 0 ? (
          <div className="crm-empty">No deals available.</div>
        ) : (
          deals.map((d) => (
            <article className="crm-card deal-card" key={d._id}>
              <h2 className="deal-card__title">{d.title}</h2>
              <p className="deal-card__amount">Amount: Rs {d.amount}</p>

              <label className="crm-label">Deal Stage</label>
              <select
                value={d.stage}
                className="crm-select"
                onChange={(e) => updateStage(d._id, e.target.value)}>
                <option>Prospect</option>
                <option>Negotiation</option>
                <option>Won</option>
                <option>Lost</option>
              </select>

              <button className="crm-button-danger mt-4 w-full" onClick={() => deleteDeal(d._id)}>
                Delete Deal
              </button>
            </article>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}
