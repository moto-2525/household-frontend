import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

// ⭐ Prettier を追加
import prettierConfig from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // ⭐ Prettier を有効化
  prettierConfig,
  {
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      // ⭐ Prettier のフォーマットルールを ESLint に反映
      'prettier/prettier': 'error',
    },
  },

  // ⭐ Next.js のデフォ無視を上書き
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;
