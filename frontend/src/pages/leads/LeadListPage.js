import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import API from "../../services/api";
import DashboardLayout from "../../layouts/DashboardLayout";

import "./leads.css";

export default function LeadListPage() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  useEffect(() => {
    const delay = setTimeout(() => {
      API.get(`/leads?search=${search}&status=${status}`).then((res) => {
        setLeads(res.data);
      });
    }, search || status ? 400 : 0);

    return () => clearTimeout(delay);
  }, [search, status]);

  const deleteLead = async (id) => {
    if (!window.confirm("Delete Lead?")) return;

    await API.delete(`/leads/${id}`);
    const res = await API.get(`/leads?search=${search}&status=${status}`);
    setLeads(res.data);
  };

  return (
    <DashboardLayout>
      <div className="lead-list-header">
        <div>
          <h1 className="crm-page-title">Leads</h1>
          <p className="crm-page-subtitle">Search, filter, and manage every prospect in the funnel.</p>
        </div>

        <Link to="/add-lead" className="crm-button-primary">
          Add Lead
        </Link>
      </div>

      <section className="crm-panel lead-filter-panel">
        <div className="grid gap-4 md:grid-cols-2">
          <input
            className="crm-input"
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select className="crm-select" onChange={(e) => setStatus(e.target.value)}>
            <option value="">All Status</option>
            <option value="new">New</option>
            <option value="qualified">Qualified</option>
            <option value="lost">Lost</option>
          </select>
        </div>
      </section>

      <div className="lead-grid">
        {leads.map((l) => (
          <article className="crm-card lead-card" key={l._id}>
            <h2 className="lead-card__title">{l.name}</h2>
            <p className="lead-card__company">{l.company || "No company added"}</p>
            <span className="crm-badge bg-brand-50 text-brand-700">{l.status || "new"}</span>

            <div className="lead-card__actions">
              <Link to={`/lead/${l._id}`} className="crm-button-secondary">
                View
              </Link>

              <Link to={`/edit-lead/${l._id}`} className="crm-button-neutral">
                Edit
              </Link>

              <button className="crm-button-danger" onClick={() => deleteLead(l._id)}>
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </DashboardLayout>
  );
}
