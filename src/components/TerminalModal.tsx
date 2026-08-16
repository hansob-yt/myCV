import React, { useState } from 'react';
import { codeSnippets } from '../data/cvData';
import { 
  X, 
  Terminal, 
  Copy, 
  Check, 
  FileCode 
} from 'lucide-react';
import { triggerCelebration } from '../utils/confetti';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose }) => {
  const [activeSnippetId, setActiveSnippetId] = useState<string>(codeSnippets[0].id);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentSnippet = codeSnippets.find((s) => s.id === activeSnippetId) || codeSnippets[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    triggerCelebration();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 overflow-y-auto terminal-modal animate-fadeIn">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity"
      />

      {/* Terminal IDE Window */}
      <div className="relative w-full max-w-4xl bg-[#0d1117] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden z-10 my-6 flex flex-col max-h-[90vh]">
        
        {/* Terminal Title Bar */}
        <div className="px-4 py-3 bg-[#161b22] border-b border-slate-800 flex items-center justify-between select-none">
          
          {/* Mac-style traffic light dots */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 cursor-pointer" onClick={onClose} />
            <div className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 cursor-pointer" />
            <span className="text-xs font-mono text-slate-400 ml-2 hidden sm:inline-flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-sky-400" />
              Sobhan Khademi — Developer Architecture Explorer
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
              title="Copy snippet"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
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

        {/* Tab Strip */}
        <div className="flex overflow-x-auto bg-[#0d1117] border-b border-slate-800 px-2 pt-2 gap-1 scrollbar-none">
          {codeSnippets.map((snippet) => {
            const isActive = activeSnippetId === snippet.id;
            return (
              <button
                key={snippet.id}
                onClick={() => setActiveSnippetId(snippet.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-t-lg text-xs font-mono border-t border-x transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#161b22] border-slate-700 text-sky-400 font-semibold border-b-transparent -mb-[1px]'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <FileCode className={`w-3.5 h-3.5 ${isActive ? 'text-sky-400' : 'text-slate-500'}`} />
                <span>{snippet.filename.split('/').pop()}</span>
              </button>
            );
          })}
        </div>

        {/* Snippet Context Bar */}
        <div className="px-5 py-3 bg-[#13171f] border-b border-slate-800 text-xs text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sky-400 font-bold">{currentSnippet.title}:</span>
            <span className="text-slate-400 text-xs">{currentSnippet.description}</span>
          </div>
          <span className="font-mono text-[11px] text-slate-500 shrink-0">
            {currentSnippet.language.toUpperCase()} • UTF-8
          </span>
        </div>

        {/* Code Body with Line Numbers */}
        <div className="p-4 sm:p-6 overflow-y-auto font-mono text-xs sm:text-[13px] leading-relaxed text-slate-200 bg-[#0d1117] flex-1">
          <div className="table w-full">
            {currentSnippet.code.split('\n').map((line, idx) => (
              <div key={idx} className="table-row hover:bg-slate-900/80 transition-colors">
                <span className="table-cell select-none pr-4 text-right text-slate-600 text-xs font-mono w-10">
                  {idx + 1}
                </span>
                <span className="table-cell whitespace-pre font-mono text-slate-200">
                  {/* Basic syntax coloring highlights */}
                  {line.startsWith('//') || line.startsWith(' *') || line.startsWith('/**') ? (
                    <span className="text-slate-500 italic">{line}</span>
                  ) : line.includes('import ') || line.includes('export ') || line.includes('const ') || line.includes('let ') || line.includes('return ') ? (
                    <span>
                      {line.split(/(import|from|export|const|let|return|async|await|type|interface|default|function)/g).map((part, pIdx) => {
                        if (['import', 'from', 'export', 'const', 'let', 'return', 'async', 'await', 'type', 'interface', 'default', 'function'].includes(part)) {
                          return <span key={pIdx} className="text-purple-400 font-semibold">{part}</span>;
                        }
                        return <span key={pIdx}>{part}</span>;
                      })}
                    </span>
                  ) : (
                    line
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Terminal Footer */}
        <div className="px-5 py-3 bg-[#161b22] border-t border-slate-800 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>FSD Architecture v2.1 • TypeScript Strict</span>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          >
            Close Explorer
          </button>
        </div>

      </div>
    </div>
  );
};
