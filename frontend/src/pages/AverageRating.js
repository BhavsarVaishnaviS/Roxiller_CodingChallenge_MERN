import React, { useEffect, useState } from "react";
import axios from "axios";

const AverageRating = ({ token }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAverage = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/ratings/average",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setData(res.data?.data || []);
      } catch (error) {
        console.error("Error fetching average rating:", error);
        setData([]);
      }
    };

    fetchAverage();
  }, [token]);

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-xl font-semibold mb-2">Store Rating Summary</h2>
      {data.length === 0 ? (
        <p>No data found.</p>
      ) : (
        data.map((store) => (
          <div key={store.store_id} className="mb-4">
            <p>
              <strong>Store Name:</strong> {store.store_name}
            </p>
            <p>
              <strong>Average Rating:</strong>
              {store.average_rating != null && !isNaN(store.average_rating)
                ? Math.round(Number(store.average_rating))
                : "0"}
            </p>
            <p>
              <strong>Total Ratings:</strong> {store.total_ratings}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default AverageRating;
