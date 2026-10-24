// In-memory store: socketId -> { roomId, username }
const userSocketMap = {};

// Helper to get all users in a specific room
export const getAllConnectedUsers = (io, roomId) => {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => ({
      socketId,
      username: userSocketMap[socketId]?.username || "Anonymous",
    }),
  );
};

// Main room events registrar
export const registerRoomHandlers = (io, socket) => {
  // 1. Join Room Event
  socket.on("join-room", ({ roomId, username }) => {
    userSocketMap[socket.id] = { roomId, username };
    socket.join(roomId);

    const users = getAllConnectedUsers(io, roomId);
    console.log(`👤 ${username} joined room: ${roomId} (${socket.id})`);

    // Broadcast updated user list to everyone in this room
    io.to(roomId).emit("user-joined", {
      users,
      username,
      socketId: socket.id,
    });
  });

  // 2. Real-time Code Change Event
  socket.on("code-change", ({ roomId, code }) => {
    // Broadcast to everyone in this room EXCEPT sender
    socket.to(roomId).emit("code-update", code);
  });

  // 3. User Disconnecting Event
  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];
    const user = userSocketMap[socket.id];

    rooms.forEach((roomId) => {
      socket.to(roomId).emit("user-disconnected", {
        socketId: socket.id,
        username: user?.username || "A user",
      });
    });

    console.log(`❌ User left: ${user?.username || socket.id}`);
    delete userSocketMap[socket.id];
  });
};
