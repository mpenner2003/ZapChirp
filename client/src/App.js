/*
We followed a tutorial from PedroTech, https://www.youtube.com/watch?v=NU-HfZY3ATQ

Pedro Machado. "React Socket.io Chat App." Version 1.0, Aug 26, 2021. 
Source Code. Available at: https://github.com/machadop1407/react-socketio-chat-app.
*/

// Importing necessary modules and components
import './App.css'; // Importing CSS for styling
import io from 'socket.io-client'; // Importing socket.io-client for WebSocket connections
import { useState, useEffect } from "react"; // Importing useState hook from React
import Chat from './Chat'; // Importing Chat component
import Contacts from './Contacts'; // Importing Contacts component
import Login from './Login'; // Importing User Authentication component
import Register from './Register';
import axios from 'axios';

// Creating a socket connection to the server
const socket = io.connect("http://localhost:3001");

function App() {
  // State variables to manage username, room, and chat visibility
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  // Function to join a chat room
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room); // Emit an event to join the room
      setRoom(room);
      setShowChat(true); // Show the chat component
    }
  };

  return (
    <div className="App">
      {!loggedIn ? (
        showRegister ? (
          <Register setRegistered={() => setShowRegister(false)} />
        ) : (
            <Login setLoggedIn={setLoggedIn} setToken={setToken} setShowRegister={setShowRegister} />
        )
      ) : !showChat ? (
          <div className="joinChatContainer">
              <h3>ZapChirp</h3>
              <Contacts onContactClick={joinRoom} />
              <input
                  type="text"
                  placeholder="Room ID..."
                  onChange={(event) => {
                    setRoom(event.target.value);
                  }}
              />
              <button onClick={() => joinRoom(room)}>Join A Room</button>
          </div>
      ) : (
          <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
