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
          <div className="room">
            <label style={{fontSize: "2.5rem" , fontWeight:500 , fontStyle: 'italic'}}>Enter Room Name:</label>
            <input className="form-control" ref={roomInputRef} />
            <button className="btn btn-success " style={{padding: ".25rem 5rem .25rem 5rem", fontSize: "1.25rem", fontWeight:500, marginTop: ".5rem"}} onClick={() => setRoom(roomInputRef.current.value)}>Enter Chat</button>
          </div>
        )}

        <SignOut setIsAuth={setIsAuth} setRoom={setRoom}/>
    </>
  );
}

export default App;
