// import React, { useState } from "react";
// import axios from "axios";
// import "./checker.css";

// const ScoreChecker = () => {
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [response, setResponse] = useState("");
//   const [submitted, setSubmitted] = useState(false); 
//   let formData = new FormData();
//   formData.append("question", question);
//   formData.append("answer", answer);
//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const result = await axios.post(
//         "https://tasty-gown-lion.cyclic.app/generatescore",
//         formData
//       );
//       if (result.data.ok) {
//         setResponse(result.data.data);
//         setSubmitted(true);
//       } else {
//         setResponse(result.data.message);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   console.log(response);
//   return (
//        <div className="container">
//       {!submitted ? ( 
//         <div className="form-container">
//           <form id="form" onSubmit={handleSubmit}>
//             <h3>InfluencerAI Score Generator</h3>
//             <textarea
//               className="textarea"
//               type="text"
//               value={question}
//               onChange={(e) => setQuestion(e.target.value)}
//               placeholder="Question"
//               required
//             ></textarea>
//             <br />
//             <textarea
//               className="textarea"
//               type="text"
//               value={answer}
//               onChange={(e) => setAnswer(e.target.value)}
//               placeholder="Answer"
//               required
//             ></textarea>
//             <button type="submit">Submit</button>
//           </form>
//         </div>
//       ) : null}
//       <div className="response-container">
//         {response && (
//           <>
//             <p className="response">Score: {response[0]}</p>
//             <p className="response">{response[1]}</p>
//           </>
//         )}
//       </div>
//     </div>
//     );
    
  
// };

// export default ScoreChecker;


import React, { useState } from "react";
import axios from "axios";
import "./checker.css";

const ScoreChecker = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [response, setResponse] = useState("");
  const [submitted, setSubmitted] = useState(false); 
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
        setSubmitted(true);
      } else {
        setResponse(result.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = () => {
    setQuestion("");
    setAnswer("");
    setResponse("");
    setSubmitted(false);
  };

  console.log(response);
  return (
       <div className="container">
      {!submitted ? ( 
        <div className="form-container">
          <form id="form" onSubmit={handleSubmit}>
            <h3>InfluencerAI Score Generator</h3>
            <textarea
              className="textarea"
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Question"
              required
            ></textarea>
            <br />
            <textarea
              className="textarea"
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Answer"
              required
            ></textarea>
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
