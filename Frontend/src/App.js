// App.js

/*
We derived this from a tutorial from PedroTech, https://www.youtube.com/watch?v=NU-HfZY3ATQ

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
import Register from './Register'; // Importing User Registration component
import CreateGroupChat from './CreateGroupChat'; // Importing CreateGroupChat component
import axios from 'axios'; // Makes http requests from browser using GET, PUT, POST and DELETE
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'; // React Router to route our code

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
  const [contacts, setContacts] = useState([]);
  const [groupChats, setGroupChats] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  

  useEffect(() => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
    setShowChat(true); // Show chat when a contact is selected
  };

  const handleGroupCreated = (newGroup) => {
    setGroupChats([...groupChats, newGroup]);
  };

  // Function to join a chat room
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room); // Emit an event to join the room
      setRoom(room);
      setShowChat(true); // Show the chat component
    }
    
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login setLoggedIn={setLoggedIn} setToken={setToken} />} />
          <Route path="/register" element={<Register setRegistered={() => setLoggedIn(true)} />} />
          <Route path="/chat" element={
            !loggedIn ? (
              showRegister ? (
                <Register setRegistered={() => setShowRegister(false)} />
              ) : (
                  <Login setLoggedIn={setLoggedIn} setToken={setToken} setShowRegister={setShowRegister} />
              )
            ) : !showChat ? (
              <div className="joinChatContainer">
                <h3>ZapChirp</h3>
                <CreateGroupChat onGroupCreated={handleGroupCreated} />
                <div className="groupChats">
                  <h2>Group Chats</h2>
                  {groupChats.map(group => (
                    <div key={group._id}>
                      <h3>{group.groupName}</h3>
                      <p>Members: {group.members.join(', ')}</p>
                    </div>
                  ))}
                </div>
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
                <Contacts onSelectContact={handleSelectContact} contacts={contacts} addContact={setContacts}/> {/* Display Contacts component */}
              </div>
                ) : (
                <Chat socket={socket} username={username} room={room} contact={selectedContact}/>
            )} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
