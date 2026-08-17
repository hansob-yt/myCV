import React from 'react';
import { personalBio } from '../../../entities/profile';
import { experiences } from '../../../entities/experience';
import { projects } from '../../../entities/project';

export const PrintResume: React.FC = () => {
  return (
    <div className="hidden print:block p-8 max-w-4xl mx-auto bg-white text-slate-900 font-sans leading-normal">
      
      {/* Resume Top Header */}
      <div className="border-b-2 border-slate-900 pb-4 mb-5">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-950 uppercase tracking-tight">
              {personalBio.name}
            </h1>
            <p className="text-base font-bold text-sky-800 mt-0.5">
              {personalBio.title} • React 19 &amp; TypeScript Specialist
            </p>
          </div>

          {/* Contact Details Column */}
          <div className="text-xs font-mono text-slate-800 space-y-1 sm:text-right">
            <div>
              <strong className="text-slate-950">Email:</strong> {personalBio.email}
            </div>
            <div>
              <strong className="text-slate-950">Portfolio:</strong> https://hansob.vercel.app
            </div>
            <div>
              <strong className="text-slate-950">GitHub:</strong> https://github.com/hansob-yt
            </div>
            <div>
              <strong className="text-slate-950">Location:</strong> {personalBio.location} (Remote &amp; Onsite)
            </div>
          </div>
        </div>
      </div>

      {/* Professional Summary & Bio */}
      <section className="mb-5">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-300 pb-1 mb-2">
          Professional Summary &amp; Bio
        </h2>
        <div className="text-xs text-slate-800 leading-relaxed space-y-1.5">
          {personalBio.fullBio.map((paragraph, pIdx) => (
            <p key={pIdx}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="mb-5">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-300 pb-1 mb-2.5">
          Professional Experience &amp; Traineeship
        </h2>
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline">
                <div className="font-bold text-sm text-slate-950">
                  {exp.role} — <span className="font-semibold text-slate-700">{exp.companyFullName}</span>
                </div>
                <div className="text-xs font-mono text-slate-600">
                  {exp.period} | {exp.location}
                </div>
              </div>
              <p className="text-xs text-slate-700 mt-1 italic">
                {exp.summary}
              </p>
              <ul className="list-disc list-inside text-xs text-slate-800 mt-1.5 space-y-1 pl-1">
                {exp.accomplishments.map((acc, rIdx) => (
                  <li key={rIdx}>{acc}</li>
                ))}
              </ul>
              <div className="text-[11px] font-mono text-slate-600 mt-1.5">
                <strong className="text-slate-900">Technologies:</strong> {exp.techStack.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="mb-5">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-300 pb-1 mb-2.5">
          Key Enterprise Projects
        </h2>
        <div className="space-y-3.5">
          {projects.map((proj) => (
            <div key={proj.id}>
              <div className="flex justify-between items-baseline">
                <div className="font-bold text-sm text-slate-950">
                  {proj.title} — <span className="font-semibold text-slate-700">{proj.subtitle}</span>
                </div>
                <div className="text-xs font-mono text-slate-600">
                  Enterprise Production
                </div>
              </div>
              <p className="text-xs text-slate-700 mt-0.5">
                {proj.tagline}
              </p>
              <ul className="list-disc list-inside text-xs text-slate-800 mt-1 space-y-1 pl-1">
                {proj.highlights.map((hl, hIdx) => (
                  <li key={hIdx}>{hl}</li>
                ))}
              </ul>
              <div className="text-[11px] font-mono text-slate-600 mt-1">
                <strong className="text-slate-900">Stack:</strong> {proj.techStack.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section>
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-300 pb-1 mb-2">
          Technical Skills &amp; Methodologies
        </h2>
        <div className="grid grid-cols-2 gap-3 text-xs text-slate-800 leading-relaxed">
          <div>
            <strong className="text-slate-950">Core &amp; Frameworks:</strong> React 19, TypeScript, Vite 8, JavaScript (ES6+), Tailwind CSS v4, HTML5, SCSS
          </div>
          <div>
            <strong className="text-slate-950">State &amp; Data:</strong> TanStack Query v5, Zustand v5, React Hook Form, Zod, Axios, Recharts v3
          </div>
          <div>
            <strong className="text-slate-950">Architecture:</strong> Feature-Sliced Design (FSD), Responsive Web Design, Component Systems
          </div>
          <div>
            <strong className="text-slate-950">Tools &amp; Workflow:</strong> Git, GitHub Workflows, Vitest, ESLint, Husky, Lint-Staged, Chrome DevTools
          </div>
        </div>
      </section>

    </div>
  );
};
