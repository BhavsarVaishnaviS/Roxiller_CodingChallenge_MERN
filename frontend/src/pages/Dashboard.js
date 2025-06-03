import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminPanel from "../components/AdminPanel";

function Dashboard() {
  const [data, setData] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });

  const token = localStorage.getItem("token");
  console.log("Token:",token);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        alert("Failed to load dashboard");
      });
  }, []);

  return (
    <div className="container mt-5">
      <h3>Admin Dashboard</h3>
      <AdminPanel/>
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card text-white bg-primary mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              <p className="card-text">{data.totalUsers}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Stores</h5>
              <p className="card-text">{data.totalStores}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-info mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Ratings</h5>
              <p className="card-text">{data.totalRatings}</p>
            </div>
          </div>
        </div>
      </div>
      
      
    </div>
  );
}

export default Dashboard;
