# Code Quality & Architectural Standards

This document defines the code quality guidelines, linting configuration, architectural constraints, and engineering practices applied across this project.

---

## 1. Feature-Sliced Design (FSD) Architectural Rules

To maintain maximum maintainability and prevent spaghetti dependencies, all code must adhere to **FSD v2.1 rules**:

### Rule 1: Unidirectional Dependency Flow
Modules on higher layers can **only import from lower layers**. Imports in the opposite direction or cross-imports between sibling slices are strictly forbidden.

```
app ──► pages ──► widgets ──► features ──► entities ──► shared
```

* ❌ **Forbidden:** An `entity` importing from a `widget` or `feature`.
* ❌ **Forbidden:** A `widget` importing directly from another `widget` without composition in `pages`.
* ✅ **Allowed:** A `widget` importing from `features`, `entities`, and `shared`.

### Rule 2: Public API Enforcement (`index.ts`)
Every slice and segment must expose its functionality strictly through an `index.ts` file acting as a public interface:

```
src/widgets/navbar/
├── ui/
│   └── Navbar.tsx
└── index.ts          # Public entry point exporting { Navbar }
```

External consumers should **never** deep-import internal files (e.g. `import { Navbar } from '@/widgets/navbar/ui/Navbar'`). Always import through the public API: `import { Navbar } from '@/widgets/navbar'`.

---

## 2. TypeScript & Type Safety Standards

1. **Strict Type Checking:** The project runs with TypeScript `strict: true` and `noImplicitAny: true`.
2. **Domain Model Placement:** Shared domain interfaces (`PersonalBio`, `ProjectItem`, `ExperienceItem`, `SkillItem`) are defined in `src/shared/types/` and re-exported through domain entity slices (`src/entities/*/index.ts`).
3. **No Type Assertions Overuse:** Prefer type inference and strict object interfaces over unsafe `as any` casting.

---

## 3. React 19 & React Compiler Best Practices

Because the **React 19 Compiler** automatically handles fine-grained memoization at build time, follow the official Rules of React:

1. **Pure Component Rendering:** Component render functions must be pure calculations and must not mutate incoming props or global state during rendering.
2. **Side Effects in Effects / Handlers:** All mutations, timers, event listeners, and DOM updates must live in `useEffect` hooks or event handlers.
3. **No Redundant Manual Memoization:** Avoid manual `useMemo` / `useCallback` unless needed to satisfy specific third-party library stability requirements; trust the compiler to memoize optimal dependencies.
4. **Stable Component Exports:** Files containing React components should only export React components or associated static constants to ensure Vite Fast Refresh (HMR) operates smoothly without full-page reloads.

---

## 4. Linting & Static Code Analysis (Oxlint)

The project uses **Oxlint** for ultra-fast, Rust-powered static code analysis.

### Running the Linter:
```bash
npm run lint
```

### Configured Rules:
* `react/rules-of-hooks`: Enforces the correct ordering and execution of React hooks.
* `react/only-export-components`: Guarantees Fast Refresh compatibility.
* `typescript/*`: Flags unused variables, ambiguous type definitions, and missing return types where appropriate.

---

## 5. Performance & Rendering Budgets

* **GPU Layer Promotion:** Frosted glass panels and animated cards use `transform: translateZ(0)` and `backface-visibility: hidden` to guarantee GPU compositing.
* **Off-Screen Rendering Containment:** Heavy off-screen sections (`#skills`, `#extras`, `#contact`) use `content-visibility: auto` with `contain-intrinsic-size` to minimize main-thread rendering work during scroll and theme transitions.
* **Canvas Batching:** Canvas drawing routines batch path strokes and limit radial gradient allocations to avoid garbage collection spikes.

---

## 6. Accessibility (a11y) & Contrast Standards

* **High-Contrast Text:** In Day (Light) mode, headings use `text-slate-950` and body copy uses `text-slate-900`/`text-slate-800` to exceed WCAG AA contrast guidelines against light backgrounds.
* **Keyboard Navigation:** All modals support `Escape` key listeners to dismiss. Interactive controls include visible `:focus-visible` outlines.
* **Semantic Structure:** Proper hierarchy using a single `<h1>` on the landing page, structured `<section>` blocks with descriptive `id` attributes, and `<header>`, `<main>`, `<aside>`, and `<footer>` landmarks.
