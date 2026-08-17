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
│   │   └── index.css                 # Tailwind CSS v4 & custom variants
│   ├── App.tsx                       # Root component
│   └── index.ts
│
├── pages/                            # Layer 2: Composed routed views
│   ├── cv-page/                      # Main interactive CV page view
│   └── not-found-page/               # 404 Route Not Found page view
│
├── widgets/                          # Layer 3: Autonomous self-contained UI blocks
│   ├── navbar/                       # Top navigation bar
│   ├── hero/                         # Bio hero card and stats
│   ├── experience-timeline/          # Career trajectory & metrics
│   ├── projects-grid/                # Enterprise portfolio & filters
│   ├── skills-toolkit/               # Tech skills inventory & search
│   ├── interactive-extras/           # Capabilities & tools hub
│   ├── contact-section/              # Contact form & social links
│   ├── fsd-code-explorer/            # Interactive FSD terminal modal
│   ├── bio-modal/                    # Detailed background narrative modal
│   ├── experience-modal/             # Detailed accomplishments modal
│   ├── project-modal/                # Deep-dive enterprise showcase & live demos modal
│   └── print-resume/                 # Clean ATS print view layout
│
├── features/                         # Layer 4: User actions & interactions
│   ├── theme-switcher/               # Day/Night & Atmosphere switcher UI
│   ├── scroll-nav-dock/              # Right-edge quick jump dock & progress bar
│   └── pdf-export/                   # PDF trigger with celebration effects
│
├── entities/                         # Layer 5: Domain entities & data models
│   ├── profile/                      # Personal identity, stats, links
│   ├── experience/                   # Work history and achievements
│   ├── project/                      # Enterprise project case studies
│   ├── skill/                        # Skills inventory and categories
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
     experience: '1.5 yrs',
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

## 5. Adding a New FSD Layer Slice

When creating a new feature or widget:
1. Create a directory under the appropriate layer (e.g. `src/features/new-action/`).
2. Implement components inside `ui/` or business logic inside `model/` or `lib/`.
3. Create an `index.ts` file inside the slice root to explicitly export only what higher layers should access.
4. Consume the slice in a higher layer (e.g. `pages/` or `widgets/`).

---

## 6. Git Workflow & Commit Guidelines

This project enforces **Conventional Commits** via **Husky** and **Commitlint**.

When committing code, use the pattern:
```text
type(scope): subject
```

### Examples:
* `feat(example): this is a commit example`
* `fix(theme): prevent button layout shifting`
* `refactor(router): modularize route model`
* `style(hero): polish glassmorphic borders`

For the full list of allowed types and validation rules, see the [Commit Message Rules Guide](./commit-rules.md).
