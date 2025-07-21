import React from 'react';
import ReactMarkdown from 'react-markdown';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import '../styles/Message.css';

const Message = ({ message }) => {
  const { role, timestamp } = message;
  const text = message.text || message.content || '';
  const isUser = role === 'user';
  const alignClass = isUser ? 'user-align' : 'tutor-align';
  const bubbleClass = isUser ? 'user-message' : 'tutor-message';

  return (
    <div className={`message-container ${alignClass}`}>
      <div className={`message-bubble ${bubbleClass}`}>
        <ReactMarkdown
          components={{
            p: 'span',
            math: ({ value }) => <InlineMath math={value} />,
          }}
        >
          {text}
        </ReactMarkdown>
      </div>
      {timestamp && (
        <div className="message-timestamp">
          {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      )}
    </div>
  );
};

export default Message;