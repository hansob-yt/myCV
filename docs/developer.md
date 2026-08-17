# Developer Guide & Extension Manual

A practical developer guide for modifying, extending, and adding new features to this CV & Portfolio application.

---

## 1. Project Directory Map

```
src/
├── app/                              # Layer 1: App initialization & providers
│   ├── providers/
│   │   ├── router-provider/          # React Router v7 createBrowserRouter
│   │   └── theme-provider/           # View Transitions Day/Night & Atmosphere
│   ├── styles/
│   │   └── index.css                 # Tailwind CSS v4, custom variants, print styles
│   ├── App.tsx                       # Root component
│   └── index.ts
│
├── pages/                            # Layer 2: Composed routed views
│   ├── cv-page/                      # Main interactive CV page view with URL modals
│   └── not-found-page/               # 404 Route Not Found page view
│
├── widgets/                          # Layer 3: Autonomous self-contained UI blocks
│   ├── navbar/                       # Minimalist top header (brand & action tools)
│   ├── hero/                         # Bio hero card, stats, and Story trigger
│   ├── experience-timeline/          # Career trajectory cards & Read More triggers
│   ├── projects-grid/                # Enterprise portfolio cards & Case Study triggers
│   ├── skills-toolkit/               # Tech skills pill matrix, category filters & search
│   ├── interactive-extras/           # Capabilities & tools hub (2x2 grid)
│   ├── contact-section/              # Web3Forms direct message form & social links
│   ├── fsd-code-explorer/            # Interactive FSD terminal modal
│   ├── bio-modal/                    # Detailed background narrative modal
│   ├── experience-modal/             # Detailed accomplishments modal
│   ├── project-modal/                # Deep-dive enterprise showcase & live demos modal
│   └── print-resume/                 # Clean 2-page ATS print view layout
│
├── features/                         # Layer 4: User actions & interactions
│   ├── theme-switcher/               # Day/Night & Atmosphere switcher UI
│   ├── scroll-nav-dock/              # Right-edge quick jump dock & progress bar
│   └── pdf-export/                   # PDF print export handler
│
├── entities/                         # Layer 5: Domain entities & data models
│   ├── profile/                      # Personal identity, full bio, stats, links
│   ├── experience/                   # Work history and achievements
│   ├── project/                      # Enterprise project case studies
│   ├── skill/                        # Skills inventory, levels, categories
│   └── code-snippet/                 # Architectural code snippets
│
├── shared/                           # Layer 6: Reusable primitives & utilities
│   ├── canvas/                       # Particle physics canvas engine
│   ├── ui/                           # Base UI icons & components
│   ├── lib/                          # Confetti & animation utilities
│   ├── config/                       # Theme tokens & palettes
│   └── types/                        # TypeScript type contracts
│
└── main.tsx                          # Root entry point
```

---

## 2. How to Add a New Project

1. **Open the project entity model:**
   [`src/entities/project/model/projectData.ts`](file:///d:/gitProjects/myCV/src/entities/project/model/projectData.ts)

2. **Add your new project object conforming to `ProjectItem`:**
   ```ts
   {
     id: 'my-new-app',
     title: 'My App',
     subtitle: 'Next-Gen Platform',
     category: 'Web Applications',
     tagline: 'A concise summary of what this application solves.',
     description: [
       'Detailed paragraph 1 explaining architecture and purpose.',
       'Detailed paragraph 2 explaining frontend engineering highlights.'
     ],
     techStack: ['React 19', 'TypeScript', 'Tailwind CSS v4'],
     highlights: [
       'Accomplishment 1 with tangible metrics',
       'Accomplishment 2 with architectural focus'
     ],
     architectureDetails: {
       pattern: 'Feature-Sliced Design (FSD)',
       structure: ['app/', 'pages/', 'widgets/', 'features/', 'entities/', 'shared/'],
       security: ['HttpOnly cookies', 'CSRF protection'],
       performance: ['Vite bundle splitting', 'React Compiler auto-memoization']
     },
     metrics: [
       { label: 'Latency', value: '<50ms' },
       { label: 'Test Coverage', value: '95%' }
     ]
   }
   ```

3. **Verify Route Deep-Linking:**
   Visiting `/projects/my-new-app` will automatically open the modal showcasing your new project!

---

## 3. How to Add a New Skill or Category

1. **Open the skill entity model:**
   [`src/entities/skill/model/skillData.ts`](file:///d:/gitProjects/myCV/src/entities/skill/model/skillData.ts)

2. **Append to the `skills` array:**
   ```ts
   {
     name: 'GraphQL',
     level: 88,
     experience: '1 yr',
     highlight: false,
     category: 'frameworks', // 'core' | 'frameworks' | 'tools' | 'architecture'
     tags: ['Apollo Client', 'Queries', 'Mutations', 'Schema Stitching']
   }
   ```

3. The live search and category counters in `SkillsSection` will update dynamically.

---

## 4. How to Add or Customize Theme Atmospheres

Atmosphere palettes and day/night color definitions are managed in:
[`src/shared/config/themeConfig.ts`](file:///d:/gitProjects/myCV/src/shared/config/themeConfig.ts)

To adjust or add a new atmosphere:
1. Define the palette colors (background, accent, primary glow, secondary glow, particle colors) for both `dark` and `light` modes in `THEME_PALETTES`.
2. Add its name in `ATMOSPHERE_NAMES`.
3. The `ThemeProvider`, `ThemeSwitcher`, and `InteractiveBackground` canvas will automatically adopt the new theme configurations.

---

## 5. Configuring Web3Forms Direct Messaging

Direct messaging is managed in:
[`src/widgets/contact-section/ui/ContactSection.tsx`](file:///d:/gitProjects/myCV/src/widgets/contact-section/ui/ContactSection.tsx)

* Uses the environment variable `VITE_WEB3FORMS_KEY` from `.env`.
* Configures automatic payload dispatching to `https://api.web3forms.com/submit`.
* Includes spam honeypot filtering (`botcheck: false`) and instant fireworks feedback upon delivery.

---

## 6. Git Workflow & Commit Guidelines

This project enforces **Conventional Commits** via **Husky** and **Commitlint** with full support for **camelCase** and capitalized terms.

When committing code, use the pattern:
```text
type(scope): subject
```

### Examples:
* `feat(example): this is a commit example`
* `feat(themeContext): update ThemeProvider state`
* `fix(contactSection): connect direct message to Web3Forms API`
* `refactor(CvPage): optimize React Router navigation and modals`
* `style(SkillsToolkit): polish GlassCard hover effects`

For the full list of allowed types and validation rules, see the [Commit Message Rules Guide](./commit-rules.md).
