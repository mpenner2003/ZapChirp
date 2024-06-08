// Importing necessary modules
import express from "express";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import groupChatRoutes from './routes/groupChat.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import cookieParser from "cookie-parser";

// Loading environment variables from .env file
dotenv.config(); 

// Logging environment variables for debugging
console.log("Environment Variables:");
console.log("PORT:", process.env.PORT);
console.log("MONGO_DB_URL:", process.env.MONGO_DB_URL);
console.log("JWT_SECRET:", process.env.JWT_SECRET);

// Creating an instance of Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(cors()); // Enabling CORS for cross-origin requests
app.use(express.json()); // Parsing JSON request bodies
app.use(cookieParser()); // Parsing cookies

// Route setup
app.use("/api/groupChats", groupChatRoutes); // Route for group chats
app.use("/api/messages", messageRoutes); // Route for messages
app.use("/api/users", userRoutes); // Route for user-related operations
app.use("/api/auth", authRoutes); // Route for authentication

// Connect to MongoDB
connectToMongoDB();

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io server with CORS configuration
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Allowing requests from this origin
        methods: ["GET", "POST"] // Allowing these HTTP methods
    },
});

// Socket.io connection event
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

// Start the server and listen on the specified port
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



