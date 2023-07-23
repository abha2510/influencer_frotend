import React, { useState } from "react";
import axios from "axios";
import "./checker.css";

const ScoreChecker = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [response, setResponse] = useState("");
  let formData = new FormData();
  formData.append("question", question);
  formData.append("answer", answer);
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post(
        "https://tasty-gown-lion.cyclic.app/generatescore",
        formData
      );
      if (result.data.ok) {
        setResponse(result.data.data);
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
      <div className="form-container">
        <form id="form" onSubmit={handleSubmit}>
          <h3>InfluencerAI Score Generator</h3>
          <input
          className="check"
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Question"
            required
          />
          <input
                    className="check"
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Answer"
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="response-container">
  <form id='form'>
    {response && (
      <>
        <p className="response">Score: {response[0]}</p>
        <p className="response">{response[1]}</p>
      </>
    )}
  </form>
</div>
    </div>
  );
};

export default ScoreChecker;
