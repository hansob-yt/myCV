import type { CodeSnippet, InteractiveExtra } from '../../../shared/types';

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
    title: 'Atmospheric Themes & Day/Night Mode',
    tagline: 'Day/Night mode with 4 distinct background atmospheres.',
    description: 'Toggle between Day (Light) and Night (Dark) mode, or morph the background color atmosphere across Cyber Cyan, Nebula, Emerald, and Sunset.',
    icon: 'Sparkles',
    actionText: 'Switch Atmosphere',
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
