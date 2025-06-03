import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminUserList() {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({ name: "", email: "", address: "", role: "" });

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/users", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setUsers(res.data))
    .catch(err => alert("Failed to fetch users"));
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(filters.name.toLowerCase()) &&
    user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
    user.address.toLowerCase().includes(filters.address.toLowerCase()) &&
    user.role.toLowerCase().includes(filters.role.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h3>All Users</h3>
      
      {/* Filters */}
      <div className="row mb-3">
        {["name", "email", "address", "role"].map((field) => (
          <div className="col" key={field}>
            <input
              type="text"
              className="form-control"
              placeholder={`Filter by ${field}`}
              name={field}
              value={filters[field]}
              onChange={handleFilterChange}
            />
          </div>
        ))}
      </div>

      {/* Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUserList;
