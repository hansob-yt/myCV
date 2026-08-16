import React, { useState } from 'react';
import type { ProjectItem } from '../../../entities/project';
import { triggerCelebration } from '../../../shared/lib';
import { 
  X, 
  ShieldCheck, 
  Layers, 
  Cpu, 
  Activity, 
  Lock, 
  KeyRound, 
  Terminal, 
  CheckCircle2, 
  RefreshCw, 
  Zap
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  CartesianGrid 
} from 'recharts';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOpenTerminal: () => void;
}

// Sample dynamic telemetry datasets for Dama interactive chart simulation
const damaTimeData = {
  '1H': [
    { time: '10:00', requests: 1200, cacheHit: 96, latency: 24 },
    { time: '10:15', requests: 2400, cacheHit: 98, latency: 18 },
    { time: '10:30', requests: 3800, cacheHit: 95, latency: 29 },
    { time: '10:45', requests: 3100, cacheHit: 97, latency: 21 },
    { time: '11:00', requests: 4600, cacheHit: 99, latency: 15 },
  ],
  '24H': [
    { time: '00:00', requests: 15000, cacheHit: 94, latency: 32 },
    { time: '06:00', requests: 28000, cacheHit: 97, latency: 22 },
    { time: '12:00', requests: 64000, cacheHit: 98, latency: 19 },
    { time: '18:00', requests: 52000, cacheHit: 96, latency: 25 },
    { time: '24:00', requests: 31000, cacheHit: 98, latency: 18 },
  ],
  '7D': [
    { time: 'Mon', requests: 210000, cacheHit: 97, latency: 21 },
    { time: 'Tue', requests: 290000, cacheHit: 98, latency: 19 },
    { time: 'Wed', requests: 340000, cacheHit: 96, latency: 24 },
    { time: 'Thu', requests: 310000, cacheHit: 98, latency: 18 },
    { time: 'Fri', requests: 420000, cacheHit: 99, latency: 16 },
    { time: 'Sat', requests: 180000, cacheHit: 95, latency: 27 },
    { time: 'Sun', requests: 150000, cacheHit: 97, latency: 20 },
  ],
};

export const ProjectModal: React.FC<ProjectModalProps> = ({ 
  project, 
  onClose, 
  onOpenTerminal 
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'interactive-demo' | 'architecture'>('overview');
  
  // Dama chart state
  const [damaRange, setDamaRange] = useState<'1H' | '24H' | '7D'>('24H');
  const [damaMetric, setDamaMetric] = useState<'requests' | 'cacheHit' | 'latency'>('requests');

  // Kilid SSO simulation state
  const [ssoIdentifier, setSsoIdentifier] = useState('enterprise-admin@company.com');
  const [ssoStep, setSsoStep] = useState<'ready' | 'authenticating' | 'authenticated'>('ready');
  const [ssoTokenRefreshed, setSsoTokenRefreshed] = useState(false);

  if (!project) return null;

  const handleSimulateAuth = () => {
    setSsoStep('authenticating');
    setTimeout(() => {
      setSsoStep('authenticated');
      triggerCelebration();
    }, 1200);
  };

  const handleSimulateTokenRefresh = () => {
    setSsoTokenRefreshed(true);
    setTimeout(() => {
      setSsoTokenRefreshed(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto project-modal-backdrop animate-fadeIn">
      
      {/* Darkened Blur Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col">
        
        {/* Top Header Banner */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/50 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                {project.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Enterprise Proprietary
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {project.title} <span className="text-slate-400 dark:text-slate-500 text-lg font-medium">— {project.subtitle}</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              {project.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 bg-slate-100/50 dark:bg-slate-900/50 gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'border-sky-500 text-sky-600 dark:text-sky-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Overview &amp; Scope
          </button>
          <button
            onClick={() => setActiveTab('interactive-demo')}
            className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'interactive-demo'
                ? 'border-sky-500 text-sky-600 dark:text-sky-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            Interactive Live Simulation
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'architecture'
                ? 'border-sky-500 text-sky-600 dark:text-sky-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            FSD Architecture &amp; Security
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Detailed Narrative */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Detailed Background &amp; Engineering Role
                </h4>
                <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {project.description.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </div>

              {/* Metrics Grid */}
              <div>
                <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  Production Metrics &amp; Impact
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {project.metrics.map((m, idx) => (
                    <div 
                      key={idx}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 text-center"
                    >
                      <div className="text-xl font-bold font-mono text-sky-600 dark:text-sky-400 mb-0.5">
                        {m.value}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Highlights */}
              <div>
                <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  Core Engineering Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.highlights.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Complete Tech Stack */}
              <div>
                <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  Technologies &amp; Libraries
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: INTERACTIVE LIVE SIMULATION */}
          {activeTab === 'interactive-demo' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* KILID SIMULATION */}
              {project.demoType === 'kilid-auth' && (
                <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 text-slate-100 relative overflow-hidden shadow-2xl">
                  
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <KeyRound className="w-5 h-5 text-sky-400" />
                      <span className="font-bold text-sm text-white">Kilid SSO Authentication Gateway</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      OAuth 2.0 / OIDC
                    </span>
                  </div>

                  {/* Simulated Form UI */}
                  <div className="max-w-md mx-auto py-4 space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">
                        Enterprise User Identity (Email / Username)
                      </label>
                      <input
                        type="text"
                        value={ssoIdentifier}
                        onChange={(e) => setSsoIdentifier(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:outline-none focus:border-sky-500"
                        placeholder="user@enterprise.com"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">
                        Authorization Grant Type
                      </label>
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 flex items-center justify-between">
                        <span>Authorization Code + PKCE</span>
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      </div>
                    </div>

                    <div className="pt-2 flex flex-col gap-2">
                      {ssoStep === 'ready' && (
                        <button
                          onClick={handleSimulateAuth}
                          className="w-full py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-sky-500/20"
                        >
                          <Lock className="w-3.5 h-3.5" />
                          <span>Simulate Enterprise Single Sign-On</span>
                        </button>
                      )}

                      {ssoStep === 'authenticating' && (
                        <div className="py-2.5 rounded-xl bg-sky-500/20 border border-sky-500/40 text-center text-xs font-mono text-sky-300 animate-pulse flex items-center justify-center gap-2">
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Validating Zod Schema &amp; Negotiating PKCE Token...</span>
                        </div>
                      )}

                      {ssoStep === 'authenticated' && (
                        <div className="space-y-3">
                          <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-300 space-y-1">
                            <div className="flex items-center gap-1.5 font-bold">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              <span>Session Established &amp; Synced Across All Sub-Domains</span>
                            </div>
                            <p className="text-[11px] text-emerald-400/90 font-mono">
                              JWT In-Memory Access Token issued • HttpOnly Refresh Cookie Secure
                            </p>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={handleSimulateTokenRefresh}
                              className="flex-1 py-2 rounded-xl text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <RefreshCw className={`w-3.5 h-3.5 text-sky-400 ${ssoTokenRefreshed ? 'animate-spin' : ''}`} />
                              <span>{ssoTokenRefreshed ? 'Token Rotated!' : 'Test Silent Token Rotation'}</span>
                            </button>
                            <button
                              onClick={() => setSsoStep('ready')}
                              className="px-3 py-2 rounded-xl text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-400 transition-all cursor-pointer"
                            >
                              Reset
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tech stack badge footer */}
                  <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                    <span>Validation Engine: Zod 3 + React Hook Form</span>
                    <span>State Sync: Zustand Session Store</span>
                  </div>

                </div>
              )}

              {/* DAMA SIMULATION */}
              {project.demoType === 'dama-analytics' && (
                <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 text-slate-100 space-y-4 shadow-2xl">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-emerald-400" />
                      <div>
                        <span className="font-bold text-sm text-white block">Dama Real-Time Telemetry Stream</span>
                        <span className="text-[11px] text-slate-400 font-mono">TanStack Query Stale-While-Revalidate Engine</span>
                      </div>
                    </div>

                    {/* Filter controls */}
                    <div className="flex items-center gap-2">
                      <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-mono">
                        {(['1H', '24H', '7D'] as const).map((range) => (
                          <button
                            key={range}
                            onClick={() => setDamaRange(range)}
                            className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                              damaRange === range ? 'bg-sky-500 text-white font-bold' : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            {range}
                          </button>
                        ))}
                      </div>

                      <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-mono">
                        {(['requests', 'cacheHit', 'latency'] as const).map((m) => (
                          <button
                            key={m}
                            onClick={() => setDamaMetric(m)}
                            className={`px-2 py-1 rounded-lg transition-colors cursor-pointer capitalize ${
                              damaMetric === m ? 'bg-emerald-500 text-white font-bold' : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            {m === 'cacheHit' ? 'Cache %' : m}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Recharts Chart Canvas */}
                  <div className="h-60 w-full pt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={damaTimeData[damaRange]}>
                        <defs>
                          <linearGradient id="metricGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={damaMetric === 'latency' ? '#f59e0b' : '#00f0ff'} stopOpacity={0.4}/>
                            <stop offset="95%" stopColor={damaMetric === 'latency' ? '#f59e0b' : '#00f0ff'} stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
                        <YAxis stroke="#64748b" fontSize={11} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey={damaMetric} 
                          stroke={damaMetric === 'latency' ? '#f59e0b' : '#00f0ff'} 
                          strokeWidth={2}
                          fillOpacity={1} 
                          fill="url(#metricGrad)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                    <span>Rendering Engine: Recharts v3 Virtualized</span>
                    <span>FPS: Stable 60 FPS</span>
                  </div>

                </div>
              )}

            </div>
          )}

          {/* TAB 3: ARCHITECTURE & SECURITY */}
          {activeTab === 'architecture' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Pattern Badge */}
              <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-sky-600 dark:text-sky-400 font-semibold block">
                    Architectural Paradigm
                  </span>
                  <span className="text-base font-bold text-slate-900 dark:text-white">
                    {project.architectureDetails.pattern}
                  </span>
                </div>
                <button
                  onClick={onOpenTerminal}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium text-white bg-sky-500 hover:bg-sky-400 transition-colors flex items-center gap-1.5 cursor-pointer shadow-md shadow-sky-500/20"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Open in FSD Explorer</span>
                </button>
              </div>

              {/* FSD Layer Decomposition */}
              <div>
                <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  FSD Layer Breakdown
                </h4>
                <div className="space-y-2">
                  {project.architectureDetails.structure.map((layer, idx) => (
                    <div 
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 font-mono text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2.5"
                    >
                      <span className="w-2 h-2 rounded-full bg-sky-500 shrink-0" />
                      <span>{layer}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security & Hardening */}
              <div>
                <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Security Controls &amp; Token Handling
                </h4>
                <div className="space-y-2">
                  {project.architectureDetails.security.map((sec, idx) => (
                    <div 
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{sec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Engineering */}
              <div>
                <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-purple-500" />
                  Performance Optimizations
                </h4>
                <div className="space-y-2">
                  {project.architectureDetails.performance.map((perf, idx) => (
                    <div 
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                      <span>{perf}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/50 flex items-center justify-between">
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            {project.title} • Technical Details
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl text-xs font-semibold text-white bg-sky-500 hover:bg-sky-400 transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>

    </div>
  );
};
