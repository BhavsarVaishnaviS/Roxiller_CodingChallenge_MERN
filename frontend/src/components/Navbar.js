import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand mx-5" to="/">StoreRating</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          {!user ? (
            <>
              <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/role">Register</Link></li>
            </>
          ) : (
            <>
              {user.role === "admin" && (
                <>
              <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/user-list">List</Link></li>
              </>

              )}
              {
                (user.role === 'admin' || user.role === 'user') && (
                  <li className="nav-item"><Link className="nav-link" to="/stores">Stores</Link></li>
                )
              }
              {(user.role === "store_owner" || user.role === 'owner') &&(
                <>
                <li className="nav-item"><Link className="nav-link" to="/store-dash">Dashbord</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/rated-users">List</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/addstore">New Store</Link></li>
                </>
              )}
              <li className="nav-item"><button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button></li>
              {
                user.role === 'store_owner' && user.role === 'user' && user.role === 'owner' && (
                  <li className="nav-item"><Link className="nav-link" to="/change-password" >Change Password</Link></li>
              )}
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
