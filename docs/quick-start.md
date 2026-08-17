# Quick Start Guide

This guide walks you through setting up, configuring, running, and building the CV & Portfolio application locally.

---

## 1. Prerequisites

Make sure you have the following installed on your machine:
* **Node.js**: version `18.18.0` or higher (Node 20+ / 22+ recommended)
* **Package Manager**: `npm` (v9+), `pnpm`, or `yarn`
* **Git**: latest version

---

## 2. Installation & Environment Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/hansob-yt/myCV.git
   cd myCV
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables (optional)**:
   A `.env.example` template is provided:
   ```bash
   cp .env.example .env
   ```

   | Variable | Description | Default |
   | :--- | :--- | :--- |
   | `VITE_WEB3FORMS_KEY` | Access key for Web3Forms direct messaging | Production key |
   | `VITE_SITE_URL` | Canonical website domain | `https://hansob.vercel.app` |

---

## 3. Development Server

Start the local Vite development server with Hot Module Replacement (HMR) and the React 19 Compiler active:

```bash
npm run dev
```

By default, the application will be available at:
* **URL:** `http://localhost:5173/` (or `http://localhost:5174/` if 5173 is occupied)

---

## 4. Production Build & Verification

To compile TypeScript type definitions and build the production bundle:

```bash
npm run build
```

This triggers:
1. `tsc -b`: Type-checking the entire project against strict TypeScript rules.
2. `vite build`: Compiling with Rollup, the React 19 Compiler (`babel-plugin-react-compiler`), and Tailwind CSS v4 to output minified assets in `dist/`.

To preview the production bundle locally:

```bash
npm run preview
```

---

## 5. Code Quality & Linting

Run the ultra-fast Oxlint linter to check for code standard violations:

```bash
npm run lint
```

---

## 6. Available Scripts Reference

| Command | Action |
| :--- | :--- |
| `npm run dev` | Launches local Vite development server with HMR |
| `npm run build` | Compiles TypeScript and builds optimized production bundle |
| `npm run preview` | Serves the production build locally for testing |
| `npm run lint` | Runs Oxlint across the codebase for static code analysis |
| `npm run prepare` | Configures Husky Git hooks |

---

## 7. Deep-Link URL Routes

You can test route synchronization and deep linking directly in your browser:
* **Home:** `http://localhost:5173/`
* **Kilid SSO Case Study:** `http://localhost:5173/projects/kilid-sso`
* **Dama Analytics Case Study:** `http://localhost:5173/projects/dama-analytics`
* **Work Experience Detail:** `http://localhost:5173/experience/kavano-dev`
* **Biography Story:** `http://localhost:5173/bio`
* **FSD Architecture Inspector:** `http://localhost:5173/terminal`
* **404 Route Not Found:** `http://localhost:5173/invalid-route`
