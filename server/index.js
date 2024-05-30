// index.js

/*
We followed a tutorial from PedroTech, https://www.youtube.com/watch?v=NU-HfZY3ATQ

Pedro Machado. "React Socket.io Chat App." Version 1.0, Aug 26, 2021. 
Source Code. Available at: https://github.com/machadop1407/react-socketio-chat-app.
*/

// Importing necessary modules
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors'); //Our solution to preventing cross site request forgery
const { Server } = require("socket.io");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

const connectToMongoDB = require('./db/connectToMongoDB'); // Import the connectToMongoDB function
const JWT_SECRET = 'your_jwt_secret'; // Use a strong secret key for JWT

// Middleware setup
app.use(cors()); // Enabling CORS for cross-origin requests
app.use(bodyParser.json()); // Parsing JSON request bodies

mongoose.connect('mongodb://localhost:27017/chatApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Connect to MongoDB
connectToMongoDB();

// Creating an HTTP server
const server = http.createServer(app);

// Creating a Socket.io server with CORS configuration
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Allowing requests from this origin
        methods: ["GET", "POST"] // Allowing these HTTP methods
    },
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(400).send('Error registering user');
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
        return res.status(400).send('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).send('Invalid password');
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.status(200).send({ token });
});




// In-memory storage for contacts
let contacts = [];

// Route to add a new contact
app.post('/contacts', authenticateToken, (req, res) => {
    const contact = req.body; // Getting the contact data from the request body
    contacts.push(contact); // Adding the contact to the contacts array
    res.status(201).send(contact); // Sending a response with status 201 (Created)
});

// Route to get all contacts
app.get('/contacts', authenticateToken, (req, res) => {
    res.send(contacts); // Sending the contacts array as the response
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}


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
