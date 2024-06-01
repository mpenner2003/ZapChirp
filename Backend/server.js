import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

app.use(express.json()); //To parse the incoming requests with JSON payloads. (from req.body)

app.use("/api/auth", authRoutes);

//app.get("/", (req, res) => {
    // root route http://localhost:5000/
  //  res.send("Hello World!!");
//});

// Connect to MongoDB
connectToMongoDB();

// Routes setup
app.use("/api/auth", authRoutes);

app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
});


