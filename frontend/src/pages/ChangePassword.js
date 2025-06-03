import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const [form, setForm] = useState({ oldPassword: "", newPassword: "" });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        "http://localhost:5000/api/auth/:userId/change-password",
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Password updated successfully");
      if(user.role === "user") {
        navigate("/stores");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update password");
    }
  };

  // Redirect or block if not a store_owner or user
  if (!user || (user.role !=="store_owner" && user.role !== "owner" && user.role !== "user")) {
    return <p className="text-danger mt-5 text-center">Unauthorized Access</p>;
  }

  return (
    <div className="container mt-5">
      <h3>Change Password</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Old Password</label>
          <input
            type="password"
            name="oldPassword"
            required
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            name="newPassword"
            required
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Update Password
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
