/*
We followed a tutorial from PedroTech, https://www.youtube.com/watch?v=NU-HfZY3ATQ

Pedro Machado. "React Socket.io Chat App." Version 1.0, Aug 26, 2021. 
Source Code. Available at: https://github.com/machadop1407/react-socketio-chat-app.
*/

// Importing necessary modules and components
import './App.css'; // Importing CSS for styling
import io from 'socket.io-client'; // Importing socket.io-client for WebSocket connections
import { useState } from "react"; // Importing useState hook from React
import Chat from './Chat'; // Importing Chat component
import Contacts from './Contacts'; // Importing Contacts component

// Creating a socket connection to the server
const socket = io.connect("http://localhost:3001");

function App() {
  // State variables to manage username, room, and chat visibility
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  // Function to join a chat room
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room); // Emit an event to join the room
      setShowChat(true); // Show the chat component
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        // Join chat container displayed when not in chat
        <div className="joinChatContainer">
          <h3>ZapChirp</h3>
          <input 
            type="text" 
            placeholder="Username..." 
            onChange={(event) => {
              setUsername(event.target.value); // Update username state
            }}
          />
          <input 
            type="text" 
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value); // Update room state
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
          <Contacts /> {/* Display Contacts component */}
        </div>
      ) : (
        // Chat component displayed when in chat
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
