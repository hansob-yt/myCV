import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, FileQuestion } from 'lucide-react';
import { InteractiveBackground } from '../../../shared/canvas';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 text-slate-900 dark:text-white">
      <InteractiveBackground />
      
      <div className="glass-card max-w-md w-full rounded-3xl p-8 text-center relative z-10 border border-slate-200/80 dark:border-slate-800/80 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center mx-auto mb-4">
          <FileQuestion className="w-8 h-8" />
        </div>

        <span className="text-xs font-mono font-bold text-rose-500 uppercase tracking-widest block mb-1">
          404 Error • Route Not Found
        </span>
        
        <h1 className="text-2xl font-extrabold text-slate-950 dark:text-white mb-2">
          Page Does Not Exist
        </h1>
        
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
          The route you navigated to was not found in the Feature-Sliced router registry.
        </p>

        <div className="flex flex-col sm:flex-row gap-2.5">
          <Link
            to="/"
            className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-linear-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 shadow-md shadow-sky-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to CV Home</span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
};
