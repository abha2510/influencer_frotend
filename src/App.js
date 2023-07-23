// import React, { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   useNavigate,
//   Routes,
// } from "react-router-dom";
// import Login from "./Login";
// import Register from "./Register";
// import Chat from "./Chat";
// import "./App.css";
// import PrivateRoute from "./PrivateRoute";
// import Form from "./Form";

// function App() {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState(null);

//   useEffect(() => {
//     const loggedInUser = localStorage.getItem("username");
//     if (loggedInUser) {
//       setUsername(loggedInUser);
//     }
//   }, []);

//   const handleLogout = () => {
//     setUsername(null);
//     localStorage.removeItem("username");
//     navigate("/login");
//   };

//   return (
//     <div className="App">
//       <nav className="navbar">
//         <Link to="/">Home</Link>
//         <Link to="https://checkerapp.netlify.app/">Checker</Link>
//         {username ? (
//           <>
//             <span>Welcome, {username}</span>
//             <button onClick={handleLogout}>Logout</button>
//           </>
//         ) : (
//           <>
//             <Link to="/login">Login</Link>
//             <Link to="/register">Register</Link>
//           </>
//         )}
//       </nav>

//       <Routes>
//         <Route path="/login" element={<Login setUsername={setUsername} />} />
//         <Route path="/form" element={<Register/>} />
//         <Route path="/" element={<PrivateRoute />}>
//           <Route path="/" element={<Chat />} />
//         </Route>
//       </Routes>
//     </div>
//   );
// }

// export default App;


import React, { useEffect, useState } from 'react'
import Form from './Form'
import {
  BrowserRouter as Router,
  Route,
  Link,
  useNavigate,
  Routes,
} from "react-router-dom";
import Chat from "./Chat";
import PrivateRoute from './PrivateRoute'
import ScoreChecker from './ScoreChecker';




const App = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
    useEffect(() => {
    const loggedInUser = localStorage.getItem("username");
    if (loggedInUser) {
      setUsername(loggedInUser);
    }
  }, []);

  const handleLogout = () => {
    setUsername(null);
    localStorage.removeItem("username");
    navigate("/login");
  };


  return (
    <div>
      <Routes>
         <Route path="/login" element={<Form setUsername={setUsername} />} />
         <Route path="/checker" element={<ScoreChecker/>}/>
         <Route path="/" element={<PrivateRoute />}>
         <Route path="/" element={<Chat username={username} handleLogout={handleLogout} />} />
        </Route>
       </Routes>
    </div>
  )
}

export default App