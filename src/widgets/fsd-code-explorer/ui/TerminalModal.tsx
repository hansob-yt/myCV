import React, { useState, useEffect } from 'react';
import { codeSnippets } from '../../../entities/code-snippet';
import { 
  X, 
  Copy, 
  Check, 
  Terminal, 
  FileCode, 
  Sparkles,
  Layers
} from 'lucide-react';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose }) => {
  const [activeSnippetId, setActiveSnippetId] = useState<string>(codeSnippets[0].id);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentSnippet = codeSnippets.find(s => s.id === activeSnippetId) || codeSnippets[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
      />

      {/* Terminal Window Frame */}
      <div className="relative w-full max-w-4xl bg-[#0d1117] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden z-10 my-auto flex flex-col h-[85vh] max-h-[800px] text-slate-200 font-mono">
        
        {/* Top OS Window Bar */}
        <div className="h-12 min-h-[48px] max-h-12 shrink-0 px-4 bg-[#161b22] border-b border-slate-800 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80 hover:opacity-100 cursor-pointer" onClick={onClose} />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-xs text-slate-400 font-sans font-medium ml-3 flex items-center gap-1.5 truncate">
              <Terminal className="w-3.5 h-3.5 text-sky-400" />
              <span>FSD Architecture &amp; Code Inspector — {personalBioNameFallback}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Header */}
        <div className="h-11 min-h-[44px] max-h-11 shrink-0 px-2 bg-[#090d13] border-b border-slate-800 flex items-center gap-1 overflow-x-auto select-none">
          {codeSnippets.map((snippet) => {
            const isActive = activeSnippetId === snippet.id;
            return (
              <button
                key={snippet.id}
                onClick={() => setActiveSnippetId(snippet.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#161b22] text-sky-400 border border-slate-700 font-medium'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                }`}
              >
                <FileCode className={`w-3.5 h-3.5 ${isActive ? 'text-sky-400' : 'text-slate-500'}`} />
                <span>{snippet.filename}</span>
              </button>
            );
          })}
        </div>

        {/* Snippet Description Banner */}
        <div className="shrink-0 p-3 bg-sky-950/20 border-b border-slate-800/80 text-xs text-sky-300/90 font-sans flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-white">{currentSnippet.title}: </span>
            <span>{currentSnippet.description}</span>
          </div>
        </div>

        {/* Code Content Body */}
        <div className="flex-1 min-h-0 overflow-auto p-4 bg-[#0d1117] text-xs sm:text-[13px] leading-relaxed">
          <pre className="m-0 font-mono text-slate-300">
            <code>
              {currentSnippet.code.split('\n').map((line, lineIdx) => (
                <div key={lineIdx} className="table-row">
                  <span className="table-cell select-none pr-4 text-slate-600 text-right w-8 text-[11px]">
                    {lineIdx + 1}
                  </span>
                  <span className="table-cell whitespace-pre">
                    {line}
                  </span>
                </div>
              ))}
            </code>
          </pre>
        </div>

        {/* Terminal Status Bar */}
        <div className="h-7 min-h-[28px] max-h-7 shrink-0 px-3 bg-[#161b22] border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between font-sans select-none">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-sky-400">
              <Layers className="w-3 h-3" />
              FSD v2.1 Strict
            </span>
            <span>UTF-8</span>
            <span>TypeScript</span>
          </div>
          <span>Press ESC or click outside to exit</span>
        </div>

      </div>

    </div>
  );
};

const personalBioNameFallback = 'Sobhan Khademi Sohi';
