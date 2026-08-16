import React from 'react';
import { interactiveExtras } from '../../../entities/code-snippet';
import { useTheme } from '../../../app/providers/theme-provider';
import { triggerCelebration, triggerFireworks } from '../../../shared/lib';
import { 
  Sparkles, 
  Terminal, 
  FileText, 
  Palette, 
  Sun,
  Moon,
  Mail, 
  ArrowRight
} from 'lucide-react';

interface InteractiveExtrasProps {
  onOpenTerminal: () => void;
  onPrintResume: () => void;
  onScrollToContact: () => void;
}

export const InteractiveExtras: React.FC<InteractiveExtrasProps> = ({
  onOpenTerminal,
  onPrintResume,
  onScrollToContact,
}) => {
  const { mode, themeConfig, toggleMode, cycleAtmosphere } = useTheme();

  const handleAction = (type: string) => {
    if (type === 'terminal') {
      onOpenTerminal();
    } else if (type === 'pdf') {
      triggerCelebration();
      onPrintResume();
    } else if (type === 'theme') {
      cycleAtmosphere();
      triggerFireworks();
    } else if (type === 'contact') {
      onScrollToContact();
    }
  };

  const getIcon = (actionType: string) => {
    switch (actionType) {
      case 'terminal':
        return <Terminal className="w-6 h-6 text-sky-500 dark:text-sky-400" />;
      case 'pdf':
        return <FileText className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />;
      case 'theme':
        return <Palette className="w-6 h-6 text-purple-500 dark:text-purple-400" />;
      case 'contact':
        return <Mail className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-sky-500 dark:text-sky-400" />;
    }
  };

  return (
    <section id="extras" className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-gradient-to-r from-sky-500/10 to-indigo-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERACTIVE EXTRAS &amp; CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white">
            Interactive Innovation Hub
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
            Explore advanced tools, real code architecture snippets, downloadable resume layouts, Day/Night modes, and custom background atmospheres.
          </p>
        </div>

        {/* Extras Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {interactiveExtras.map((extra) => {
            const isTheme = extra.actionType === 'theme';

            return (
              <div
                key={extra.id}
                className="glass-card glass-card-hover rounded-3xl p-6 sm:p-8 flex flex-col justify-between group relative overflow-hidden shadow-lg"
              >
                {/* Background Hover Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-2xl group-hover:bg-sky-500/15 transition-all pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-sm group-hover:scale-110 transition-transform">
                      {getIcon(extra.actionType)}
                    </div>

                    <span className="text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Interactive Feature
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors mb-1">
                    {extra.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {isTheme 
                      ? `Active Atmosphere: ${themeConfig.name} (${mode === 'light' ? '☀️ Day Light Mode' : '🌙 Night Dark Mode'}). Click to cycle atmosphere colors or toggle Day/Night.` 
                      : extra.description}
                  </p>
                </div>

                {isTheme ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAction('theme')}
                      className="flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 shadow-md shadow-sky-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Palette className="w-4 h-4" />
                      <span>Switch Color ({themeConfig.name})</span>
                    </button>
                    <button
                      onClick={toggleMode}
                      className="p-2.5 rounded-xl text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
                      title={mode === 'dark' ? 'Switch to Day (Light) Mode' : 'Switch to Night (Dark) Mode'}
                    >
                      {mode === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAction(extra.actionType)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 dark:text-white bg-slate-100 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/80 transition-all flex items-center justify-center gap-2 hover:border-sky-500/50 group/btn cursor-pointer shadow-md"
                  >
                    <span>{extra.actionText}</span>
                    <ArrowRight className="w-4 h-4 text-sky-500 dark:text-sky-400 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
