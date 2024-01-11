import React from 'react';
import './Messages.css';

const Messages = ({ messages }) => {
  return (
    <div className="messages-container">
      <h2>Messages</h2>
      <table className="messages-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message, index) => (
            <tr key={index}>
              <td>{message.name}</td>
              <td>{message.email}</td>
              <td>{message.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Messages;
