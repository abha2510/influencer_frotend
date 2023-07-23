import React, { useState} from 'react';
import axios from 'axios';
import "./Chat.css"

function Chat({ username, handleLogout }) {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setChatHistory(prevChatHistory => [...prevChatHistory, { message: question, sender: 'user' }]);
    setLoading(true); 
    try {
      const res = await axios.post('https://tasty-gown-lion.cyclic.app/generateresponse', { question });
      setChatHistory(prevChatHistory => [...prevChatHistory, { message: res.data.chatbot_response, sender: 'bot' }]);
    } catch (error) {
      console.error("Error while getting response from server:", error);
    } finally {
      setLoading(false); 
    }
    setQuestion('');
  };

  return (
    <div className="chat-container">
    <div className="chat-header">
      <span>Welcome, {username}</span>
      <button onClick={handleLogout}>Logout</button>
    </div>
    <div className="chat-messages">
      {chatHistory.map((chat, index) => (
        <div key={index} className={`chat-message chat-${chat.sender}`}>
          <p>{chat.message}</p>
        </div>
      ))}
      {loading && <div>Loading...</div>}
    </div>
    <form onSubmit={handleSubmit} className="chat-form">
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask something..."
      />
      <button id="ask" type="submit">Ask</button>
    </form>
  </div>
  );
}

export default Chat;

