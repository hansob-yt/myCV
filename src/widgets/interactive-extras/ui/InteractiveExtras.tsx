import React from 'react';
import { interactiveExtras } from '../../../entities/code-snippet';
import { useTheme } from '../../../app/providers/theme-provider';
import { triggerFireworks } from '../../../shared/lib';
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
        return <Terminal className="w-5 h-5 text-sky-500 dark:text-sky-400" />;
      case 'pdf':
        return <FileText className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />;
      case 'theme':
        return <Palette className="w-5 h-5 text-purple-500 dark:text-purple-400" />;
      case 'contact':
        return <Mail className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-sky-500 dark:text-sky-400" />;
    }
  };

  return (
    <section id="extras" className="py-16 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERACTIVE EXTRAS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">
            Interactive Capabilities
          </h2>
        </div>

        {/* Extras Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {interactiveExtras.map((extra) => {
            const isTheme = extra.actionType === 'theme';

            return (
              <div
                key={extra.id}
                className="glass-card glass-card-hover rounded-2xl p-5 flex flex-col justify-between group shadow-sm border border-slate-200/90 dark:border-slate-800/80"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-sky-500 border border-slate-200 dark:border-slate-700/80 shrink-0">
                      {getIcon(extra.actionType)}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors">
                      {extra.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
                    {isTheme 
                      ? `Atmosphere: ${themeConfig.name} (${mode === 'light' ? 'Day' : 'Night'}). Cycle colors or toggle mode.` 
                      : extra.description}
                  </p>
                </div>

                {isTheme ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAction('theme')}
                      className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Palette className="w-3.5 h-3.5" />
                      <span>{themeConfig.name}</span>
                    </button>
                    <button
                      onClick={toggleMode}
                      className="p-2 rounded-xl text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer shrink-0"
                      title={mode === 'dark' ? 'Switch to Day (Light) Mode' : 'Switch to Night (Dark) Mode'}
                    >
                      {mode === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAction(extra.actionType)}
                    className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-slate-800 dark:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all flex items-center justify-center gap-2 group/btn cursor-pointer"
                  >
                    <span>{extra.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-sky-500 group-hover/btn:translate-x-0.5 transition-transform" />
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
