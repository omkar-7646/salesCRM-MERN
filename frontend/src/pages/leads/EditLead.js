import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import API from "../../services/api";

import DashboardLayout from "../../layouts/DashboardLayout";

export default function EditLead() {
  const { id } = useParams();

  const nav = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [phone, setPhone] = useState("");

  const [company, setCompany] = useState("");

  const [status, setStatus] = useState("new");

  useEffect(() => {
    API.get(`/leads/${id}`)

      .then((res) => {
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

    await API.put(
      `/leads/${id}`,

      {
        name,
        email,
        phone,
        company,
        status,
      },
    );

    alert("Lead Updated");

    nav("/leads");
  };

  return (
    <DashboardLayout>
      <h3>Edit Lead</h3>

      <form onSubmit={submit}>
        <input
          className="form-control my-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="form-control my-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="form-control my-2"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          className="form-control my-2"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <select
          className="form-select my-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}>
          <option value="new">New</option>

          <option value="qualified">Qualified</option>

          <option value="lost">Lost</option>
        </select>

        <button className="btn btn-success">Update Lead</button>
      </form>
    </DashboardLayout>
  );
}
