# Sobhan Khademi Sohi — Interactive CV & Engineering Portfolio

[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![React Compiler](https://img.shields.io/badge/React%20Compiler-Active-blue)](https://react.dev/learn/react-compiler)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8%2B-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4.3-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React%20Router-v7-CA4245?logo=react-router&logoColor=white)](https://reactrouter.com/)
[![Architecture](https://img.shields.io/badge/Architecture-FSD%20v2.1-FF5722)](https://feature-sliced.design/)

A high-performance, interactive, and production-ready Curriculum Vitae (CV) and Engineering Portfolio application built with **React 19**, the official **React Compiler**, **Feature-Sliced Design (FSD v2.1)** architecture, **React Router v7**, **Tailwind CSS v4**, and a hardware-accelerated **2D Canvas Particle Physics Engine**.

---

## 🌟 Key Highlights & Features

* **Feature-Sliced Design (FSD v2.1):** 6 decoupled domain layers (`app`, `pages`, `widgets`, `features`, `entities`, `shared`) enforcing strict unidirectional data flow.
* **React 19 + React Compiler:** Automatic compile-time memoization eliminating manual `useMemo` / `useCallback` overhead.
* **URL-Driven Routing & Deep-Linking:** Declarative routing with `react-router-dom` supporting modal deep-linking and seamless browser Back/Forward navigation.
* **Dual Theme Engine & Atmospheric Palettes:** Day (Light) and Night (Dark) mode with 4 dynamic atmospheric color moods (*Cyber Cyan, Nebula, Emerald, Sunset*).
* **60–120 FPS View Transitions:** Native `document.startViewTransition` GPU-composited cross-fading for fluid theme and palette switching.
* **Interactive Particle Physics Canvas:** Optimized HTML5 2D Canvas with pointer repulsion, constellation connections, and hardware-accelerated radial ambient glows.
* **Interactive Code & Architecture Explorer:** VS-Code style terminal modal inspecting real architectural TypeScript snippets, Axios token rotation interceptors, and Zod schemas.
* **ATS-Optimized Print Resume:** Single-click printable resume layout formatted for clean PDF export.

---

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/hansob-yt/myCV.git
cd myCV
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open **[http://localhost:5173/](http://localhost:5173/)** to view the application with Hot Module Replacement.

### 3. Production Build
```bash
npm run build
```

---

## 📚 Project Documentation

Detailed documentation is available in the [`docs/`](./docs) folder:

* 📖 **[Quick Start Guide](./docs/quick-start.md)** — Step-by-step setup, environment prerequisites, and script references.
* 🛠️ **[Technology Stack Summary](./docs/summary.md)** — In-depth breakdown of React 19, React Compiler, View Transitions, Recharts, and FSD architecture.
* 💎 **[Code Quality Standards](./docs/code-quality.md)** — Architectural rules, Oxlint static analysis, strict typing, and rendering budgets.
* 🧑‍💻 **[Developer Guide](./docs/developer.md)** — Guide for adding new projects, skills, themes, and FSD layer slices.

---

## 🏗️ Architectural Overview (FSD v2.1)

```
src/
├── app/                  # Layer 1: App initialization, ThemeProvider, AppRouterProvider, root styles
├── pages/                # Layer 2: Composed page views (CvPage, NotFoundPage)
├── widgets/              # Layer 3: Autonomous UI assemblies (Navbar, Hero, Timeline, Projects, Skills, Modals)
├── features/             # Layer 4: Interactive workflows (ThemeSwitcher, ScrollNavDock, PdfExport)
├── entities/             # Layer 5: Domain data models (Profile, Experience, Project, Skill, CodeSnippet)
├── shared/               # Layer 6: Reusable primitives (Canvas engine, UI icons, Lib/Confetti, Config, Types)
└── main.tsx              # Root entry point
```

---

## 👤 Author

**Sobhan Khademi Sohi**
* **Role:** Frontend Web Developer
* **Location:** Tehran, Iran
* **Email:** [sobhankhademi79@gmail.com](mailto:sobhankhademi79@gmail.com)
* **GitHub:** [@hansob-yt](https://github.com/hansob-yt)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
