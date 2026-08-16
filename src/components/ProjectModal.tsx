import React, { useState } from 'react';
import type { ProjectItem } from '../types/cv';
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
import { triggerCelebration } from '../utils/confetti';

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
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Deep-Dive Overview
          </button>
          <button
            onClick={() => setActiveTab('interactive-demo')}
            className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'interactive-demo'
                ? 'border-sky-500 text-sky-600 dark:text-sky-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            Interactive Simulation
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'architecture'
                ? 'border-sky-500 text-sky-600 dark:text-sky-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-sky-500" />
            FSD Architecture
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
                  Project Scope &amp; Architecture Role
                </h4>
                {project.longDescription.map((p, idx) => (
                  <p key={idx} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>

              {/* Key Technical Highlights */}
              <div>
                <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Key Architectural &amp; Engineering Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.highlights.map((highlight, hIdx) => (
                    <div 
                      key={hIdx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0 mt-1.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-3">
                {project.metrics.map((m, mIdx) => (
                  <div key={mIdx} className="p-3 rounded-2xl bg-sky-500/5 dark:bg-sky-950/20 border border-sky-500/20 text-center">
                    <div className="text-lg font-mono font-bold text-sky-600 dark:text-sky-400">{m.value}</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Tech Stack Pills */}
              <div>
                <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-sky-500" />
                  Full Tech Stack
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech, tIdx) => (
                    <span 
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: INTERACTIVE SIMULATION */}
          {activeTab === 'interactive-demo' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Kilid Auth Simulator */}
              {project.demoType === 'kilid-auth' && (
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-100 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <KeyRound className="w-4 h-4 text-sky-400" />
                      <span className="font-mono text-xs text-sky-400 font-bold uppercase">
                        Kilid SSO Authentication Simulator
                      </span>
                    </div>
                    <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                      OAuth2 • FSD v2.1
                    </span>
                  </div>

                  {ssoStep === 'ready' && (
                    <div className="space-y-3">
                      <p className="text-xs text-slate-300">
                        Test the SSO gateway workflow with instant Zod schema validation &amp; background session initialization:
                      </p>
                      <div>
                        <label className="text-[11px] font-mono text-slate-400 block mb-1">Corporate Identifier</label>
                        <input
                          type="text"
                          value={ssoIdentifier}
                          onChange={(e) => setSsoIdentifier(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-white focus:outline-none focus:border-sky-500"
                        />
                      </div>
                      <button
                        onClick={handleSimulateAuth}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-semibold text-xs transition-all shadow-md shadow-sky-500/20 cursor-pointer"
                      >
                        Simulate Single Sign-On (SSO) Flow
                      </button>
                    </div>
                  )}

                  {ssoStep === 'authenticating' && (
                    <div className="py-8 flex flex-col items-center justify-center gap-3">
                      <RefreshCw className="w-6 h-6 text-sky-400 animate-spin" />
                      <span className="text-xs font-mono text-slate-300">
                        Validating Zod Schema &amp; Initializing Token Handshake...
                      </span>
                    </div>
                  )}

                  {ssoStep === 'authenticated' && (
                    <div className="space-y-3 animate-fadeIn">
                      <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        <div className="text-xs">
                          <div className="font-semibold text-emerald-300">Authentication Handshake Successful</div>
                          <div className="text-slate-400 font-mono text-[11px]">Session token issued with HttpOnly cookie synchronization</div>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono space-y-1 text-slate-300">
                        <div className="text-sky-400 font-bold">// Session State:</div>
                        <div>tenant_id: "corp-internal-node-01"</div>
                        <div>access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."</div>
                        <div>expires_in: 3600 (Auto-refreshed via Axios Queue Interceptor)</div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={handleSimulateTokenRefresh}
                          disabled={ssoTokenRefreshed}
                          className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 border border-slate-700 transition-all cursor-pointer"
                        >
                          {ssoTokenRefreshed ? '✓ Token Rotated & Queue Flushed' : 'Test Token Refresh Interceptor'}
                        </button>
                        <button
                          onClick={() => setSsoStep('ready')}
                          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-400 cursor-pointer"
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Dama Analytics Chart Simulator */}
              {project.demoType === 'dama-analytics' && (
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-100 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-emerald-400" />
                      <span className="font-mono text-xs text-emerald-400 font-bold uppercase">
                        Dama Telemetry Chart Visualizer (Recharts v3)
                      </span>
                    </div>

                    {/* Time Range Selector */}
                    <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
                      {(['1H', '24H', '7D'] as const).map((range) => (
                        <button
                          key={range}
                          onClick={() => setDamaRange(range)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all cursor-pointer ${
                            damaRange === range
                              ? 'bg-sky-500 text-white font-bold'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Metric Switcher */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDamaMetric('requests')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                        damaMetric === 'requests'
                          ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40'
                          : 'bg-slate-950 text-slate-400 border border-slate-800'
                      }`}
                    >
                      Throughput (Reqs)
                    </button>
                    <button
                      onClick={() => setDamaMetric('cacheHit')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                        damaMetric === 'cacheHit'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-slate-950 text-slate-400 border border-slate-800'
                      }`}
                    >
                      Cache Hit Rate (%)
                    </button>
                    <button
                      onClick={() => setDamaMetric('latency')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                        damaMetric === 'latency'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                          : 'bg-slate-950 text-slate-400 border border-slate-800'
                      }`}
                    >
                      API Latency (ms)
                    </button>
                  </div>

                  {/* Recharts Area Chart */}
                  <div className="h-56 w-full pt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={damaTimeData[damaRange]}>
                        <defs>
                          <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                            <stop 
                              offset="5%" 
                              stopColor={damaMetric === 'requests' ? '#38bdf8' : damaMetric === 'cacheHit' ? '#34d399' : '#fbbf24'} 
                              stopOpacity={0.4} 
                            />
                            <stop 
                              offset="95%" 
                              stopColor={damaMetric === 'requests' ? '#38bdf8' : damaMetric === 'cacheHit' ? '#34d399' : '#fbbf24'} 
                              stopOpacity={0} 
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                        <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
                        <YAxis stroke="#94a3b8" fontSize={11} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey={damaMetric} 
                          stroke={damaMetric === 'requests' ? '#38bdf8' : damaMetric === 'cacheHit' ? '#34d399' : '#fbbf24'} 
                          strokeWidth={2}
                          fillOpacity={1} 
                          fill="url(#colorMetric)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 3: FSD ARCHITECTURE */}
          {activeTab === 'architecture' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-sky-400" />
                    <span className="text-xs font-mono font-bold text-sky-400">
                      {project.architectureDetails.pattern}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenTerminal();
                    }}
                    className="flex items-center gap-1 text-xs font-mono text-sky-400 hover:text-sky-300 underline cursor-pointer"
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    Inspect In Code Explorer
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Directory &amp; Layer Slices:</div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1 font-mono text-xs text-slate-300">
                    {project.architectureDetails.structure.map((struct, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2">
                        <span className="text-sky-400 font-bold">{struct.split('—')[0]}</span>
                        <span className="text-slate-400 text-[11px]">— {struct.split('—')[1]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Security & Performance Measures */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/70 dark:border-slate-800/70 space-y-2">
                  <h5 className="text-xs font-bold font-mono uppercase text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    Security Standards
                  </h5>
                  <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                    {project.architectureDetails.security.map((sec, secIdx) => (
                      <li key={secIdx} className="flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>{sec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/70 dark:border-slate-800/70 space-y-2">
                  <h5 className="text-xs font-bold font-mono uppercase text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-500" />
                    Performance Optimizations
                  </h5>
                  <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                    {project.architectureDetails.performance.map((perf, perfIdx) => (
                      <li key={perfIdx} className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>{perf}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/50 flex flex-wrap items-center justify-between gap-3">
          <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
            Internal Enterprise Project • Closed Source
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenTerminal();
              }}
              className="px-4 py-2 rounded-xl text-xs font-mono font-medium bg-slate-100 dark:bg-slate-800 hover:bg-sky-500/10 hover:text-sky-500 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5 text-sky-500" />
              Open Code Explorer
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-sky-500 hover:bg-sky-400 text-white transition-all cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
