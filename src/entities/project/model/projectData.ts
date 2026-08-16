import type { ProjectItem } from '../../../shared/types';

export const projects: ProjectItem[] = [
  {
    id: 'kilid-sso',
    title: 'Kilid',
    subtitle: 'Enterprise SSO & Identity Platform',
    category: 'Security & Auth',
    tagline: 'Centralized Single Sign-On and identity management web application enabling seamless authentication across multi-tenant enterprise services.',
    description: [
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
    category: 'Analytics & Data',
    tagline: 'Interactive enterprise dashboard designed to aggregate, process, and present complex metrics and telemetry through intuitive data visualization charts.',
    description: [
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
      { label: 'Live Data Sync', value: 'Real-Time' },
      { label: 'Chart Framerate', value: '60 FPS' },
      { label: 'Query Cache Hit', value: '>92%' }
    ]
  }
];
