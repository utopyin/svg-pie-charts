import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import reactRefresh from 'eslint-plugin-react-refresh';
import pluginImport from 'eslint-plugin-import';

export default [
  {
    // Flat config: ignore patterns
    ignores: [
      'node_modules',
      'scripts/*',
      'config/*',
      'pnpm-lock.yaml',
      'pnpm-workspace.yaml',
      '.DS_Store',
      'package.json',
      'tsconfig.json',
      '**/*.md',
      'build',
      '.eslintrc.cjs',
      'eslint.config.js',
      '**/.*', // Ignore all dotfiles (like .gitignore)
    ],
  },
  {
    // Language options (ES Modules, JSX)
    languageOptions: {
      ecmaVersion: 2021, // ES2021 syntax support
      sourceType: 'module',
      globals: {
        window: 'readonly', // For browser-based globals
        document: 'readonly',
        Edit: 'writable',
        console: 'writable',
        _: 'writable',
        $: 'writable',
      },
      ecmaFeatures: {
        jsx: true, // Enable JSX parsing
      },
    },

    // Plugins to be used
    plugins: {
      react,
      'react-hooks': reactHooks,
      prettier,
      '@typescript-eslint': typescriptEslint,
      'react-refresh': reactRefresh,
      pluginImport,
    },

    // ESLint rule configurations (extends equivalent in Flat Config)
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...typescriptEslint.configs.recommended.rules,
      ...prettier.configs.recommended.rules,
      'prettier/prettier': 'error', // Prettier formatting as an ESLint rule
    },

    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
  },
];
