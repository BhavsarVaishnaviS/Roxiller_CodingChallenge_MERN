import React from 'react';
import AverageRating from '../pages/AverageRating';

const StoreDashboard = () => {
  const token = localStorage.getItem("token"); 
  console.log("Token:",token);

  return (
    <div className="max-w-2xl mx-auto mt-6 px-4">
      <h1 className="text-2xl font-bold mb-4">Store Owner Dashboard</h1>
      <AverageRating token={token} />
    </div>
  );
};

export default StoreDashboard;
