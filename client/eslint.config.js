import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      stylistic.configs.customize({
        indent: 4,
        quotes: 'single',
        semi: true,
        jsx: true,
      }),
    ],
    rules: {
      '@stylistic/jsx-one-expression-per-line': 'off',
      'no-restricted-imports': ['error', {
        patterns: [{
          group: ['**/config/env'],
          message: 'Import computed values from config/index instead of raw env.',
        }],
      }],
    },
    plugins: {
      '@stylistic': stylistic,
    },
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: ['src/config/index.ts'],
    rules: { 'no-restricted-imports': 'off' },
  },
])
