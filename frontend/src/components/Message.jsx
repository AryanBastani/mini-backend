import React from 'react';
import ReactMarkdown from 'react-markdown';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import '../styles/Message.css';

const Message = ({ message }) => {
  const { role, timestamp } = message;
  const text = message.text || message.content || '';
  const isUser = role === 'user';
  const alignClass = isUser ? 'text-end' : 'text-start';
  const bubbleClass = isUser ? 'user-message' : 'tutor-message';

  return (
    <div className={`message-row ${alignClass}`}>
      <div className={`message-bubble ${bubbleClass}`}>
        <ReactMarkdown
          components={{
            p: 'span',
            math: ({ value }) => <InlineMath math={value} />,
          }}
        >
          {text}
        </ReactMarkdown>
        <div className="message-timestamp">
          {timestamp ? new Date(timestamp).toLocaleTimeString() : ''}
        </div>
      </div>
    </div>
  );
};

export default Message;
