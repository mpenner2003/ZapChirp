/*
We followed a tutorial from PedroTech, https://www.youtube.com/watch?v=NU-HfZY3ATQ

Pedro Machado. "React Socket.io Chat App." Version 1.0, Aug 26, 2021. 
Source Code. Available at: https://github.com/machadop1407/react-socketio-chat-app.
*/

import React, {useEffect, useState} from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({socket, username, room}) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if(currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]); 
            setCurrentMessage(""); 
        }
    };
    
    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
        });
        return () => {
            socket.off("receive_message");
        };
    }, [socket]);
    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Zap Room</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className = "message-container">
                {messageList.map((messageContent) => {
                    return (
                        <div className="message" id={username === messageContent.author ? "you" : "other"}>
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
                    type = "text" 
                    value={currentMessage}
                    placeholder="Type Something..." 
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                    onKeyPress={(event) => {event.key === "Enter" && sendMessage();}}
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}

export default Chat;