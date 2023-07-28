import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function OpenAIKeyInput({ setGlobalOpenAIKey }) {
  const navigate = useNavigate();
  const [key, setKey] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setGlobalOpenAIKey(key);
    localStorage.setItem("openAIKey", key);
    navigate('/chat', { state: { openAIKey: key } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        style={{
          display: 'block',
          width: '200%',
          height: '50px',
          padding: '20px',
          borderRadius:'20px',
          marginLeft:"-50%"
        }}
        type="password"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        placeholder="Enter your OpenAI Key"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default OpenAIKeyInput;
