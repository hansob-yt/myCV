import type { SkillItem, SkillCategory } from '../../../shared/types';

export const skillCategories: SkillCategory[] = [
  { id: 'all', name: 'All Skills', description: 'Comprehensive frontend developer toolkit', count: 18 },
  { id: 'core', name: 'Core & Languages', description: 'Web foundations and modern programming standards', count: 4 },
  { id: 'frameworks', name: 'Frameworks & Libraries', description: 'Component engines, styling & state management', count: 6 },
  { id: 'tools', name: 'DevOps & Tooling', description: 'Bundlers, testing, containers & code quality pipelines', count: 5 },
  { id: 'architecture', name: 'Architecture & Patterns', description: 'Design paradigms and enterprise scalability', count: 3 }
];

export const skills: SkillItem[] = [
  // Core & Languages
  { name: 'TypeScript', level: 92, experience: '2 yrs', highlight: true, category: 'core', tags: ['Generics', 'Type Inference', 'Utility Types', 'Strict Mode'] },
  { name: 'JavaScript (ES6+)', level: 95, experience: '2 yrs', highlight: true, category: 'core', tags: ['Async/Await', 'Closures', 'Prototypes', 'Event Loop'] },
  { name: 'HTML5 & Semantics', level: 95, experience: '2 yrs', highlight: false, category: 'core', tags: ['SEO', 'ARIA', 'Accessibility', 'Microdata'] },
  { name: 'CSS3 / Modern SCSS', level: 90, experience: '2 yrs', highlight: false, category: 'core', tags: ['Grid', 'Flexbox', 'Animations', 'Glassmorphism'] },

  // Frameworks & Libraries
  { name: 'React 19 / 18', level: 94, experience: '2 yrs', highlight: true, category: 'frameworks', tags: ['Hooks', 'Context API', 'Suspense', 'Custom Hooks'] },
  { name: 'Vite 8', level: 92, experience: '2 yrs', highlight: true, category: 'frameworks', tags: ['HMR', 'Rollup Plugins', 'Chunk Splitting', 'ESBuild'] },
  { name: 'Tailwind CSS v4', level: 95, experience: '2 yrs', highlight: true, category: 'frameworks', tags: ['Responsive Design', 'Custom Utilities', 'Dark Mode'] },
  { name: 'TanStack Query v5', level: 90, experience: '2 yrs', highlight: true, category: 'frameworks', tags: ['Server State', 'Caching', 'Optimistic UI', 'Prefetching'] },
  { name: 'Zustand v5', level: 90, experience: '2 yrs', highlight: false, category: 'frameworks', tags: ['Client State', 'Immer', 'Selectors', 'Persistence'] },
  { name: 'React Hook Form & Zod', level: 92, experience: '2 yrs', highlight: true, category: 'frameworks', tags: ['Validation', 'Type-Safety', 'Error Handling'] },
  { name: 'Radix UI Primitives', level: 88, experience: '1.5 yrs', highlight: false, category: 'frameworks', tags: ['Accessible Modals', 'Dropdowns', 'Tooltips'] },
  { name: 'Recharts v3', level: 86, experience: '1.5 yrs', highlight: false, category: 'frameworks', tags: ['Area Charts', 'Tooltips', 'Responsive Containers'] },

  // Tools & Workflow
  { name: 'Git & GitHub Workflows', level: 90, experience: '2 yrs', highlight: true, category: 'tools', tags: ['Git Flow', 'Branching', 'PR Reviews', 'Rebase'] },
  { name: 'Docker & Multi-Stage Builds', level: 82, experience: '1 yr', highlight: false, category: 'tools', tags: ['Containers', 'Nginx Config', 'Production Images'] },
  { name: 'Vitest & React Testing Library', level: 84, experience: '1.5 yrs', highlight: false, category: 'tools', tags: ['Unit Tests', 'Integration Tests', 'Mocking'] },
  { name: 'Code Quality (ESLint 9, Husky)', level: 92, experience: '2 yrs', highlight: true, category: 'tools', tags: ['Lint-Staged', 'Commitlint', 'Prettier'] },
  { name: 'Chrome DevTools & Profiling', level: 88, experience: '2 yrs', highlight: false, category: 'tools', tags: ['Performance Audits', 'Memory Leaks', 'Network Profiling'] },

  // Architecture & Methodologies
  { name: 'Feature-Sliced Design (FSD)', level: 94, experience: '1.5 yrs', highlight: true, category: 'architecture', tags: ['Slices', 'Layers', 'Segments', 'Decoupled State'] },
  { name: 'Responsive Web Design (RWD)', level: 96, experience: '2 yrs', highlight: true, category: 'architecture', tags: ['Mobile-First', 'Fluid Layouts', 'Breakpoints'] },
  { name: 'REST API & State Architecture', level: 92, experience: '2 yrs', highlight: true, category: 'architecture', tags: ['Error Resiliency', 'Cache Invalidation', 'Axios Interceptors'] }
];

export const favoritePackages = [
  'lucide-react',
  'react-easy-crop',
  'react-toastify',
  'clsx',
  'recharts',
  'zod',
  'zustand',
  'tanstack-query'
];
