import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./Chat.css";
import { useNavigate } from "react-router-dom";
import ScoreChecker from "./ScoreChecker";
import socketIOClient from "socket.io-client";

const ENDPOINT = "https://tasty-gown-lion.cyclic.app";
function Chat({ username, handleLogout }) {
  const navigate = useNavigate();
  const socket = useRef();
  const [scoreChecker, setScoreChecker] = useState({
    question: "",
    answer: "",
  });
  const openAIKey = localStorage.getItem("openAIKey");
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { message: "How can I help you today?", sender: "bot" },
  ]);
  const [loading, setLoading] = useState(false);
  const lastChatRef = useRef(null);
  useEffect(() => {
    socket.current = socketIOClient(ENDPOINT);  // Assigning socket instance

    socket.current.on('message', (data) => {
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { message: data.message, sender: "bot" },
      ]);
    });

    socket.current.on('error', (error) => {
      console.error("Socket Error:", error);
    });

    // disconnect the socket when component unmounts
    return () => socket.current.disconnect();
  }, []);


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
    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      { message: currentQuestion, sender: "user" },
    ]);
    setLoading(true);
    socket.current.emit('message', { message: currentQuestion, userId: localStorage.getItem("userId") });

    try {
      const res = await axios.post(
        "https://tasty-gown-lion.cyclic.app/generateresponse",
        {
          question: currentQuestion,
        },
        { headers: { Authorization: `Bearer ${openAIKey}` } }
      );
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { message: res.data.chatbot_response, sender: "bot" },
      ]);

      // Add this line after updating the chat history
      setScoreChecker({
        question: currentQuestion,
        answer: res.data.chatbot_response,
      });
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
