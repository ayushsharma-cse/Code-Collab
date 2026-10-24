import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

// Import our Lego bricks
import Navbar from "../components/Navbar";
import CodeEditor from "../components/CodeEditor";
import Collaborators from "../components/Collaborators";
import StatusBar from "../components/StatusBar";

// Import our constants
import { DEFAULT_LANGUAGE } from "../constants/languages";
import { STARTER_CODE } from "../constants/starterCode";

// Connect to backend Socket.io server
const socket = io("http://localhost:5000");

const EditorPage = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Get username from route state (or fallback)
  const [username] = useState(
    location.state?.username || "Guest_" + Math.floor(Math.random() * 1000),
  );

  // 2. Editor & Room State
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [code, setCode] = useState(STARTER_CODE[DEFAULT_LANGUAGE]);
  const [users, setUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(socket.connected);

  // Prevents cursor loop when remote text arrives
  const isLocalChange = useRef(false);

  // 3. Setup Socket Listeners
  useEffect(() => {
    // If no room ID is present in URL, redirect to lobby
    if (!roomId) {
      navigate("/");
      return;
    }

    // Join the room
    socket.emit("join-room", { roomId, username });

    // Connection handlers
    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);

    // When someone joins, update the online users list
    const handleUserJoined = ({ users }) => {
      setUsers(users);
    };

    // When someone else types code in this room
    const handleCodeUpdate = (newCode) => {
      isLocalChange.current = true;
      setCode(newCode);
    };

    // When a user leaves the room
    const handleUserDisconnected = ({ socketId }) => {
      setUsers((prev) => prev.filter((u) => u.socketId !== socketId));
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("user-joined", handleUserJoined);
    socket.on("code-update", handleCodeUpdate);
    socket.on("user-disconnected", handleUserDisconnected);

    // Cleanup listeners on unmount
    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("user-joined", handleUserJoined);
      socket.off("code-update", handleCodeUpdate);
      socket.off("user-disconnected", handleUserDisconnected);
    };
  }, [roomId, username, navigate]);

  // Handle typing inside Monaco Editor
  const handleCodeChange = (newCode) => {
    if (isLocalChange.current) {
      isLocalChange.current = false;
      return;
    }
    setCode(newCode);
    // Broadcast changes to everyone else in this room
    socket.emit("code-change", { roomId, code: newCode });
  };

  // Handle language switch
  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    if (STARTER_CODE[newLang]) {
      const template = STARTER_CODE[newLang];
      setCode(template);
      socket.emit("code-change", { roomId, code: template });
    }
  };

  // Run Code placeholder (Milestone 6 will wire this to Piston API)
  const handleRunCode = () => {
    alert("Code execution will connect to Piston API in Milestone 6! 🚀");
  };

  // Leave Room: navigate back to lobby
  const handleLeaveRoom = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col h-screen bg-[#07090e] text-slate-100 font-sans overflow-hidden">
      {/* 1. Top Navbar */}
      <Navbar
        roomId={roomId}
        language={language}
        onLanguageChange={handleLanguageChange}
        onRunCode={handleRunCode}
        onLeaveRoom={handleLeaveRoom}
      />

      {/* 2. Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Center: Monaco Editor */}
        <CodeEditor
          language={language}
          code={code}
          onChange={handleCodeChange}
        />

        {/* Right Sidebar: Active Collaborators */}
        <Collaborators
          users={users}
          currentSocketId={socket.id}
          roomId={roomId}
        />
      </div>

      {/* 3. Bottom Status Bar */}
      <StatusBar language={language} isConnected={isConnected} />
    </div>
  );
};

export default EditorPage;
