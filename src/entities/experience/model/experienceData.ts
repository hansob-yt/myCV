import type { ExperienceItem } from "../../../shared/types";

export const experiences: ExperienceItem[] = [
  {
    id: "kavano-dev",
    role: "Frontend Web Developer",
    company: "Behsam Kavan Araz (Kavano)",
    companyFullName: "Behsam Kavan Araz (Kavano)",
    location: "Tehran, Iran",
    period: "2024 — Present",
    duration: "1 Year",
    type: "work",
    summary:
      "Full-time core frontend developer engineering mission-critical enterprise web applications, authentication platforms, and analytics dashboards.",
    accomplishments: [
      "Developed modular, accessible, and pixel-perfect responsive UI components based on standardized design systems and Radix UI primitives.",
      "Integrated RESTful APIs using Axios and TanStack Query, efficiently managing server state, optimistic updates, intelligent caching, and background synchronization.",
      "Significantly enhanced client-side runtime performance and reduced bundle overhead (~35%) across production builds.",
      "Implemented Feature-Sliced Design (FSD) architecture to keep codebases modular, maintainable, and scalable across large enterprise applications.",
      "Resolved critical UI/UX bugs and collaborated closely in code quality enforcement via ESLint 9, Prettier, Husky, Lint-Staged, and Commitlint.",
    ],
    techStack: [
      "React 19",
      "TypeScript",
      "Vite 8",
      "React Router v7",
      "Tailwind CSS v4",
      "TanStack Query v5",
      "Zustand v5",
      "Radix UI",
      "Recharts v3",
      "Zod",
      "Vitest",
    ],
    metrics: [
      { label: "Bundle Reduction", value: "~35%" },
      { label: "FSD Slices", value: "6 Layers" },
      { label: "Test Coverage", value: "Vitest Unit" },
    ],
    architectureHighlights: [
      "Feature-Sliced Design (FSD) layer decoupling",
      "Automated Axios silent JWT refresh interceptor queue",
      "Sub-tree state isolation with Zustand and TanStack Query",
    ],
  },
  {
    id: "kavano-trainee",
    role: "Frontend Engineering Trainee",
    company: "Behsam Kavan Araz (Kavano)",
    companyFullName: "Behsam Kavan Araz (Kavano)",
    location: "Tehran, Iran",
    period: "2023 — 2024",
    duration: "1 Year",
    type: "bootcamp",
    summary:
      "Intensive 1-year frontend engineering bootcamp and training program immersed in advanced web standards, modern JavaScript/TypeScript, React internals, and production workflows.",
    accomplishments: [
      "Deep dive into ES6+ paradigms, event loop, asynchronous JavaScript, closures, DOM performance, and TypeScript advanced typing.",
      "Built progressive single-page applications with complex client-side routing, global state stores, and custom hooks.",
      "Adopted Git workflows, collaborative pull request reviews, automated CI pre-commit hooks, and semantic versioning.",
      "Successfully graduated top of the cohort and seamlessly transitioned directly into the core engineering team as a Frontend Developer.",
    ],
    techStack: [
      "JavaScript (ES6+)",
      "TypeScript",
      "React",
      "HTML5",
      "CSS3 / SCSS",
      "Git / GitHub",
      "REST APIs",
      "Responsive Web Design",
    ],
    metrics: [
      { label: "Training Hours", value: "1500+ hrs" },
      { label: "Projects Built", value: "10+ SPAs" },
      { label: "Promotion", value: "Hired Full-Time" },
    ],
    architectureHighlights: [
      "Foundational modern JavaScript asynchronous runtime mastery",
      "Strict TypeScript type safety & custom generic utilities",
      "Component lifecycle and React hook performance tuning",
    ],
  },
];
