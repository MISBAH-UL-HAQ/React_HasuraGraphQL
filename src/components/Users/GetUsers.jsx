
import React from "react";
import { gql, useQuery } from "@apollo/client";

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      username
      age
    }
  }
`;

export default function GetUsers() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error fetching users: {error.message}</p>;

  return (
    <div className="card p-4">
      <h2 className="text-center">Users</h2>
      <ul className="list-group">
        {data.users.map((user) => (
          <li key={user.id} className="list-group-item">
           <strong>ID: </strong> {user.id}  –  
            <strong>  { user.username}</strong> – Age: {user.age}
          </li>
        ))}
      </ul>
    </div>
  );
}
