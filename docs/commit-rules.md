# Commit Message Conventions & Husky Commitlint Rules

This project enforces **Conventional Commits** via **Husky** and **Commitlint**. Every commit must follow a standardized structure before Git will allow it to be committed.

---

## 1. Commit Message Format

Every commit message follows this structure:

```text
type(scope): subject
```

### Examples (Supports camelCase & Capitalized Words):
* `feat(example): this is a commit example`
* `feat(themeContext): update ThemeProvider state with camelCase`
* `fix(contactSection): connect direct message to Web3Forms API`
* `refactor(CvPage): optimize React Router navigation and modals`
* `style(SkillsToolkit): polish GlassCard hover effects and contrast`

---

## 2. Allowed Commit Types

| Type | When to Use | Example |
| :--- | :--- | :--- |
| **`feat`** | Adding a new feature, component, or capability | `feat(router): add deep linking support for project modals` |
| **`fix`** | Fixing a bug, UI regression, or broken logic | `fix(auth): prevent infinite token refresh loop on 401 error` |
| **`refactor`** | Code refactoring without adding features or fixing bugs | `refactor(fsd): restructure pages and widgets into FSD layers` |
| **`style`** | Styles, formatting, CSS, whitespace (no code logic change) | `style(theme): enhance text contrast ratios in day mode` |
| **`docs`** | Documentation changes only | `docs(readme): add quick start and developer instructions` |
| **`perf`** | Code change that improves runtime performance | `perf(canvas): batch particle rendering and use radial gradient` |
| **`test`** | Adding or updating unit/integration tests | `test(auth): add unit test for axios interceptor` |
| **`chore`** | Tooling, dependency upgrades, build config | `chore(deps): bump vite and tailwind versions` |
| **`build`** | Build system changes | `build(vite): configure react compiler preset` |
| **`ci`** | Continuous integration scripts or workflows | `ci(github): add automated lint and build action` |

---

## 3. Formatting & Casing Rules

1. **Type:** One of the allowed types listed above.
2. **Scope (in parentheses):** Identifies the affected component, hook, or slice. Supports **camelCase** (e.g. `themeContext`), **PascalCase** (e.g. `CvPage`), **kebab-case** (e.g. `theme-provider`), or plain lowercase.
3. **Separator:** Must have a colon followed by a space `: `.
4. **Subject:**
   - Supports **camelCase**, **PascalCase**, and capitalized terms (e.g. `Web3Forms`, `React Router`, `TypeScript`, `ThemeProvider`).
   - Must be written in the **imperative mood** (e.g., `"add"`, `"fix"`, `"update"`, `"remove"`).
   - Must **not** end with a period (`.`).
   - Must be under 100 characters total for the line.

---

## 4. Good vs Bad Commit Examples

### ✅ Good Commits (All Allowed):
```text
feat(example): this is a commit example
feat(themeContext): update ThemeProvider state
fix(contactSection): fix Web3Forms API payload
refactor(CvPage): optimize React Router navigation
style(SkillsToolkit): polish GlassCard hover effects
docs(commitRules): update camelCase instructions
perf(InteractiveBackground): optimize 2D canvas batching
chore(husky): configure commitlint rules
```

### ❌ Bad Commits (Will Be Blocked):
```text
Updated styles                  # Missing type and scope
feat(navbar): fixed bug.        # Ends with a period, 'fixed' is not imperative
wip                             # Non-descriptive and invalid format
```

---

## 5. How It Works (Husky Hooks)

* **`commit-msg` hook (`.husky/commit-msg`):**
  Runs `commitlint` automatically on every `git commit`. If the message does not conform to the rules, the commit is rejected with a descriptive error explanation.

* **`pre-commit` hook (`.husky/pre-commit`):**
  Runs `npm run lint` (`oxlint`) before commits are processed to ensure no lint or syntax errors enter the codebase.

---

## 6. Manual Validation Command

You can test any commit message before committing:

```bash
echo "feat(themeContext): update ThemeProvider state" | npx commitlint
```
