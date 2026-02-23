import { useEffect, useState } from "react";

import API from "../../services/api";

import DashboardLayout from "../../layouts/DashboardLayout";

export default function Activities() {
  const [activities, setActivities] = useState([]);

  // LOAD ACTIVITIES

  const fetchActivities = () => {
    API.get("/activities")

      .then((res) => {
        setActivities(res.data);
      })

      .catch(() => {
        alert("Failed loading activities");
      });
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  // DELETE

  const deleteActivity = async (id) => {
    if (!window.confirm("Delete Activity ?")) return;

    await API.delete(`/activities/${id}`);

    fetchActivities();
  };

  return (
    <DashboardLayout>
      <h3>Activity History</h3>

      <div className="row">
        {activities.length === 0 ? (
          <p>No Activities Found</p>
        ) : (
          activities.map((a) => (
            <div className="col-md-4" key={a._id}>
              <div className="card shadow p-3 my-3">
                <h5>{a.type.toUpperCase()}</h5>

                <p>{a.description}</p>

                <p>Lead :{a.leadId?.name || "Lead"}</p>

                <small>By :{a.createdBy?.name}</small>

                <button
                  className="btn btn-danger mt-3"
                  onClick={() => deleteActivity(a._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}
