import React, { useState } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Chatbox.css';

const Chatbox = ({ messages = [], onSendMessage, lessonSelected }) => {
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
    <div className="chatbox-container">
      <div className="chatbox-header">
        <h5 className="mb-0">AI Tutor</h5>
      </div>
      <div className="chat-messages-area">
        {lessonSelected ? (
          messages.length > 0 ? (
            messages.map((msg, index) => (
              <Message key={index} message={msg} />
            ))
          ) : (
            <div className="chat-placeholder">
              <span>Ask a question to get started.</span>
            </div>
          )
        ) : (
          <div className="chat-placeholder">
            <span>Select a lesson to activate the chat.</span>
          </div>
        )}
      </div>
      <div className="chatbox-footer">
        <MessageInput
          onSendMessage={handleSend}
          isRecording={isRecording}
          onToggleRecording={handleToggleRecording}
          disabled={!lessonSelected}
        />
      </div>
    </div>
  );
};

export default Chatbox;