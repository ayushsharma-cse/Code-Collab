import express from "express";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import { server } from "socket.io";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

//creating raw http server
const server = http.createServer(app);

// Attach Socket.io to the HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Your React Vite frontend URL
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("CodeCollab Backend Server is Running!");
});

// Listen for incoming WebSocket connections
io.on("connection", (socket) => {
  console.log(`⚡ New user connected with Socket ID: ${socket.id}`);
  // Listen for a test ping from the client
  socket.on("ping-server", (data) => {
    console.log("Received from client:", data);
    // Send a message back to that specific user
    socket.emit("pong-client", {
      message: "Hello from Node.js Server! 🚀",
      time: new Date(),
    });
  });
  // When user closes tab or disconnects
  socket.on("disconnect", () => {
    console.log(`❌ User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(` Server listening on port ${PORT}`);
});
