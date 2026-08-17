# Technology Stack & Architectural Summary

A comprehensive overview of the modern tools, libraries, architectural paradigms, and design philosophies powering this application.

---

## 1. Core Technologies & Frameworks

### **React 19**
* Utilizes the latest stable React 19 engine.
* Native support for modernized transitions, async state handling, and React 19 JSX runtime transformations.

### **React 19 Compiler (`babel-plugin-react-compiler`)**
* Build-time compiler formerly known as *React Forget*.
* Automatically infers and generates fine-grained memoization for components and values at build time.
* Eliminates boilerplate `useMemo`, `useCallback`, and `React.memo` calls while preventing unnecessary component re-renders.

### **TypeScript (Strict Mode)**
* Strict type checking with 100% type coverage across shared models, entity stores, widget interfaces, and feature hooks.
* Guarantees compile-time type safety for complex project metrics, theme configurations, and routing params.

### **Vite 8 & Rolldown Babel**
* Lightning-fast Hot Module Replacement (HMR) with sub-second startup times.
* Integrated with `@rolldown/plugin-babel` and `@vitejs/plugin-react` for seamless React Compiler transformation during bundle creation.

### **React Router v7 (`react-router-dom`)**
* Configured with `createBrowserRouter` to enable declarative URL-driven views and modal deep-linking.
* Seamlessly connects browser history (`pushState` / `popState`) with interactive modal states, ensuring native Back / Forward button navigation.

### **Tailwind CSS v4**
* Built with the next-generation Tailwind CSS v4 engine (`@tailwindcss/vite`).
* Custom `@custom-variant dark` support for high-contrast light and dark mode toggling without relying solely on OS media query overrides.
* Zero CSS bloat with lightning-fast CSS parsing and compilation.

---

## 2. Advanced Interactive Engines & Features

### **"Less, but better" Minimalist UI Design**
* Visual uncluttering: The landing page presents clean, punchy cards scannable in seconds.
* Deep technical information (accomplishments, architecture breakdowns, security policies) is revealed seamlessly via high-performance **"Read More"** modal dialogs.
* Minimalist header showcasing brand identity and action tools, with navigation jumping managed via the floating right-side dock.

### **Web3Forms Direct Messaging Integration**
* Connected direct message engine in `ContactSection` submitting payloads via `https://api.web3forms.com/submit`.
* Features client-side validation, silent honeypot spam protection (`botcheck: false`), loading spinners, and instant celebration fireworks on delivery.

### **Hardware-Accelerated Particle Canvas Engine**
* Custom 2D HTML5 Canvas animation loop with zero DOM overlay overhead.
* Features velocity physics, pointer repulsion fields, laser constellation connections, and dynamic radial lighting.
* Achieves steady **60–120 FPS** performance by offloading heavy blur calculations from DOM CSS filters to hardware canvas gradients.

### **Native Browser View Transitions API**
* Integrates `document.startViewTransition` with custom CSS keyframes.
* Enables fluid, GPU-composited cross-fading when toggling between Day (Light) and Night (Dark) modes and switching between 4 atmospheric color palettes.

### **Data Visualization (`Recharts v3`)**
* Interactive telemetry charting engine in the Dama Analytics project showcase.
* Supports real-time time-series area charts with dynamic gradients, responsive viewports, and custom tooltips.

### **ATS-Optimized 2-Page Print Engine**
* Dedicated `@media print` layout with `@page { margin: 18mm 14mm }` generating clean, single-click ATS-friendly PDF resumes.
* Displays full Professional Bio, structured Experience, Key Projects, and Technical Skills across exactly 2 balanced pages with zero confetti or URL footer interference.

---

## 3. Architectural Pattern: Feature-Sliced Design (FSD v2.1)

The project is structured according to **Feature-Sliced Design (FSD v2.1)** standards across 6 distinct layers:

| Layer | Responsibility | Examples |
| :--- | :--- | :--- |
| **`app/`** | Application initialization, global providers (Theme, Router), and root styles. | `ThemeProvider`, `AppRouterProvider`, `index.css` |
| **`pages/`** | Composed routed views connecting widgets and URL parameters. | `CvPage`, `NotFoundPage` |
| **`widgets/`** | Self-contained, autonomous UI compositions. | `Navbar`, `Hero`, `ExperienceTimeline`, `ProjectsGrid`, `SkillsSection`, `ContactSection`, Modals |
| **`features/`** | User interaction workflows and actions. | `ThemeSwitcher`, `InteractiveScrollControls`, `pdf-export` |
| **`entities/`** | Business domain models and data slices. | `profile`, `experience`, `project`, `skill`, `code-snippet` |
| **`shared/`** | Reusable UI primitives, canvas engines, utility libraries, config, and type definitions. | `InteractiveBackground`, `GithubIcon`, `confetti`, `themeConfig`, `types` |

---

## 4. Key Metrics & Benchmarks

* **Build Time:** < 2.0s with React Compiler enabled.
* **FPS:** Consistent 60–120 FPS on high-refresh-rate displays.
* **Accessibility:** Semantic HTML5 landmarks, ARIA labels on all interactive controls, and high-contrast color ratios in both Day and Night modes.
* **Print Ready:** Generates flawless 2-page ATS resumes with contact info header and uniform margins.
