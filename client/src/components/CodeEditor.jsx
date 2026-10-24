import React from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ language, code, onChange }) => {
  return (
    <div className="flex-1 h-full bg-[#1e1e1e] relative overflow-hidden">
      <Editor
        height="100%"
        theme="vs-dark"
        language={language}
        value={code}
        onChange={(value) => onChange(value || "")}
        options={{
          fontSize: 14,
          minimap: { enabled: true },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: "on",
          fontFamily: "'Fira Code', 'Cascadia Code', Consolas, monospace",
          fontLigatures: true,
          cursorBlinking: "smooth",
          smoothScrolling: true,
          padding: { top: 12 },
        }}
      />
    </div>
  );
};

export default CodeEditor;
