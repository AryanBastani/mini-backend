import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faMicrophone } from '@fortawesome/free-solid-svg-icons';

const MessageInput = ({ onSendMessage, isRecording, onToggleRecording }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSendMessage(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="message-input-form d-flex">
      <input
        type="text"
        className="form-control"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
      />
      <button type="button" className={`btn ${isRecording ? 'btn-danger' : 'btn-secondary'} ms-2`} onClick={onToggleRecording}>
        <FontAwesomeIcon icon={faMicrophone} />
      </button>
      <button type="submit" className="btn btn-primary ms-2">
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </form>
  );
};

export default MessageInput;