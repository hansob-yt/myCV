# Commit Message Conventions & Husky Commitlint Rules

This project enforces strict **Conventional Commits** via **Husky** and **Commitlint**. Every commit must follow a standardized structure before Git will allow it to be committed.

---

## 1. Commit Message Format

Every commit message must follow this exact pattern:

```text
type(scope): subject
```

### Example:
```text
feat(example): this is a commit example
```

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

## 3. Formatting Rules

1. **Type:** Must be lowercase and one of the allowed types listed above.
2. **Scope (in parentheses):** Must be lowercase and describe the affected slice or module (e.g. `(auth)`, `(navbar)`, `(theme)`, `(canvas)`, `(router)`).
3. **Separator:** Must have a colon followed by a space `: `.
4. **Subject:**
   - Must be written in the **imperative mood** (e.g., `"add"`, `"fix"`, `"update"`, `"remove"` — not `"added"` or `"fixing"`).
   - Must **not** end with a period (`.`).
   - Must be clear and concise (under 100 characters total for the entire line).

---

## 4. Good vs Bad Commit Examples

### ✅ Good Commits:
```text
feat(example): this is a commit example
feat(projects): add interactive telemetry simulation for dama
fix(theme): lock button minimum width to prevent navbar layout shift
refactor(entities): split cv data into domain slices
style(skills): adjust hover card glassmorphic shadow
docs(rules): document husky and commitlint guidelines
perf(particles): replace dom blur with hardware canvas gradient
chore(husky): configure commit-msg and pre-commit hooks
```

### ❌ Bad Commits (Will Be Blocked):
```text
Updated styles                  # Missing type and scope
feat: fixed bug.                # Ends with a period, 'fixed' is not imperative
FEAT(NAVBAR): ADD BUTTON        # Uppercase type and scope
fix(theme): Fixed the problem.  # Capitalized subject with ending period
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
echo "feat(example): this is a commit example" | npx commitlint
```
