import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function OpenAIKeyInput({ setGlobalOpenAIKey }) {
  const navigate = useNavigate();
  const [key, setKey] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setGlobalOpenAIKey(key);
    navigate('/chat', { state: { openAIKey: key } });  
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        style={{padding:"20px",width:"200%",marginLeft:"-50%"}}
        type="text"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        placeholder="Enter your OpenAI Key"
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  );
}

export default OpenAIKeyInput;
