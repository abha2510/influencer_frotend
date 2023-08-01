import React, { useState } from "react";
import axios from "axios";
import "./checker.css";

const ScoreChecker = ({ question, answer, handleReset }) => {
  const [response, setResponse] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("question", question);
    formData.append("answer", answer);

    try {
      const result = await axios.post(
        "https://tasty-gown-lion.cyclic.app/generatescore",
        formData
      );
      if (result.data.ok) {
        setResponse(result.data.data);
        setSubmitted(true);
      } else {
        setResponse(result.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log(response);
  return (
    <div className="container">
      {!submitted ? (
        <div className="form-container">
          <form id="form" onSubmit={handleSubmit}>
            <h3>InfluencerAI Score Generator</h3>
            <p>Question : {question}</p>
            <p>Answer : {answer}</p>
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : null}
      <div className="response-container">
        {response && (
          <>
            <p className="response">Score: {response[0]}</p>
            <p className="response">{response[1]}</p>
            <button onClick={handleReset}>New Assessment</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ScoreChecker;
