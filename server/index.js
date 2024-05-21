/*
We followed a tutorial from PedroTech, https://www.youtube.com/watch?v=NU-HfZY3ATQ

Pedro Machado. "React Socket.io Chat App." Version 1.0, Aug 26, 2021. 
Source Code. Available at: https://github.com/machadop1407/react-socketio-chat-app.
*/

// Importing necessary modules
const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors'); 
const { Server } = require("socket.io");
const bodyParser = require('body-parser');

// Middleware setup
app.use(cors()); // Enabling CORS for cross-origin requests
app.use(bodyParser.json()); // Parsing JSON request bodies

// Creating an HTTP server
const server = http.createServer(app);

// Creating a Socket.io server with CORS configuration
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Allowing requests from this origin
        methods: ["GET", "POST"] // Allowing these HTTP methods
    },
});

// In-memory storage for contacts
let contacts = [];

// Route to add a new contact
app.post('/contacts', (req, res) => {
    const contact = req.body; // Getting the contact data from the request body
    contacts.push(contact); // Adding the contact to the contacts array
    res.status(201).send(contact); // Sending a response with status 201 (Created)
});

// Route to get all contacts
app.get('/contacts', (req, res) => {
    res.send(contacts); // Sending the contacts array as the response
});

// Handling Socket.io connections
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`); // Logging the connected user's socket ID
    
    // Handling the join_room event
    socket.on("join_room", (data) => {
        socket.join(data); // Joining the specified room
        console.log(`User with ID: ${socket.id} joined room: ${data}`); // Logging the room join event
    });

    // Handling the send_message event
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data); // Emitting the message to other users in the room
    });

    // Handling the disconnect event
    socket.on("disconnect", () => {
        console.log("User Disconnected:", socket.id); // Logging the disconnect event
    });
});

// Starting the server and listening on port 3001
server.listen(3001, () => {
    console.log("SERVER RUNNING"); // Logging that the server is running
});
