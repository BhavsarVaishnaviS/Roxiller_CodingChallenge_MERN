import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RatingUsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token"); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/store-owner/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(res.data.users);
      } catch (error) {
        console.error("Error fetching rating users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-xl font-semibold mb-4">Users Who Rated Your Store</h2>
      {loading ? (
        <p>Loading...</p>
      ) : !Array.isArray(users) || users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="overflow-x-auto container mt-5">
          <table className="table table-bordered mt-4">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.rating_given != null && !isNaN(user.rating_given)
                      ? Math.round(Number(user.rating_given))
                      : "0"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RatingUsersList;
