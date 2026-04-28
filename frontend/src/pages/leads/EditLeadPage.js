import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import API from "../../services/api";
import DashboardLayout from "../../layouts/DashboardLayout";

import "./leads.css";

export default function EditLeadPage() {
  const { id } = useParams();
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("new");

  useEffect(() => {
    API.get(`/leads/${id}`).then((res) => {
      const l = res.data;
      setName(l.name);
      setEmail(l.email);
      setPhone(l.phone);
      setCompany(l.company);
      setStatus(l.status);
    });
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();

    await API.put(`/leads/${id}`, {
      name,
      email,
      phone,
      company,
      status,
    });

    alert("Lead Updated");
    nav("/leads");
  };

  return (
    <DashboardLayout>
      <section className="lead-form crm-panel">
        <div className="mb-8">
          <h1 className="crm-page-title">Edit Lead</h1>
          <p className="crm-page-subtitle">Update contact details, company data, and lead status.</p>
        </div>

        <form className="space-y-4" onSubmit={submit}>
          <input className="crm-input" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="crm-input" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="crm-input" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <input className="crm-input" value={company} onChange={(e) => setCompany(e.target.value)} />

          <select
            className="crm-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}>
            <option value="new">New</option>
            <option value="qualified">Qualified</option>
            <option value="lost">Lost</option>
          </select>

          <button className="crm-button-primary" type="submit">
            Update Lead
          </button>
        </form>
      </section>
    </DashboardLayout>
  );
}
