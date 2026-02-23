import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import API from "../../services/api";

import DashboardLayout from "../../layouts/DashboardLayout";

export default function LeadDetail() {
  const { id } = useParams();

  // ---------- STATES ----------

  const [lead, setLead] = useState(null);

  const [deals, setDeals] = useState([]);

  const [activities, setActivities] = useState([]);

  // DEAL FORM

  const [title, setTitle] = useState("");

  const [amount, setAmount] = useState("");

  const [stage, setStage] = useState("Prospect");

  // ACTIVITY FORM

  const [type, setType] = useState("call");

  const [description, setDescription] = useState("");

  // ---------- LOAD DATA ----------

  useEffect(() => {
    loadLead();

    fetchDeals();

    fetchActivities();
  }, [id]);

  // LOAD LEAD

  const loadLead = () => {
    API.get(`/leads/${id}`)

      .then((res) => {
        setLead(res.data);
      });
  };

  // ---------- DEALS ----------

  const fetchDeals = () => {
    API.get(`/deals?leadId=${id}`)

      .then((res) => {
        setDeals(res.data);
      });
  };

  // CREATE DEAL

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

  // UPDATE DEAL STAGE

  const updateStage = async (dealId, newStage) => {
    await API.put(
      `/deals/${dealId}`,

      { stage: newStage },
    );

    fetchDeals();
  };

  // DELETE DEAL

  const deleteDeal = async (dealId) => {
    await API.delete(`/deals/${dealId}`);

    fetchDeals();
  };

  // ---------- ACTIVITIES ----------

  const fetchActivities = () => {
    API.get(`/activities?leadId=${id}`)

      .then((res) => {
        setActivities(res.data);
      });
  };

  // CREATE ACTIVITY

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

  // DELETE ACTIVITY

  const deleteActivity = async (aid) => {
    await API.delete(`/activities/${aid}`);

    fetchActivities();
  };

  if (!lead) {
    return <h3>Loading...</h3>;
  }

  return (
    <DashboardLayout>
      <h3>Lead Details</h3>

      {/* ---------- LEAD INFO ---------- */}

      <div className="card p-4 mb-4 shadow">
        <h5>{lead.name}</h5>

        <p>Email : {lead.email}</p>

        <p>Phone : {lead.phone}</p>

        <p>Company : {lead.company}</p>

        <p>Status : {lead.status}</p>
      </div>

      {/* ---------- CREATE DEAL ---------- */}

      <h4>Create Deal</h4>

      <form onSubmit={createDeal}>
        <input
          className="form-control my-2"
          placeholder="Deal Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="form-control my-2"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          className="form-select my-2"
          value={stage}
          onChange={(e) => setStage(e.target.value)}>
          <option>Prospect</option>

          <option>Negotiation</option>

          <option>Won</option>

          <option>Lost</option>
        </select>

        <button className="btn btn-success">Create Deal</button>
      </form>

      <hr />

      {/* ---------- DEAL LIST ---------- */}

      <h4>Deals</h4>

      {deals.length === 0 ? (
        <p>No Deals Yet</p>
      ) : (
        deals.map((d) => (
          <div key={d._id} className="card p-3 my-2">
            <h5>{d.title}</h5>

            <p>Amount ₹ {d.amount}</p>

            <select
              value={d.stage}
              className="form-select"
              onChange={(e) =>
                updateStage(
                  d._id,

                  e.target.value,
                )
              }>
              <option>Prospect</option>

              <option>Negotiation</option>

              <option>Won</option>

              <option>Lost</option>
            </select>
            <div>
              <button
                className="btn btn-danger mt-2"
                onClick={() => deleteDeal(d._id)}>
                Delete Deal
              </button>
            </div>
          </div>
        ))
      )}

      <hr />

      {/* ---------- ADD ACTIVITY ---------- */}

      <h4>Log Activity</h4>

      <form onSubmit={createActivity}>
        <select
          className="form-select my-2"
          value={type}
          onChange={(e) => setType(e.target.value)}>
          <option value="call">Call</option>

          <option value="meeting">Meeting</option>

          <option value="note">Note</option>

          <option value="followup">Follow-up</option>
        </select>

        <textarea
          className="form-control my-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="btn btn-primary">Add Activity</button>
      </form>

      <hr />

      {/* ---------- ACTIVITY HISTORY ---------- */}

      <h4>Activity History</h4>

      {activities.length === 0 ? (
        <p>No Activity Yet</p>
      ) : (
        activities.map((a) => (
          <div key={a._id} className="card p-3 my-2">
            <h6>{a.type.toUpperCase()}</h6>

            <p>{a.description}</p>

            <small>By :{a.createdBy?.name}</small>
            <div>
              <button
                className="btn btn-danger mt-2"
                onClick={() => deleteActivity(a._id)}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </DashboardLayout>
  );
}
