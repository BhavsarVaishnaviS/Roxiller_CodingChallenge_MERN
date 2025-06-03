import React, { useState } from 'react';
import { getUserRole } from '../util/index';
import { Link } from 'react-router-dom';

function AdminPanel() {
    
  const [view, setView] = useState("user");
   const role = getUserRole();

  if (role !== 'admin') {
    return <h3 className="text-danger mt-4 text-center">Access Denied: Admins Only</h3>;
  }

  return (
    <div className="container mt-4">
      <div className="btn-group my-3">
  <button onClick={() => setView("user")} className="btn btn-primary me-2">
    <Link to="/add-user" className="text-white text-decoration-none">+User</Link>
  </button>
  <button onClick={() => setView("store")} className="btn btn-secondary">
   <Link to="/add-store" className="text-white text-decoration-none">+Store</Link>
  </button>
</div>
      {/* {view === "user" ? <AddUserForm /> : <AddStoreForm />} */}
    </div>
  );
}

export default AdminPanel;
