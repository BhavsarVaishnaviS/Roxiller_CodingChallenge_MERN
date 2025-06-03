import React, { useState } from "react";
import { loginUser } from "../services/api";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Successfully login!");
      if(user.role === 'admin'){
        navigate("/dashboard");
      }else if(user.role === 'user'){
        navigate("/stores");
      }else{
        navigate("/store-dash");
      }
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="container mt-5">
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" required className="form-control" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" required className="form-control" onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-success mt-2">Login</button>
      </form>
      <p className="mt-3">
        Don't have an account? <Link to="/role">Register here</Link>
      </p>
      <p className="mt-3">
        <Link to="/forget-password">Forget Password</Link>
      </p>
    </div>
  );
}

export default Login;
