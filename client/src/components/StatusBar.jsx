import React from "react";

const StatusBar = ({ language, isConnected }) => {
  return (
    <footer className="bg-[#05070d] border-t border-slate-800/80 px-4 py-1 flex items-center justify-between text-[11px] text-slate-500 select-none z-20">
      {/* Left Metadata */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-indigo-400 font-medium">
          <span>⑂</span>
          <span>main</span>
        </div>
        <div>Spaces: 2</div>
        <div>UTF-8</div>
      </div>

      {/* Right Connection Status */}
      <div className="flex items-center gap-4 font-medium">
        <div className="flex items-center gap-1 text-emerald-400">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isConnected ? "bg-emerald-400" : "bg-amber-400 animate-pulse"
            }`}
          ></span>
          <span>
            {isConnected ? "Socket: Connected" : "Socket: Reconnecting..."}
          </span>
        </div>
        <div>Monaco Engine</div>
        <div className="uppercase text-slate-400 font-semibold">{language}</div>
      </div>
    </footer>
  );
};

export default StatusBar;
