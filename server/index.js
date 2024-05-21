/*
We followed a tutorial from PedroTech, https://www.youtube.com/watch?v=NU-HfZY3ATQ

Pedro Machado. "React Socket.io Chat App." Version 1.0, Aug 26, 2021. 
Source Code. Available at: https://github.com/machadop1407/react-socketio-chat-app.
*/

const express = require('express');
const app = express()
const http = require('http');
const cors = require('cors'); 
const { Server } = require("socket.io")
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    },
});

let contacts = [];
app.post('/contacts', (req, res) => {
    const contact = req.body;
    contacts.push(contact);
    res.status(201).send(contact);
});

app.get('/contacts', (req, res) => {
    res.send(contacts);
});


io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    
    socket.on("join_room", (data) => {
        socket.join(data)
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    })

    socket.on("send_message", (data) => {
        
        socket.to(data.room).emit("receive_message", data);
        
    });
    socket.on("disconnect", () => {
        console.log("User Disconnected:", socket.id);
    });
});


server.listen(3001, () => {
    console.log("SERVER RUNNING");
});

