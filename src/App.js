import React, { useEffect, useState } from 'react';
import Form from './Form';
import { Routes, Route, useNavigate } from "react-router-dom";
import Chat from "./Chat";
import PrivateRoute from './PrivateRoute';
import ScoreChecker from './ScoreChecker';
import OpenAIKeyInput from './OpenAIKeyInput';

const App = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [openAIKey, setOpenAIKey] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("username");
    if (loggedInUser) {
      setUsername(loggedInUser);
    }
  }, []);

  const handleLogout = () => {
    setUsername(null);
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div>
      <Routes>
         <Route path="/" element={<Form setUsername={setUsername} />} />
         <Route path="/checker" element={<ScoreChecker/>}/>
         <Route path="/openaikey" element={<OpenAIKeyInput setGlobalOpenAIKey={setOpenAIKey} />} />
         <Route path="/chat" element={<PrivateRoute />}>
           <Route path="/chat" element={<Chat openAIKey={openAIKey} username={username} handleLogout={handleLogout} />} />
         </Route>
       </Routes>
    </div>
  )
}

export default App;
