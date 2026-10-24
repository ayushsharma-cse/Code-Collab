import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  Code2,
  Sparkles,
  RefreshCw,
  Zap,
  Terminal,
  Shield,
} from "lucide-react";

const LobbyPage = () => {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  // Generate random room ID
  const handleGenerateRoomId = () => {
    const id = "collab-" + uuidv4().slice(0, 6);
    setRoomId(id);
  };

  // Navigate to EditorPage with route state
  const handleJoin = (e) => {
    e.preventDefault();
    if (!username.trim() || !roomId.trim()) {
      alert("Please enter both your name and a Room ID!");
      return;
    }
    navigate(`/editor/${roomId.trim()}`, {
      state: { username: username.trim() },
    });
  };

  return (
    <div className="relative min-h-screen bg-[#07090e] text-slate-100 flex items-center justify-center p-4 overflow-hidden select-none font-sans">
      {/* Ambient Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Lobby Glass Card */}
      <div className="relative z-10 bg-[#0d121f]/90 backdrop-blur-xl border border-slate-800/80 p-8 rounded-3xl w-full max-w-md shadow-2xl shadow-black/80">
        {/* Branding */}
        <div className="text-center mb-7">
          <div className="inline-flex p-3.5 bg-gradient-to-tr from-blue-600/20 via-indigo-500/20 to-purple-500/20 rounded-2xl border border-indigo-500/30 mb-4 shadow-lg shadow-indigo-500/10">
            <Code2 className="w-8 h-8 text-indigo-400" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            CodeCollab
          </h1>
          <p className="text-xs text-slate-400 mt-1.5 font-normal">
            Real-time pair programming for high-performance teams
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleJoin} className="space-y-4">
          <div>
            <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
              Display Name
            </label>
            <input
              type="text"
              placeholder="e.g. Ayush Sharma"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#070a12] border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none focus:border-indigo-500 transition-all font-medium placeholder:text-slate-600"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                Room Identifier
              </label>
              <button
                type="button"
                onClick={handleGenerateRoomId}
                className="text-[10px] text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Generate New</span>
              </button>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Paste or generate Room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="flex-1 bg-[#070a12] border border-slate-800 rounded-xl px-4 py-3 text-sm text-indigo-300 font-mono font-medium outline-none focus:border-indigo-500 transition-all placeholder:text-slate-600"
                required
              />
              <button
                type="button"
                onClick={handleGenerateRoomId}
                className="bg-slate-800 hover:bg-slate-700 text-xs font-semibold px-4 rounded-xl border border-slate-700 text-slate-200 transition-all cursor-pointer"
              >
                New
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-3.5 rounded-xl text-sm shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 transform active:scale-[0.98] cursor-pointer"
          >
            <span>Launch Workspace</span>
            <Sparkles className="w-4 h-4" />
          </button>
        </form>

        {/* Feature Badges */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center">
          <div className="p-1.5">
            <div className="text-[10px] font-semibold text-slate-400 flex items-center justify-center gap-1">
              <Zap className="w-3 h-3 text-yellow-400" />
              <span>&lt;50ms</span>
            </div>
            <div className="text-[9px] text-slate-500">Sync Latency</div>
          </div>
          <div className="p-1.5 border-x border-slate-800/80">
            <div className="text-[10px] font-semibold text-slate-400 flex items-center justify-center gap-1">
              <Terminal className="w-3 h-3 text-sky-400" />
              <span>70+ Langs</span>
            </div>
            <div className="text-[9px] text-slate-500">Piston Engine</div>
          </div>
          <div className="p-1.5">
            <div className="text-[10px] font-semibold text-slate-400 flex items-center justify-center gap-1">
              <Shield className="w-3 h-3 text-emerald-400" />
              <span>Isolated</span>
            </div>
            <div className="text-[9px] text-slate-500">Sandboxed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LobbyPage;
