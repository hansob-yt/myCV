export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature for the user
        'fix',      // Bug fix
        'refactor', // Refactoring production code (e.g. FSD reorganization)
        'style',    // Formatting, CSS, UI styles, whitespace (no code logic changes)
        'docs',     // Documentation changes (e.g. README, docs/*.md)
        'perf',     // Performance improvements
        'test',     // Adding or updating tests
        'chore',    // Tooling, dependencies, configuration
        'build',    // Build system or bundling changes
        'ci',       // CI/CD workflow adjustments
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
  },
};
