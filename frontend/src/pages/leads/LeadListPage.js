import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import API from "../../services/api";
import DashboardLayout from "../../layouts/DashboardLayout";

import "./leads.css";

export default function LeadListPage() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [sortBy, setSortBy] = useState("fresh");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [newLead, setNewLead] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const fetchLeads = useCallback(async () => {
    const res = await API.get(`/leads?search=${search}&status=${status}`);
    setLeads(res.data);
  }, [search, status]);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchLeads();
    }, search || status ? 400 : 0);

    return () => clearTimeout(delay);
  }, [fetchLeads, search, status]);

  const deleteLead = async (id) => {
    if (!window.confirm("Delete Lead?")) return;

    await API.delete(`/leads/${id}`);
    fetchLeads();
  };

  const closeAddLead = () => {
    setIsAddLeadOpen(false);
    setNewLead({
      name: "",
      email: "",
      phone: "",
      company: "",
    });
  };

  const updateNewLead = (field, value) => {
    setNewLead((lead) => ({
      ...lead,
      [field]: value,
    }));
  };

  const createLead = async (e) => {
    e.preventDefault();

    await API.post("/leads", newLead);
    await fetchLeads();
    closeAddLead();
  };

  const sortLabel = {
    fresh: "Fresh first",
    old: "Old first",
    status: "Status",
  }[sortBy];

  const filterLabel = status ? status.charAt(0).toUpperCase() + status.slice(1) : "All";
  const filterOptions = [
    { label: "All", value: "" },
    { label: "New", value: "new" },
    { label: "Qualified", value: "qualified" },
    { label: "Lost", value: "lost" },
  ];
  const sortOptions = [
    { label: "Fresh first", value: "fresh" },
    { label: "Old first", value: "old" },
    { label: "Status", value: "status" },
  ];

  const sortedLeads = useMemo(() => {
    const statusOrder = {
      new: 1,
      qualified: 2,
      lost: 3,
    };

    return [...leads].sort((firstLead, secondLead) => {
      if (sortBy === "old") {
        return new Date(firstLead.createdAt || 0) - new Date(secondLead.createdAt || 0);
      }

      if (sortBy === "status") {
        const firstStatus = firstLead.status || "new";
        const secondStatus = secondLead.status || "new";
        const statusDiff = (statusOrder[firstStatus] || 99) - (statusOrder[secondStatus] || 99);

        if (statusDiff !== 0) {
          return statusDiff;
        }

        return firstLead.name.localeCompare(secondLead.name);
      }

      return new Date(secondLead.createdAt || 0) - new Date(firstLead.createdAt || 0);
    });
  }, [leads, sortBy]);

  return (
    <DashboardLayout>
      <div className="lead-list-header">
        <div>
          <h1 className="crm-page-title">Leads</h1>
          <p className="crm-page-subtitle">Search, filter, and manage every prospect in the funnel.</p>
        </div>

        <button className="crm-button-primary" type="button" onClick={() => setIsAddLeadOpen(true)}>
          Add Lead
        </button>
      </div>

      <section className="lead-list-controls">
        <div className="crm-panel lead-filter-panel">
          <label className="lead-search-field">
            <input
              className="crm-input"
              placeholder="Search leads..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="lead-search-icon" aria-hidden="true" />
          </label>
        </div>

        <div className="lead-list-toolbar">
          {status && (
            <button className="lead-clear-filter" type="button" onClick={() => setStatus("")}>
              Clear filters
            </button>
          )}

          <div className="lead-sort-menu">
            <button
              className="lead-sort-trigger"
              type="button"
              onClick={() => {
                setIsFilterOpen((open) => !open);
                setIsSortOpen(false);
              }}>
              <span>Filter</span>
              <span className="lead-sort-trigger__value">{filterLabel}</span>
              <span className="lead-filter-icon" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
            </button>

            {isFilterOpen && (
              <div className="lead-sort-popover">
                <p className="lead-sort-popover__title">Filters</p>
                <div className="lead-option-list">
                  {filterOptions.map((option) => (
                    <button
                      className={`lead-option-item ${status === option.value ? "lead-option-item--active" : ""}`}
                      key={option.value || "all"}
                      type="button"
                      onClick={() => {
                        setStatus(option.value);
                        setIsFilterOpen(false);
                      }}>
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lead-sort-menu">
            <button
              className="lead-sort-trigger"
              type="button"
              onClick={() => {
                setIsSortOpen((open) => !open);
                setIsFilterOpen(false);
              }}>
              <span>Sort</span>
              <span className="lead-sort-trigger__value">{sortLabel}</span>
              <span className="lead-sort-icon" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
            </button>

            {isSortOpen && (
              <div className="lead-sort-popover">
                <p className="lead-sort-popover__title">Sort by</p>
                <div className="lead-option-list">
                  {sortOptions.map((option) => (
                    <button
                      className={`lead-option-item ${sortBy === option.value ? "lead-option-item--active" : ""}`}
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setSortBy(option.value);
                        setIsSortOpen(false);
                      }}>
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="lead-grid">
        <div className="lead-table-head" aria-hidden="true">
          <span>Name</span>
          <span>Company</span>
          <span>Email</span>
          <span>Phone</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {sortedLeads.map((l) => (
          <article className="crm-card lead-card" key={l._id}>
            <div className="lead-card__cell lead-card__identity">
              <span className="lead-card__mobile-label">Name</span>
              <h2 className="lead-card__title">{l.name}</h2>
            </div>

            <div className="lead-card__cell">
              <span className="lead-card__mobile-label">Company</span>
              <p className="lead-card__company">{l.company || "No company"}</p>
            </div>

            <div className="lead-card__cell">
              <span className="lead-card__mobile-label">Email</span>
              <p className="lead-card__text">{l.email || "-"}</p>
            </div>

            <div className="lead-card__cell">
              <span className="lead-card__mobile-label">Phone</span>
              <p className="lead-card__text">{l.phone || "-"}</p>
            </div>

            <div className="lead-card__cell">
              <span className="lead-card__mobile-label">Status</span>
              <span className="crm-badge bg-brand-50 text-brand-700">{l.status || "new"}</span>
            </div>

            <div className="lead-card__actions">
              <span className="lead-card__mobile-label">Actions</span>
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

      {isAddLeadOpen && (
        <div className="lead-modal-backdrop" role="presentation">
          <section className="lead-modal crm-panel" role="dialog" aria-modal="true" aria-labelledby="add-lead-title">
            <div className="lead-modal__header">
              <div>
                <h2 className="lead-modal__title" id="add-lead-title">
                  Add Lead
                </h2>
                <p className="lead-modal__subtitle">Capture a new prospect for your pipeline.</p>
              </div>

              <button className="lead-modal__close" type="button" onClick={closeAddLead} aria-label="Close add lead popup">
                X
              </button>
            </div>

            <form className="lead-modal__form" onSubmit={createLead}>
              <input
                className="crm-input"
                placeholder="Name"
                required
                value={newLead.name}
                onChange={(e) => updateNewLead("name", e.target.value)}
              />
              <input
                className="crm-input"
                placeholder="Email"
                value={newLead.email}
                onChange={(e) => updateNewLead("email", e.target.value)}
              />
              <input
                className="crm-input"
                placeholder="Phone"
                value={newLead.phone}
                onChange={(e) => updateNewLead("phone", e.target.value)}
              />
              <input
                className="crm-input"
                placeholder="Company"
                value={newLead.company}
                onChange={(e) => updateNewLead("company", e.target.value)}
              />

              <div className="lead-modal__actions">
                <button className="crm-button-neutral" type="button" onClick={closeAddLead}>
                  Cancel
                </button>
                <button className="crm-button-primary" type="submit">
                  Create Lead
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </DashboardLayout>
  );
}
