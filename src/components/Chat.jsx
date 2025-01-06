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
    <div className="flex flex-col items-start justify-start mb-12">
      <div className="mb-2 border-2 border-sky-200 rounded-lg w-full">
        <h1>You're Welcome in: <span className="text-sky-300">{room.toUpperCase()}</span></h1>
      </div>
      <div className="">
        {messages.map((message) => (
          <div className="mb-2" key={message.id}>
            <span className="user"><span className="font-semibold italic">{message.user + " : "}</span></span>
            {message.text}
            {/* you can make here time stamp */}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex w-full border-2 border-sky-200 rounded-lg">
        <input
          className="w-full m-2 focus:outline-none border p-1 rounded"
          placeholder="Type your Message Here..."
          onChange={(e) => {
            setNewMessage(e.target.value);
          }}
          value={newMessage}
        />
        <button type="submit" className="border bg-sky-300  hover:bg-sky-400 pl-[5%] pr-[5%] rounded-lg">
          Send
        </button>
      </form>
    </div>
  );
};
