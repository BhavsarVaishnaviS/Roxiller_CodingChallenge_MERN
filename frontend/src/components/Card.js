import React from "react";

const UserCard = ({ name, email, address, role }) => {
  return (
    <div className="card shadow-sm mb-3" style={{ maxWidth: "400px" }}>
      <div className="card-body">
        <h5 className="card-title">{name || "User Name"}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{role || "Role"}</h6>
        <p className="card-text mb-1">
          <strong>Email:</strong> {email || "user@example.com"}
        </p>
        <p className="card-text">
          <strong>Address:</strong> {address || "User Address"}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
