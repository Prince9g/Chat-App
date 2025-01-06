import { useState, useRef } from "react";
import "./App.css";
import { Auth } from "./components/Auth";
import Cookies from "universal-cookie";
import { Chat } from "./components/Chat";

import 'bootstrap/dist/css/bootstrap.min.css';
import SignOut from "./components/SignOut";

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef();


  if (!isAuth) {
    return (
      <>
        <Auth setIsAuth={setIsAuth}/>
      </>
    );
  }
  return (
    <>
        {room ? (
          <Chat room={room}/>
        ) : (
          <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col justify-center items-center border-2 border-sky-200 p-14 rounded-3xl">
              <img src="https://cdn-icons-gif.flaticon.com/11186/11186861.gif" className="absolute top-0 h-[25%]"></img>
            <label className="text-2xl font-semibold mb-2">Enter Room Name:</label>
            <div className="flex flex-col">
            <input className="border-2 rounded-full p-1" ref={roomInputRef} />
            <button className="border rounded-full bg-sky-200 hover:bg-sky-300 mt-2 pl-4 pr-4 p-1" onClick={() => setRoom(roomInputRef.current.value)}>Enter Chat</button>
            </div>
            </div>
          </div>
        )}

        <SignOut setIsAuth={setIsAuth} setRoom={setRoom}/>
    </>
  );
}

export default App;
