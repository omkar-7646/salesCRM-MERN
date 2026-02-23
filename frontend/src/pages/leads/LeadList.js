import { useEffect, useState } from "react";

import API from "../../services/api";

import DashboardLayout from "../../layouts/DashboardLayout";

import { Link } from "react-router-dom";

export default function LeadList() {
  const [leads, setLeads] = useState([]);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const fetchLeads = () => {
    API.get(`/leads?search=${search}&status=${status}`)

      .then((res) => {
        setLeads(res.data);
      });
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchLeads();
    }, 400);

    return () => clearTimeout(delay);
  }, [search, status]);

  const deleteLead = async (id) => {
    if (!window.confirm("Delete Lead?")) return;

    await API.delete(`/leads/${id}`);

    fetchLeads();
  };

  return (
    <DashboardLayout>
      <div className="d-flex justify-content-between">
        <h3>Leads</h3>

        <Link to="/add-lead" className="btn btn-primary">
          Add Lead
        </Link>
      </div>

      <input
        className="form-control my-2"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="form-select mb-3"
        onChange={(e) => setStatus(e.target.value)}>
        <option value="">All Status</option>

        <option value="new">New</option>

        <option value="qualified">Qualified</option>

        <option value="lost">Lost</option>
      </select>

      <div className="row">
        {leads.map((l) => (
          <div className="col-md-4" key={l._id}>
            <div className="card p-3 shadow my-2">
              <h5>{l.name}</h5>

              <p>{l.company}</p>

              <div className="d-flex justify-content-between mt-3">
                <Link
                  to={`/lead/${l._id}`}
                  className="btn btn-info flex-fill me-2">
                  View
                </Link>

                <Link
                  to={`/edit-lead/${l._id}`}
                  className="btn btn-warning flex-fill me-2">
                  Edit
                </Link>

                <button
                  className="btn btn-danger flex-fill"
                  onClick={() => deleteLead(l._id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
