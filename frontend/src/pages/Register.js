// import React, { useState } from "react";
// import { registerUser } from "../services/api";
// import { Link, useNavigate } from "react-router-dom";

// function Register() {
//   const [form, setForm] = useState({ name: "", email: "", address: "", password: "" });
//   const navigate = useNavigate();

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await registerUser(form);
//       alert("Registered successfully!");
//       navigate("/login");
//     } catch (err) {
//       alert(err.response?.data?.message || "Error occurred");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h3>Register</h3>
//       <form onSubmit={handleSubmit}>
//         {["name", "email", "address", "password"].map((field) => (
//           <div className="form-group" key={field}>
//             <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
//             <input
//               type={field === "password" ? "password" : "text"}
//               className="form-control"
//               name={field}
//               required
//               onChange={handleChange}
//               minLength={field === "name" ? 20 : 0}
//               maxLength={field === "address" ? 400 : 60}
//             />
//           </div>
//         ))}
//         <button type="submit" className="btn btn-primary mt-2">Register</button>
//       </form>
//       <p className="mt-3">
//         Already have an account! <Link to="/login">Login here</Link>
//       </p>
//     </div>
//   );
// }

// export default Register;


import React, { useState } from "react";
import { registerUser } from "../services/api";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  const [form, setForm] = useState({ name: "", email: "", address: "", password: "" });
  const navigate = useNavigate();
  const role = queryParam.get("role");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register",{
        ...form,
        role,
      });
      alert("Registered successfully!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="container mt-5">
      <h3>Register</h3>
      <form onSubmit={handleSubmit}>
        {["name", "email", "address", "password"].map((field) => (
          <div className="form-group" key={field}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type={field === "password" ? "password" : "text"}
              className="form-control"
              name={field}
              required
              onChange={handleChange}
              minLength={field === "name" ? 20 : 0}
              maxLength={field === "address" ? 400 : 60}
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary mt-2">Register</button>
      </form>
      <p className="mt-3">
        Already have an account! <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Register;
