import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import API from "../../services/api";
import DashboardLayout from "../../layouts/DashboardLayout";

import "./leads.css";

export default function LeadDetailPage() {
  const { id } = useParams();

  const [lead, setLead] = useState(null);
  const [deals, setDeals] = useState([]);
  const [activities, setActivities] = useState([]);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [stage, setStage] = useState("Prospect");

  const [type, setType] = useState("call");
  const [description, setDescription] = useState("");

  // This page should reload its related records only when the route id changes.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const loadPage = async () => {
      const [leadRes, dealsRes, activitiesRes] = await Promise.all([
        API.get(`/leads/${id}`),
        API.get(`/deals?leadId=${id}`),
        API.get(`/activities?leadId=${id}`),
      ]);

      setLead(leadRes.data);
      setDeals(dealsRes.data);
      setActivities(activitiesRes.data);
    };

    loadPage();
  }, [id]);

  const fetchDeals = () => {
    API.get(`/deals?leadId=${id}`).then((res) => {
      setDeals(res.data);
    });
  };

  const createDeal = async (e) => {
    e.preventDefault();

    await API.post("/deals", {
      leadId: id,
      title,
      amount,
      stage,
    });

    setTitle("");
    setAmount("");
    setStage("Prospect");
    fetchDeals();
  };

  const updateStage = async (dealId, newStage) => {
    await API.put(`/deals/${dealId}`, { stage: newStage });
    fetchDeals();
  };

  const deleteDeal = async (dealId) => {
    await API.delete(`/deals/${dealId}`);
    fetchDeals();
  };

  const fetchActivities = () => {
    API.get(`/activities?leadId=${id}`).then((res) => {
      setActivities(res.data);
    });
  };

  const createActivity = async (e) => {
    e.preventDefault();

    await API.post("/activities", {
      leadId: id,
      type,
      description,
    });

    setDescription("");
    fetchActivities();
  };

  const deleteActivity = async (aid) => {
    await API.delete(`/activities/${aid}`);
    fetchActivities();
  };

  if (!lead) {
    return (
      <DashboardLayout>
        <div className="crm-empty">Loading lead details...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="crm-page-title">Lead Details</h1>
        <p className="crm-page-subtitle">Review this lead, create deals, and log follow-up activity.</p>
      </div>

      <section className="crm-panel lead-detail-summary">
        <div>
          <p className="lead-detail-summary__label">Lead Name</p>
          <h2 className="lead-detail-summary__title">{lead.name}</h2>
        </div>

        <div className="lead-detail-summary__grid">
          <p>Email: {lead.email || "-"}</p>
          <p>Phone: {lead.phone || "-"}</p>
          <p>Company: {lead.company || "-"}</p>
          <p>Status: {lead.status}</p>
        </div>
      </section>

      <div className="lead-detail-grid">
        <section className="crm-panel lead-detail-panel">
          <h3 className="lead-section-title">Create Deal</h3>

          <form className="space-y-4" onSubmit={createDeal}>
            <input
              className="crm-input"
              placeholder="Deal Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="crm-input"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <select className="crm-select" value={stage} onChange={(e) => setStage(e.target.value)}>
              <option>Prospect</option>
              <option>Negotiation</option>
              <option>Won</option>
              <option>Lost</option>
            </select>

            <button className="crm-button-primary" type="submit">
              Create Deal
            </button>
          </form>

          <div className="mt-8 space-y-3">
            <h4 className="lead-section-subtitle">Deals</h4>
            {deals.length === 0 ? (
              <div className="crm-empty">No deals yet.</div>
            ) : (
              deals.map((d) => (
                <article key={d._id} className="crm-card lead-detail-card">
                  <h5 className="font-semibold text-slate-900">{d.title}</h5>
                  <p className="text-sm text-slate-500">Amount: Rs {d.amount}</p>
                  <select
                    value={d.stage}
                    className="crm-select mt-3"
                    onChange={(e) => updateStage(d._id, e.target.value)}>
                    <option>Prospect</option>
                    <option>Negotiation</option>
                    <option>Won</option>
                    <option>Lost</option>
                  </select>
                  <button className="crm-button-danger mt-3" onClick={() => deleteDeal(d._id)}>
                    Delete Deal
                  </button>
                </article>
              ))
            )}
          </div>
        </section>

        <section className="crm-panel lead-detail-panel">
          <h3 className="lead-section-title">Log Activity</h3>

          <form className="space-y-4" onSubmit={createActivity}>
            <select className="crm-select" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="call">Call</option>
              <option value="meeting">Meeting</option>
              <option value="note">Note</option>
              <option value="followup">Follow-up</option>
            </select>

            <textarea
              className="crm-textarea"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button className="crm-button-primary" type="submit">
              Add Activity
            </button>
          </form>

          <div className="mt-8 space-y-3">
            <h4 className="lead-section-subtitle">Activity History</h4>
            {activities.length === 0 ? (
              <div className="crm-empty">No activity yet.</div>
            ) : (
              activities.map((a) => (
                <article key={a._id} className="crm-card lead-detail-card">
                  <span className="crm-badge bg-brand-50 text-brand-700">{a.type}</span>
                  <p className="mt-3 text-sm text-slate-600">{a.description}</p>
                  <p className="mt-2 text-xs text-slate-500">By: {a.createdBy?.name || "Unknown"}</p>
                  <button className="crm-button-danger mt-3" onClick={() => deleteActivity(a._id)}>
                    Delete
                  </button>
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
