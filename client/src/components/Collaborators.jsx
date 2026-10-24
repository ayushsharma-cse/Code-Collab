import React, { useState } from "react";
import { Users, Crown, Copy, Check } from "lucide-react";

const Collaborators = ({ users, currentSocketId, roomId }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <aside className="w-64 bg-[#080b12] border-l border-slate-800/80 p-4 flex flex-col justify-between select-none">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs font-semibold text-slate-300 tracking-wide uppercase">
              Collaborators
            </span>
          </div>
          <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] font-bold px-2 py-0.5 rounded-full">
            {users.length} Online
          </span>
        </div>

        {/* User List */}
        <div className="space-y-2.5">
          {users.map((user, index) => {
            const isMe = user.socketId === currentSocketId;
            const isOwner = index === 0; // First person in room is owner

            return (
              <div
                key={user.socketId}
                className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                  isMe
                    ? "bg-slate-900/80 border-indigo-500/30 shadow-sm"
                    : "bg-slate-900/40 border-slate-800/70"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {/* Avatar */}
                  <div className="relative">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-white shadow-md ${
                        isOwner
                          ? "bg-gradient-to-tr from-blue-600 to-indigo-600"
                          : "bg-gradient-to-tr from-purple-600 to-pink-600"
                      }`}
                    >
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    {/* Active green dot */}
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#080b12] absolute -bottom-0.5 -right-0.5"></span>
                  </div>

                  {/* Username & Role */}
                  <div>
                    <div className="text-xs font-semibold text-slate-100 flex items-center gap-1">
                      <span>{user.username}</span>
                      {isMe && (
                        <span className="text-[10px] text-slate-400">
                          (You)
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-indigo-400 font-medium">
                      {isOwner ? "Room Owner" : "Editor"}
                    </div>
                  </div>
                </div>

                {/* Owner Crown or Member indicator */}
                {isOwner ? (
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Invite Card */}
      <div className="bg-gradient-to-b from-slate-900 to-[#07090e] border border-slate-800 p-3 rounded-xl text-center">
        <p className="text-xs font-semibold text-slate-300">Invite Teammates</p>
        <p className="text-[10px] text-slate-400 mt-0.5 mb-2.5">
          Share room ID to code together in real-time
        </p>
        <button
          onClick={handleCopy}
          className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium py-1.5 rounded-lg border border-slate-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy Room ID</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Collaborators;
