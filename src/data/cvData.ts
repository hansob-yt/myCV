import type { PersonalBio, ExperienceItem, ProjectItem, SkillItem, SkillCategory, CodeSnippet, InteractiveExtra } from '../types/cv';

export const personalBio: PersonalBio = {
  name: 'Sobhan Khademi Sohi',
  title: 'Frontend Web Developer',
  shortBio: 'Frontend Developer with ~2 years of experience crafting high-performance, responsive, and scalable web applications using React, TypeScript, and modern ecosystem tooling.',
  fullBio: [
    'I specialize in building production-ready, highly responsive user interfaces with a relentless focus on runtime performance, accessibility, and modern architectural standards.',
    'Over the past 2 years at Behsam Kavan Afraz (Kavano)—transitioning from an intensive engineering bootcamp to core frontend developer—I have architected enterprise-level single sign-on (SSO) systems and complex telemetry analytics dashboards using Feature-Sliced Design (FSD).',
    'Passionate about clean code, automated quality enforcement (ESLint, Husky, Vitest), state synchronization with TanStack Query, and crafting fluid glassmorphic micro-interactions that delight users.'
  ],
  location: 'Tehran, Iran',
  email: 'sobhankhademi79@gmail.com',
  github: 'https://github.com/hansob-yt',
  avatarUrl: '/avatar.png',
  status: 'Open to Opportunities & Networking',
  statusType: 'available',
  stats: [
    { label: 'Experience', value: '2 Years', helper: 'Bootcamp + Production' },
    { label: 'Enterprise Apps', value: '2 Delivered', helper: 'Kilid SSO & Dama Analytics' },
    { label: 'Architecture', value: 'FSD', helper: 'Feature-Sliced Design' },
    { label: 'Type Safety', value: '100%', helper: 'TypeScript + Zod' }
  ]
};

export const experiences: ExperienceItem[] = [
  {
    id: 'kavano-dev',
    role: 'Frontend Web Developer',
    company: 'Behsam Kavan Afraz (Kavano)',
    companyFullName: 'Behsam Kavan Afraz (Kavano)',
    location: 'Tehran, Iran',
    period: '2024 — Present',
    duration: '1 Year',
    type: 'work',
    summary: 'Full-time core frontend developer engineering mission-critical enterprise web applications, authentication platforms, and analytics dashboards.',
    responsibilities: [
      'Developed modular, accessible, and pixel-perfect responsive UI components based on standardized design systems and Radix UI primitives.',
      'Integrated RESTful APIs using Axios and TanStack Query, efficiently managing server state, optimistic updates, intelligent caching, and background synchronization.',
      'Handled comprehensive client-side error states, resilient fallback UIs, and robust data validation with React Hook Form and Zod.',
      'Resolved critical UI/UX bugs and collaborated closely in code quality enforcement via ESLint 9, Prettier, Husky, Lint-Staged, and Commitlint.'
    ],
    accomplishments: [
      'Significantly enhanced client-side runtime performance and reduced bundle overhead across production builds.',
      'Engineered fluid micro-interactions and animations to elevate the user experience across all screen sizes.',
      'Implemented Feature-Sliced Design (FSD) architecture to keep codebases modular, maintainable, and scalable across large enterprise applications.'
    ],
    techStack: [
      'React 19',
      'TypeScript',
      'Vite 8',
      'React Router v7',
      'Tailwind CSS v4',
      'TanStack Query v5',
      'Zustand v5',
      'Radix UI',
      'Recharts v3',
      'Zod',
      'Docker',
      'Nginx',
      'Vitest'
    ],
    metrics: [
      { label: 'Bundle Reduction', value: '~35%' },
      { label: 'FSD Slices', value: '6 Layers' },
      { label: 'Test Coverage', value: 'Vitest Unit' }
    ]
  },
  {
    id: 'kavano-trainee',
    role: 'Frontend Engineering Trainee',
    company: 'Behsam Kavan Afraz (Kavano)',
    companyFullName: 'Behsam Kavan Afraz (Kavano)',
    location: 'Tehran, Iran',
    period: '2023 — 2024',
    duration: '1 Year',
    type: 'bootcamp',
    summary: 'Intensive 1-year frontend engineering bootcamp and training program immersed in advanced web standards, modern JavaScript/TypeScript, React internals, and production workflows.',
    responsibilities: [
      'Deep dive into ES6+ paradigms, event loop, asynchronous JavaScript, closures, DOM performance, and TypeScript advanced typing.',
      'Built progressive single-page applications with complex client-side routing, global state stores, and custom hooks.',
      'Adopted Git workflows, collaborative pull request reviews, automated CI pre-commit hooks, and semantic versioning.'
    ],
    accomplishments: [
      'Successfully graduated top of the cohort and seamlessly transitioned directly into the core engineering team as a Frontend Developer.',
      'Standardized reusable UI patterns that later served as foundational building blocks for enterprise apps.'
    ],
    techStack: [
      'JavaScript (ES6+)',
      'TypeScript',
      'React',
      'HTML5',
      'CSS3 / SCSS',
      'Git / GitHub',
      'REST APIs',
      'Responsive Web Design'
    ],
    metrics: [
      { label: 'Training Hours', value: '1500+ hrs' },
      { label: 'Projects Built', value: '10+ SPAs' },
      { label: 'Promotion', value: 'Hired Full-Time' }
    ]
  }
];

export const projects: ProjectItem[] = [
  {
    id: 'kilid-sso',
    title: 'Kilid',
    subtitle: 'Enterprise SSO & Identity Platform',
    tagline: 'Centralized Single Sign-On and identity management web application enabling seamless authentication across multi-tenant enterprise services.',
    description: 'A high-security centralized authentication gateway (similar to "Sign in with Google") featuring zero-latency form handling, strict session token lifecycle management, and scalable Feature-Sliced Design.',
    longDescription: [
      'Kilid serves as the core authentication foundation for an enterprise ecosystem. It centralizes user identity, multi-factor authorization, OAuth2/OIDC token rotation, and single-session synchronization across distributed services.',
      'Engineered with React 19, TypeScript, and Vite 8 under a strict Feature-Sliced Design (FSD) directory structure, separating app, processes, pages, widgets, features, entities, and shared utilities for total decoupled maintainability.',
      'Utilizes React Hook Form paired with Zod schemas for instant schema validation without UI stutter, and deployed via multi-stage Docker containers with optimized Nginx caching.'
    ],
    techStack: [
      'React 19',
      'TypeScript',
      'Vite 8',
      'React Router v7',
      'Zustand v5',
      'TanStack Query v5',
      'Tailwind CSS v4',
      'Radix UI Primitives',
      'React Hook Form',
      'Zod',
      'Vitest',
      'Docker',
      'Nginx'
    ],
    category: 'Security & Auth',
    date: '2024 — Present',
    proprietary: true,
    status: 'In Production (Enterprise)',
    demoType: 'kilid-auth',
    highlights: [
      'High-security auth flows with OAuth2 token rotation and automatic refresh synchronization.',
      'Strict Feature-Sliced Design (FSD) architecture ensuring 100% modular separation.',
      'Zero form lag validation with React Hook Form + Zod compile-time type safety.',
      'Multi-stage Docker containerization with Nginx reverse proxy optimizations.'
    ],
    architectureDetails: {
      pattern: 'Feature-Sliced Design (FSD) v2.1',
      structure: [
        'app/ — Routing, global providers, and theme initialization',
        'pages/ — Auth routes: /login, /verify-otp, /oauth-consent, /recovery',
        'widgets/ — AuthCardWidget, SecurityAuditWidget, MultiTenantPicker',
        'features/ — auth-by-credentials, verify-mfa, switch-tenant, token-refresh',
        'entities/ — session, user-profile, security-policy, tenant-config',
        'shared/ — ui-kit (Radix + Tailwind), api-client (Axios instance), zod-schemas'
      ],
      security: [
        'HttpOnly cookie synchronization & secure in-memory access token storage',
        'Automated silent token refresh on 401 response with request queuing',
        'Strict CSP headers and XSS/CSRF mitigation measures'
      ],
      performance: [
        'Vite 8 lightning-fast HMR and aggressive Rollup manual chunking',
        'TanStack Query stale-while-revalidate background synchronization',
        'Under 50ms time-to-interactive for authentication routes'
      ]
    },
    metrics: [
      { label: 'Auth Latency', value: '<50ms' },
      { label: 'Architecture', value: 'Strict FSD' },
      { label: 'Bundle Size', value: 'Optimized' }
    ]
  },
  {
    id: 'dama-analytics',
    title: 'Dama',
    subtitle: 'Data Analytics & Visualization Platform',
    tagline: 'Interactive enterprise dashboard designed to aggregate, process, and present complex metrics and telemetry through intuitive data visualization charts.',
    description: 'A high-performance telemetry and metrics exploration platform with dynamic charting, multi-parameter time series filtering, and smooth rendering of heavy datasets.',
    longDescription: [
      'Dama provides real-time visibility into complex business metrics and infrastructure telemetry. It enables decision-makers to analyze multi-dimensional metrics through customizable interactive graphs, comparative trends, and drill-down tables.',
      'Built with React, TypeScript, Vite, Tailwind CSS, and Recharts v3. Optimized with TanStack Query for background state invalidation and intelligent cache warming.',
      'Features custom windowing and lightweight chart wrappers ensuring 60fps animations even when toggling between large historical datasets.'
    ],
    techStack: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Recharts v3',
      'TanStack Query',
      'Axios',
      'Radix UI',
      'clsx'
    ],
    category: 'Analytics & Data',
    date: '2024 — Present',
    proprietary: true,
    status: 'In Production (Enterprise)',
    demoType: 'dama-analytics',
    highlights: [
      'Dynamic real-time charting with customized Recharts visual themes and tooltips.',
      'Multi-variable time-series filtering (1H, 24H, 7D, 30D, Custom Ranges).',
      'Intelligent TanStack Query caching preventing redundant server round-trips.',
      'Accessible tabular data export and responsive viewport adaptations.'
    ],
    architectureDetails: {
      pattern: 'Modular Component-Driven Architecture with TanStack Cache Layers',
      structure: [
        'components/charts/ — AreaChart, BarTelemetry, MetricDonut, Sparkline',
        'components/filters/ — DateRangePicker, MetricSelector, DimensionTag',
        'components/tables/ — VirtualizedAnalyticsTable with column pinning',
        'hooks/ — useTelemetryQuery, useMetricAggregator, useChartZoom',
        'services/ — TelemetryApiClient, WebSocketStreamClient'
      ],
      security: [
        'Role-Based Access Control (RBAC) on sensitive metric views',
        'Encrypted WebSocket payloads for live metric streaming'
      ],
      performance: [
        'Memoized chart dataset transforms using useMemo and Web Workers',
        'Debounced filter dispatchers with TanStack Query placeholder data'
      ]
    },
    metrics: [
      { label: 'Chart Frame Rate', value: '60 FPS' },
      { label: 'Data Latency', value: 'Real-Time' },
      { label: 'Data Points', value: '10K+ Rendered' }
    ]
  }
];

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

export const codeSnippets: CodeSnippet[] = [
  {
    id: 'fsd-architecture',
    title: 'Feature-Sliced Design (FSD) Hierarchy',
    filename: 'src/app/structure.fsd.ts',
    language: 'typescript',
    description: 'Enterprise structural layout implemented in Kilid SSO to enforce strict unidirectional dependencies across 6 layers.',
    code: `/**
 * Feature-Sliced Design (FSD) v2.1 Structure
 * Rule: Modules on higher layers can ONLY import from lower layers.
 */

// 1. app/       -> Global initialization, router providers, theme setup
export * from '@/app/providers';

// 2. pages/     -> Full routed views composed of widgets & features
export { LoginPage } from '@/pages/login';
export { DashboardAnalyticsPage } from '@/pages/analytics';

// 3. widgets/   -> Self-contained visual UI assemblies
export { AuthCardWidget } from '@/widgets/auth-card';
export { TelemetryChartWidget } from '@/widgets/telemetry-chart';

// 4. features/  -> User actions & business workflows
export { useAuthByCredentials } from '@/features/auth-by-credentials';
export { useExportMetrics } from '@/features/export-metrics';

// 5. entities/  -> Domain models & entity state
export { useSessionStore } from '@/entities/session';
export { type UserProfile } from '@/entities/user';

// 6. shared/    -> Reusable UI kit, API clients, helpers, schemas
export { apiClient } from '@/shared/api';
export { GlassCard, Button } from '@/shared/ui';
export { loginSchema } from '@/shared/validation';`
  },
  {
    id: 'tanstack-auth-interceptor',
    title: 'TanStack Query + Axios Interceptor',
    filename: 'src/shared/api/auth-interceptor.ts',
    language: 'typescript',
    description: 'Automatic token refresh queue preventing race conditions during 401 responses in single sign-on flows.',
    code: `import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { useSessionStore } from '@/entities/session';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // Secure HttpOnly cookies
  timeout: 10000,
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: AxiosError | null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve();
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => apiClient(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await useSessionStore.getState().refreshToken();
        processQueue(null);
        return apiClient(originalRequest);
      } catch (refreshErr) {
        processQueue(refreshErr as AxiosError);
        useSessionStore.getState().logout();
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);`
  },
  {
    id: 'zod-form-validation',
    title: 'Type-Safe Validation with Zod & React Hook Form',
    filename: 'src/features/auth/schemas/auth.schema.ts',
    language: 'typescript',
    description: 'Strict compile-time and runtime validation schema guaranteeing zero UI lag and rich accessibility error cues.',
    code: `import { z } from 'zod';

export const loginSchema = z.object({
  identifier: z
    .string()
    .min(3, 'Username or email must be at least 3 characters')
    .max(64, 'Identifier cannot exceed 64 characters'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one numerical digit'),
  rememberMe: z.boolean().default(false),
  tenantId: z.string().uuid('Invalid tenant organization ID').optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

// Example usage in component with React Hook Form
// const { register, handleSubmit, formState: { errors, isSubmitting } } = 
//   useForm<LoginFormValues>({
//     resolver: zodResolver(loginSchema),
//     mode: 'onTouched',
//   });`
  }
];

export const interactiveExtras: InteractiveExtra[] = [
  {
    id: 'terminal',
    title: 'FSD Code Explorer / Terminal Mode',
    tagline: 'Inspect real architectural snippets, store configurations & schemas.',
    description: 'Open an interactive VS-Code style code viewer with real TypeScript implementations of FSD structure, Axios token rotation interceptors, and Zod schemas.',
    icon: 'Terminal',
    actionText: 'Launch Code Explorer',
    actionType: 'terminal'
  },
  {
    id: 'pdf-resume',
    title: 'Download & Print-Ready PDF Resume',
    tagline: 'Clean, formatted, single-click printable resume layout.',
    description: 'Export an ATS-friendly, meticulously formatted CV document with one click or print dialog trigger.',
    icon: 'FileText',
    actionText: 'Generate PDF Resume',
    actionType: 'pdf'
  },
  {
    id: 'theme-toggle',
    title: 'Sleek Glassmorphism & Theme Engine',
    tagline: 'Light / Dark mode with instant localStorage & system sync.',
    description: 'Toggle between custom dark glow cyberpunk theme and frosted light glassmorphic aesthetics with seamless transitions.',
    icon: 'Sparkles',
    actionText: 'Switch Theme Mode',
    actionType: 'theme'
  },
  {
    id: 'contact-connect',
    title: 'Interactive Direct Message & Toast System',
    tagline: 'Instant email copy, validated messaging & live feedback.',
    description: 'Send a message directly with instant validation feedback, copy email to clipboard, or check social profiles.',
    icon: 'Mail',
    actionText: 'Send Direct Message',
    actionType: 'contact'
  }
];
