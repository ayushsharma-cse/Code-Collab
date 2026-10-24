import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LobbyPage from "./pages/LobbyPage";
import EditorPage from "./pages/EditorPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LobbyPage />} />
        <Route path="/editor/:roomId" element={<EditorPage />} />
        {/* Fallback for any unknown route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
