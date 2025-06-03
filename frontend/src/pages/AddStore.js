import React, { useState } from 'react';
import axios from 'axios';

const AddStore = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
  });
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('success');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(
        'http://localhost:5000/api/store-owner/add',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setMessage(response.data.message || 'Store added successfully');
      setAlertType('success');
      setFormData({ name: '', address: '', email: '' });
    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.data?.message || 'Something went wrong. Try again.'
      );
      setAlertType('danger');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4">Add Store</h2>
      {message && (
        <div className={`alert alert-${alertType}`} role="alert">
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="storeName" className="form-label">
            Store Name
          </label>
          <input
            type="text"
            className="form-control"
            id="storeName"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter store name"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="storeAddress" className="form-label">
            Store Address
          </label>
          <input
            type="text"
            className="form-control"
            id="storeAddress"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter store address"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="storeEmail" className="form-label">
            Store Email
          </label>
          <input
            type="email"
            className="form-control"
            id="storeEmail"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter store email"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Store
        </button>
      </form>
    </div>
  );
};

export default AddStore;
