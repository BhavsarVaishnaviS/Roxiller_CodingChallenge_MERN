import { useState } from "react";
import axios from "axios";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/forget-password",
        {
          email,
          newPassword,
        }
      );

      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Forget Password</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="form-control"
          />
          <button type="submit" className="btn btn-success mt-2">Reset Password</button>
          {message && <p>{message}</p>}
        </div>
      </form>
    </div>
  );
}

export default ForgetPassword;
