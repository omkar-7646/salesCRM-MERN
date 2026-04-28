import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../../services/api";
import DashboardLayout from "../../layouts/DashboardLayout";

import "./leads.css";

export default function AddLeadPage() {
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/leads", {
        name,
        email,
        phone,
        company,
      });

      alert("Lead Created Successfully");
      nav("/leads");
    } catch (err) {
      console.log(err);
      alert("Create Lead Failed");
    }
  };

  return (
    <DashboardLayout>
      <section className="lead-form crm-panel">
        <div className="mb-8">
          <h1 className="crm-page-title">Add Lead</h1>
          <p className="crm-page-subtitle">Capture a new prospect and add them to the pipeline.</p>
        </div>

        <form className="space-y-4" onSubmit={submit}>
          <input
            className="crm-input"
            placeholder="Name"
            required
            onChange={(e) => setName(e.target.value)}
          />
          <input className="crm-input" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input className="crm-input" placeholder="Phone" onChange={(e) => setPhone(e.target.value)} />
          <input
            className="crm-input"
            placeholder="Company"
            onChange={(e) => setCompany(e.target.value)}
          />

          <button className="crm-button-primary" type="submit">
            Create Lead
          </button>
        </form>
      </section>
    </DashboardLayout>
  );
}
