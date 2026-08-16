import React from 'react';
import { personalBio, experiences, projects } from '../data/cvData';

export const PrintResume: React.FC = () => {
  return (
    <div className="hidden print:block p-8 max-w-4xl mx-auto bg-white text-slate-900 font-sans">
      
      {/* Header */}
      <header className="border-b-2 border-slate-900 pb-4 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-950 uppercase tracking-tight">
              {personalBio.name}
            </h1>
            <p className="text-base font-bold text-sky-700 mt-0.5">
              {personalBio.title} (React 19 &amp; TypeScript Specialist)
            </p>
          </div>
          <div className="text-right text-xs space-y-1 font-mono text-slate-600">
            <div>{personalBio.email}</div>
            <div>github.com/hansob-yt</div>
            <div>{personalBio.location}</div>
          </div>
        </div>
        <p className="text-xs text-slate-700 mt-3 leading-relaxed">
          {personalBio.shortBio}
        </p>
      </header>

      {/* Experience */}
      <section className="mb-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
          Professional Experience &amp; Traineeship
        </h2>
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline">
                <div className="font-bold text-xs text-slate-950">
                  {exp.role} — <span className="font-semibold text-slate-700">{exp.companyFullName}</span>
                </div>
                <div className="text-[11px] font-mono text-slate-600">
                  {exp.period} | {exp.location}
                </div>
              </div>
              <p className="text-[11px] text-slate-700 mt-1 italic">
                {exp.summary}
              </p>
              <ul className="list-disc list-inside text-[11px] text-slate-700 mt-1.5 space-y-1 pl-1">
                {exp.responsibilities.map((resp, rIdx) => (
                  <li key={rIdx}>{resp}</li>
                ))}
              </ul>
              <div className="text-[10px] font-mono text-slate-500 mt-1.5">
                <strong>Technologies:</strong> {exp.techStack.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="mb-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
          Key Enterprise Projects
        </h2>
        <div className="space-y-3">
          {projects.map((proj) => (
            <div key={proj.id}>
              <div className="flex justify-between items-baseline">
                <div className="font-bold text-xs text-slate-950">
                  {proj.title} — <span className="font-medium text-slate-700">{proj.subtitle}</span>
                </div>
                <div className="text-[11px] font-mono text-slate-600">
                  {proj.date} (Enterprise)
                </div>
              </div>
              <p className="text-[11px] text-slate-700 mt-0.5">
                {proj.tagline}
              </p>
              <ul className="list-disc list-inside text-[11px] text-slate-700 mt-1 space-y-0.5 pl-1">
                {proj.highlights.map((hl, hIdx) => (
                  <li key={hIdx}>{hl}</li>
                ))}
              </ul>
              <div className="text-[10px] font-mono text-slate-500 mt-1">
                <strong>Stack:</strong> {proj.techStack.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section>
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
          Technical Skills &amp; Methodologies
        </h2>
        <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-800">
          <div>
            <strong>Core &amp; Frameworks:</strong> React 19, TypeScript, Vite 8, JavaScript (ES6+), Tailwind CSS v4, HTML5, SCSS
          </div>
          <div>
            <strong>State &amp; Data:</strong> TanStack Query v5, Zustand v5, React Hook Form, Zod, Axios, Recharts v3
          </div>
          <div>
            <strong>Architecture:</strong> Feature-Sliced Design (FSD), Responsive Web Design, Component Systems
          </div>
          <div>
            <strong>Tools &amp; DevOps:</strong> Git, Docker, Nginx, Vitest, ESLint 9, Husky, Lint-Staged, Chrome DevTools
          </div>
        </div>
      </section>

    </div>
  );
};
