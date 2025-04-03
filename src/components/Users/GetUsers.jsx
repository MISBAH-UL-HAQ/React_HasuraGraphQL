import React, { useState, useEffect } from "react";

export default function GetUsers() {
  const [users, setUsers] = useState([]);

  // Function to fetch users from the API
  const getUsers = async () => {
    try {
      const response = await fetch("https://localhost:7046/api/User", { method: "GET" });
      const usersData = await response.json();
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="card p-4">
      <h2 className="text-center">Users</h2>
      <ul className="list-group">
        {users.map((user) => (
          <li key={user.id} className="list-group-item">
            <strong>{user.name}</strong> – Age: {user.age}
          </li>
        ))}
      </ul>
    </div>
  );
}
