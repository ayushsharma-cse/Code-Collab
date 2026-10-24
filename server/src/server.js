import http from "http";
import dotenv from "dotenv";
import { Server } from "socket.io";
import app from "./app.js";
import { registerRoomHandlers } from "./sockets/roomHandler.js";

dotenv.config();

// Create raw Node HTTP server using the Express app
const server = http.createServer(app);

// Mount Socket.io on the HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Mount socket handlers
io.on("connection", (socket) => {
  registerRoomHandlers(io, socket);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 CodeCollab Server running on port ${PORT}`);
});
