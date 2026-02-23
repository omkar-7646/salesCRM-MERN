import { useEffect, useState } from "react";

import API from "../../services/api";

import DashboardLayout from "../../layouts/DashboardLayout";

export default function Deals() {
  const [deals, setDeals] = useState([]);

  // LOAD DEALS

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

  // UPDATE STAGE

  const updateStage = async (id, stage) => {
    await API.put(
      `/deals/${id}`,

      { stage },
    );

    fetchDeals();
  };

  // DELETE DEAL

  const deleteDeal = async (id) => {
    if (!window.confirm("Delete Deal ?")) return;

    await API.delete(`/deals/${id}`);

    fetchDeals();
  };

  return (
    <DashboardLayout>
      <h3>Deals Pipeline</h3>

      <div className="row">
        {deals.length === 0 ? (
          <p>No Deals Available</p>
        ) : (
          deals.map((d) => (
            <div className="col-md-4" key={d._id}>
              <div className="card p-3 shadow my-3">
                <h5>{d.title}</h5>

                <p>Amount : ₹ {d.amount}</p>

                {/* STAGE */}

                <label>Deal Stage</label>

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

                <button
                  className="btn btn-danger mt-3"
                  onClick={() => deleteDeal(d._id)}>
                  Delete Deal
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}
