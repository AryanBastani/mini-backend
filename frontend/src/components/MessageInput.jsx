import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faMicrophone } from '@fortawesome/free-solid-svg-icons';

const MessageInput = ({ onSendMessage, isRecording, onToggleRecording, disabled }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && !disabled) {
      onSendMessage(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex align-items-center">
      <input
        type="text"
        className="form-control"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={disabled ? "Select a lesson first" : "Type a message..."}
        disabled={disabled}
        style={{
          borderRadius: '20px',
          padding: '0.5rem 1rem',
          backgroundColor: disabled ? '#e9ecef' : '#fff',
        }}
      />
      <button 
        type="button" 
        className={`btn btn-light ms-2 ${isRecording ? 'text-danger' : 'text-secondary'}`} 
        onClick={onToggleRecording}
        disabled={disabled}
        style={{ borderRadius: '50%', width: '40px', height: '40px' }}
      >
        <FontAwesomeIcon icon={faMicrophone} />
      </button>
      <button 
        type="submit" 
        className="btn btn-primary ms-1" 
        disabled={disabled || !text.trim()}
        style={{ borderRadius: '50%', width: '40px', height: '40px' }}
      >
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </form>
  );
};

export default MessageInput;