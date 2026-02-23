import { useState } from "react";

import API from "../../services/api";

import DashboardLayout from "../../layouts/DashboardLayout";

import { useNavigate } from "react-router-dom";

export default function AddLead() {
  const nav = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [phone, setPhone] = useState("");

  const [company, setCompany] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/leads",

        {
          name,
          email,
          phone,
          company,
        },
      );

      alert("Lead Created Successfully");

      nav("/leads");
    } catch (err) {
      console.log(err);

      alert("Create Lead Failed");
    }
  };

  return (
    <DashboardLayout>
      <h3>Add Lead</h3>

      <form onSubmit={submit}>
        <input
          className="form-control my-2"
          placeholder="Name"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="form-control my-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="form-control my-2"
          placeholder="Phone"
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          className="form-control my-2"
          placeholder="Company"
          onChange={(e) => setCompany(e.target.value)}
        />

        <button className="btn btn-success">Create Lead</button>
      </form>
    </DashboardLayout>
  );
}
