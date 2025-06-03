import React, { useEffect, useState } from "react";
import axios from "axios";

function StoreList() {
  const [stores, setStores] = useState([]);
  const [userRatings, setUserRatings] = useState({});
  const token = localStorage.getItem("token");
  console.log("Store Token", token);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/stores", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setStores(res.data.stores);
        setUserRatings(res.data.userRatings || {});
      })
      .catch(() => alert("Error fetching stores"));
  }, []);

  const handleRating = async (storeId, newRating) => {
    try {
      await axios.post(
        `http://localhost:5000/api/stores/${storeId}/rate`,
        { rating: newRating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUserRatings({ ...userRatings, [storeId]: newRating });
      alert("Rating submitted!");
    } catch {
      alert("Rating failed");
    }
  };

  return (
    <div className="container mt-5">
      <h3>All Stores</h3>
      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Avg Rating</th>
            <th>Your Rating</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store) => (
            <tr key={store.id}>
              <td>{store.name}</td>
              <td>{store.address}</td>
              <td>{store.avg_rating != null && !isNaN(store.avg_rating) ? parseInt(store.avg_rating) : 0}</td>
              <td>{userRatings[store.id] || "Not rated"}</td>
              <td>
                <select
                  value={userRatings[store.id] || ""}
                  onChange={(e) => handleRating(store.id, e.target.value)}
                >
                  <option value="">Rate</option>
                  {[1, 2, 3, 4, 5].map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StoreList;
