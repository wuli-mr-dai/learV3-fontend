import js from '@eslint/js'
import vue from 'eslint-plugin-vue'

export default [
  // 基础 JavaScript 规则
  js.configs.recommended,

  // Vue 规则
  {
    files: ['**/*.vue'],
    ...vue.configs['flat/recommended'],
  },

  // TypeScript 规则
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-console': 'warn',
      'no-debugger': 'warn',
    },
  },

  // 通用规则
  {
    files: ['**/*.js', '**/*.ts', '**/*.vue'],
    rules: {
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',
    },
  },

  // 忽略文件
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'coverage/**',
      '*.min.js',
      'package-lock.json',
      'yarn.lock',
      'pnpm-lock.yaml',
    ],
  },
]
