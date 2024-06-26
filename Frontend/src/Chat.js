// Chat.js

/*
We derived this from a tutorial from PedroTech, https://www.youtube.com/watch?v=NU-HfZY3ATQ

Pedro Machado. "React Socket.io Chat App." Version 1.0, Aug 26, 2021. 
Source Code. Available at: https://github.com/machadop1407/react-socketio-chat-app.
*/

import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from 'axios'; // Makes http requests from browser using GET, PUT, POST and DELETE
import io from 'socket.io-client'; // Importing socket.io-client for WebSocket connections
const socket = io.connect("http://localhost:3001");

function Chat({ contact }) {
    // State variables to manage the current message and the list of messages
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    // Function to send a message
    const sendMessage = () => {
        if (message.trim()) {
            const newMessage = {
                content: message,
                contact: contact.name,
                timestamp: new Date().toISOString()
            };
            axios.post('http://localhost:3001/messages', newMessage)
                .then(response => {
                    setMessages([...messages, response.data]);
                    setMessage("");
                    socket.emit("send_message", response.data); // Emit the message to the WebSocket server
                });
        }
    };

    // useEffect hook to listen for incoming messages
    useEffect(() => {
        axios.get(`http://localhost:3000/api/messages?contact=${contact.name}`)
            .then(response => {
                setMessages(response.data);
            })
            .catch(error => {
                console.error('Error fetching messages:', error.message);
            });
        
        socket.on("receive_message", (data) => {
            setMessages((list) => [...list, data]); // Update the message list with the received message
        });

        return () => {
            socket.off("receive_message"); // Clean up the event listener on component unmount
        };
    }, [contact.name]);

    return (
        <div className="chat-container">
            <h3>Zap with {contact.name}</h3>
            <div className="messages-container">
                <ScrollToBottom className="messages">
                    {messages.map((msg, index) => (
                        <div key={index} className="message">
                            <span>{msg.content}</span>
                            <span className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                        </div>
                    ))}
                </ScrollToBottom>
            </div>
            <div className="message-input">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Chat;
