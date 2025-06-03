import React, { useState } from "react";
import axios from "axios";

function AddUserForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || form.name.length < 20) {
      return alert("Please enter your full name.");
    }

    if (!form.role) {
      return alert("Please select a role.");
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:5000/api/admin/add-user", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("User added successfully");
      setForm({ name: "", email: "", password: "", address: "", role: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add user");
    }
  };

  return (
    <div className="container-sm mt-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h3>Add New User</h3>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="card-body">
                <input
                  type="text"
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="form-control mb-2"
                  required
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="form-control mb-2"
                  required
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="form-control mb-2"
                  required
                />

                <input
                  type="text"
                  placeholder="Address"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  className="form-control mb-2"
                  required
                />

                <select
                  className="form-control mb-3"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="user">Normal User</option>
                  <option value="admin">Admin</option>
                </select>

                <button type="submit" className="btn btn-success w-100">
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddUserForm;
