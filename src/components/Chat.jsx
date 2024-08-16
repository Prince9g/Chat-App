import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  serverTimestamp,
  where,
  orderBy
} from "firebase/firestore";
import { auth, db } from "../firebase-config";

export const Chat = ({ room }) => {
  const [newMessage, setNewMessage] = useState("");

  const [messages, setMessages] = useState([]);

  const messagesRef = collection(db, "Messages");

  useEffect(() => {
    const queryMessages = query(messagesRef, where("room", "==", room), orderBy("createdAt"));
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });

      setMessages(messages);
    });

    return () => unsubscribe();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newMessage === "") return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });
    setNewMessage("");
  };
  return (
    <div className="chat-app">
      <div className="header">
        <h1>You're Welcome in: {room.toUpperCase()}</h1>
      </div>
      <div className="messages">
        {messages.map((message) => (
          <div className="message" key={message.id}>
            <span className="user">{message.user + " : "}</span>
            {message.text}
            {/* you can make here time stamp */}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="new-msg">
        <input
          className="new-msg-input form-control"
          placeholder="Type your Message Here..."
          onChange={(e) => {
            setNewMessage(e.target.value);
          }}
          value={newMessage}
        />
        <button type="submit" className="send-btn btn btn-success">
          Send
        </button>
      </form>
    </div>
  );
};
