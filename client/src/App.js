/*
We followed a tutorial from PedroTech, https://www.youtube.com/watch?v=NU-HfZY3ATQ

Pedro Machado. "React Socket.io Chat App." Version 1.0, Aug 26, 2021. 
Source Code. Available at: https://github.com/machadop1407/react-socketio-chat-app.
*/

import './App.css';
import io from 'socket.io-client'
import { useState } from "react";
import Chat from './Chat';
import Contacts from './Contacts';

const socket = io.connect("http://localhost:3001")
function App() {

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if(username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
    

  };

  return (
    <div className="App">
      {!showChat ? (
      <div className="joinChatContainer">
        <h3>ZapChirp</h3>
        <input 
          type="text" 
          placeholder="Username..." 
          onChange={(event) => {
            setUsername(event.target.value)
          }}
        />
        <input 
          type="text" 
          placeholder="Room ID..."
          onChange={(event) => {
            setRoom(event.target.value);
          }}
        />
        <button onClick={joinRoom}>Join A Room</button>
        <Contacts />
      </div>
        )
      : (
      <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
