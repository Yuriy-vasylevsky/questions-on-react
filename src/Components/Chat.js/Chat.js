import React, { useState, useEffect } from 'react';
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { app, db } from '../../firebase';
import './chat.scss';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    const db = getFirestore(app);
    const messagesRef = collection(db, 'messages');
    await addDoc(messagesRef, {
      text: message,
      createdAt: serverTimestamp(),
    });
    setMessage('');
  };

  useEffect(() => {
    const messagesRef = collection(db, 'messages');
    const q = query(messagesRef, orderBy('createdAt'));
    const unsubscribe = onSnapshot(q, querySnapshot => {
      const messages = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMessages(messages);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="chat-container">
      <div className="message-container">
        {messages.map(message => (
          <div key={message.id} className="message">
            <p>{message.text}</p>
          </div>
        ))}
      </div>

      <input
        className="input-field"
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button onClick={sendMessage} className="send-button">
        Send
      </button>
    </div>
  );
};

export default Chat;
