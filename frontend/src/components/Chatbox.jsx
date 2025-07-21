import React, { useState } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Chatbox.css';

const Chatbox = ({ messages = [], onSendMessage }) => {
  const [isRecording, setIsRecording] = useState(false);

  const handleSend = (text) => {
    if (onSendMessage) {
      onSendMessage(text);
    }
  };

  const handleToggleRecording = () => {
    setIsRecording(prev => !prev);
    // Add WebSocket or audio recording logic if needed
  };

  return (
    <div className="chatbox-container card">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">Tutor Chat</h5>
      </div>
      <div className="card-body chat-messages">
        {messages.map((msg, index) => (
          <Message key={index} message={msg} />
        ))}
      </div>
      <div className="card-footer">
        <MessageInput
          onSendMessage={handleSend}
          isRecording={isRecording}
          onToggleRecording={handleToggleRecording}
        />
      </div>
    </div>
  );
};

export default Chatbox;
