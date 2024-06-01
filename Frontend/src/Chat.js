// Chat.js

/*
We derived this from a tutorial from PedroTech, https://www.youtube.com/watch?v=NU-HfZY3ATQ

Pedro Machado. "React Socket.io Chat App." Version 1.0, Aug 26, 2021. 
Source Code. Available at: https://github.com/machadop1407/react-socketio-chat-app.
*/

import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, room }) {
    // State variables to manage the current message and the list of messages
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    // Function to send a message
    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData); // Emit the send_message event to the server
            setMessageList((list) => [...list, messageData]); // Update the message list with the new message
            setCurrentMessage(""); // Clear the current message input field
        }
    };

    // useEffect hook to listen for incoming messages
    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]); // Update the message list with the received message
        });
        return () => {
            socket.off("receive_message"); // Clean up the event listener on component unmount
        };
    }, [socket]);

    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Zap Room</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {messageList.map((messageContent, index) => {
                        return (
                            <div key={index} className="message" id={username === messageContent.author ? "you" : "other"}>
                                <div>
                                    <div className="message-content">
                                        <p>{messageContent.message}</p>
                                    </div>
                                    <div className="message-meta">
                                        <p id="time">{messageContent.time}</p>
                                        <p id="author">{messageContent.author}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input 
                    type="text" 
                    value={currentMessage}
                    placeholder="Type Something..." 
                    onChange={(event) => {
                        setCurrentMessage(event.target.value); // Update the current message state
                    }}
                    onKeyPress={(event) => {event.key === "Enter" && sendMessage();}} // Send message on Enter key press
                />
                <button onClick={sendMessage}>&#9658;</button> {/* Send message on button click */}
            </div>
        </div>
    );
}

export default Chat;
