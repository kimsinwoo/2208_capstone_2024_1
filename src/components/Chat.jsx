import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import styles from '../style/Chat.module.css';

const Chat = () => {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const socket = io('http://localhost:8080');

  useEffect(() => {
    socket.emit('joinRoom', { roomId });

    socket.on('message', message => {
      setMessages(messages => [...messages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId, socket]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input) {
      socket.emit('chatMessage', input);
      setInput('');
    }
  };

  return (
    <div className={styles.chatPage}>
      <div className={styles.chatMessages}>
        {messages.map((message, index) => (
          <div key={index} className={styles.message}>{message}</div>
        ))}
      </div>
      <form onSubmit={sendMessage} className={styles.chatForm}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={styles.chatInput}
        />
        <button type="submit" className={styles.sendButton}>Send</button>
      </form>
    </div>
  );
};

export default Chat;
