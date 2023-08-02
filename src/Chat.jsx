import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./Chat.css";
import { useNavigate } from "react-router-dom";
import ScoreChecker from "./ScoreChecker";

function Chat({ username, handleLogout }) {
  const navigate = useNavigate();
  const [scoreChecker, setScoreChecker] = useState({
    question: "",
    answer: "",
  });
  const openAIKey = localStorage.getItem("openAIKey");
  const userId = localStorage.getItem("userId"); // Get the userId from local storage
  const [question, setQuestion] = useState("");
  const storedChatHistory =
    JSON.parse(localStorage.getItem("chatHistory")) || [];
  const [chatHistory, setChatHistory] = useState([
    ...storedChatHistory,
    { message: "How can I help you today?", sender: "bot" },
  ]);

  const [loading, setLoading] = useState(false);
  const lastChatRef = useRef(null);

  const scrollToBottom = () => {
    if (lastChatRef.current) {
      lastChatRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (chatHistory) {
      scrollToBottom();
    }
  }, [chatHistory]);

  if (!username) {
    navigate("/");
    return null;
  }

  const handleReset = () => {
    setScoreChecker({ question: "", answer: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const currentQuestion = question;
    setQuestion("");
  
    let chatToUpdate = [...chatHistory, { message: currentQuestion, sender: "user" }];
    setChatHistory(chatToUpdate);
  
    setLoading(true);
  
    try {
      const res = await axios.post(
        "https://tasty-gown-lion.cyclic.app/generateresponse",
        {
          question: currentQuestion,
          userId, // Pass the userId in the request body
        },
        { headers: { Authorization: `Bearer ${openAIKey}` } }
      );
  
      // Check if the response is asking for more information
      if (res.data.chatbot_response.includes('Could you please provide')) {
        chatToUpdate = [...chatToUpdate, { message: res.data.chatbot_response, sender: "bot" }];
        setChatHistory(chatToUpdate);
        localStorage.setItem('chatHistory', JSON.stringify(chatToUpdate));
      } else {
        // Update the chat history with the bot's response
        chatToUpdate = [...chatToUpdate, { message: res.data.chatbot_response, sender: "bot" }];
        setChatHistory(chatToUpdate);
  
        // Save the updated chat history to local storage
        localStorage.setItem('chatHistory', JSON.stringify(chatToUpdate));
  
        // Add this line after updating the chat history
        setScoreChecker({
          question: currentQuestion,
          answer: res.data.chatbot_response,
        });
      }
      
    } catch (error) {
      console.error("Error while getting response from server:", error);
    } finally {
      setLoading(false);
    }
};

  
  

  return (
    <div className="contain">
      <div className="chat-container">
        <div className="chat-header">
          <span>Welcome,</span>
          <span> {username}</span>
          <button id="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <div className="chat-messages">
          {chatHistory.map((chat, index) => (
            <div key={index} className={`chat-message chat-${chat.sender}`}>
              <p>{chat.message}</p>
            </div>
          ))}
          {loading && <div>Loading...</div>}
          <div ref={lastChatRef} />
        </div>
        <form onSubmit={handleSubmit} className="chatform">
          <textarea
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={loading ? "Loading..." : "Ask something..."}
            onKeyPress={(e) => {
              if (e.key === "Enter" && e.shiftKey === false) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          ></textarea>
        </form>
      </div>
      <div className="ScoreChecker">
        <ScoreChecker
          question={scoreChecker.question}
          answer={scoreChecker.answer}
          handleReset={handleReset}
        />
      </div>
    </div>
  );
}

export default Chat;
