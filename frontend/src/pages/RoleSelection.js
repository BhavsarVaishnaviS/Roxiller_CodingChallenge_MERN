import React from "react";
import { useNavigate } from "react-router-dom";

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleCardClick = (role) => {
    navigate(`/register?role=${role}`);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Select Your Role to Register</h2>
      <div className="row justify-content-center">
        
        {[
          { title: "System Administrator", role: "admin", color: "primary" },
          { title: "Store Owner", role: "owner", color: "success" },
          { title: "Normal User", role: "user", color: "secondary" },
        ].map(({ title, role, color }) => (
          <div key={role} className="col-md-4 d-flex">
            <div
              className={`card text-white bg-${color} mb-3 flex-fill`}
              style={{ cursor: "pointer", minHeight: "180px" }}
              onClick={() => handleCardClick(role)}
            >
              <div className="card-body d-flex flex-column justify-content-center text-center">
                <h1 className="card-title">{title}</h1>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default RoleSelection;
