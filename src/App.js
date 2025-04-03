// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }


import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import GetUsers from "./components/Users/GetUsers.jsx";
import GetPosts from "./components/Posts/GetPosts";


import "./App.css";

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <h1 className="text-center mb-4">Hasura Web API Client</h1>
        
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/users">Users</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/posts">Posts</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/comments">Comments</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/users" element={<GetUsers />} />
          <Route path="/posts" element={<GetPosts />} />
          {/* Uncomment the next line once Comments component is implemented */}
          {/* <Route path="/comments" element={<Comments />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
