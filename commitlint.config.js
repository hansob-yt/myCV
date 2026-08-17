export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'refactor', // Code refactoring
        'style',    // Formatting, CSS, styles
        'docs',     // Documentation
        'perf',     // Performance
        'test',     // Tests
        'chore',    // Tooling & maintenance
        'build',    // Build system
        'ci',       // CI workflows
      ],
    ],
    // Disable case restrictions to allow camelCase, PascalCase, and capital letters
    'type-case': [0],
    'type-empty': [2, 'never'],
    'scope-case': [0],
    'subject-case': [0],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
  },
};
