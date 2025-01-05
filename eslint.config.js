import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginPrettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // 파일 패턴 지정
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },

  // 전역 변수 설정
  { languageOptions: { globals: globals.browser } },

  // 기본 ESLint 규칙
  pluginJs.configs.recommended,

  // TypeScript 규칙
  ...tseslint.configs.recommended,

  // React 규칙
  pluginReact.configs.flat.recommended,

  // Prettier 통합 규칙
  {
    plugins: { prettier: pluginPrettier },
    rules: { 'prettier/prettier': 'error' },
  },

  // Prettier와 ESLint 충돌 방지
  prettierConfig,
];
