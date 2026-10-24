import React, { useState } from "react";
import { Copy, Check, Play, LogOut } from "lucide-react";
import { LANGUAGES } from "../constants/languages";

const Navbar = ({
  roomId,
  language,
  onLanguageChange,
  onRunCode,
  onLeaveRoom,
}) => {
  const [copied, setCopied] = useState(false);

  // Copy Room Link to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <nav className="bg-[#0b0f19] border-b border-slate-800/80 px-5 py-2.5 flex items-center justify-between select-none z-20">
      {/* Left: Branding & Room Badge */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 pr-3 border-r border-slate-800">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-xs font-bold shadow-md shadow-indigo-500/20">
            ⚡
          </div>
          <span className="font-bold text-sm tracking-tight text-white">
            CodeCollab
          </span>
        </div>
        {/* Room Pill */}
        <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 rounded-lg px-2.5 py-1 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block"></span>
          <span className="text-slate-400 text-[11px]">Room:</span>
          <span className="font-mono text-indigo-300 font-semibold text-xs">
            {roomId}
          </span>
          <button
            onClick={handleCopy}
            className="bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 text-[10px] font-medium px-2 py-0.5 rounded border border-indigo-500/30 transition-all flex items-center gap-1 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
      {/* Right Actions: Language Selector, Run Code, Leave */}
      <div className="flex items-center gap-3">
        {/* Dynamic Language Selector from Constants */}
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="bg-slate-900 border border-slate-800 text-xs text-slate-200 rounded-lg px-3 py-1.5 outline-none font-medium cursor-pointer hover:border-slate-700 transition-colors"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.id} value={lang.id}>
              {lang.name}
            </option>
          ))}
        </select>
        {/* Run Code Button */}
        <button
          onClick={onRunCode}
          className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-bold px-4 py-1.5 rounded-lg shadow-lg shadow-emerald-500/25 flex items-center gap-1.5 transition-all transform active:scale-95 cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Run Code</span>
        </button>
        {/* Leave Room Button */}
        <button
          onClick={onLeaveRoom}
          className="text-slate-400 hover:text-red-400 text-xs font-medium px-2.5 py-1.5 rounded-lg hover:bg-red-500/10 transition-colors flex items-center gap-1 cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Leave</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
