import React, { useState } from 'react';
import axios from 'axios';

function AddStoreForm() {
  const [form, setForm] = useState({
    ownerName: '',
    email: '',
    password: '',
    address: '',
    storeName: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const payload = {
        name: form.ownerName,
        email: form.email,
        password: form.password,
        address: form.address,
        storeName: form.storeName
      };
      await axios.post('http://localhost:5000/api/admin/add-store', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Store added successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add store");
    }
  };

  return (
    <div className="container-sm mt-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h5>Add New Store</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    id="ownerName"
                    name="ownerName"
                    placeholder="Owner Name"
                    required
                    className="form-control mb-2"
                    value={form.ownerName}
                    onChange={handleChange}
                  />

                  <input
                    type="text"
                    id="storeName"
                    name="storeName"
                    placeholder="Store Name"
                    required
                    className="form-control mb-2"
                    value={form.storeName}
                    onChange={handleChange}
                  />
                
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                    className="form-control mb-2"
                    value={form.email}
                    onChange={handleChange}
                  />

                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Store Address"
                    required
                    className="form-control mb-2"
                    value={form.address}
                    onChange={handleChange}
                  />
                
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    required
                    className="form-control mb-2"
                    value={form.password}
                    onChange={handleChange}
                  />

                <button type="submit" className="btn btn-success w-100">Add Store</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddStoreForm;
