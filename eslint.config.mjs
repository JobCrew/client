import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

import prettierConfing from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier/recommended";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // ESLint-Plugin-Prettier 추가(Prettier 규칙을 ESLint 규칙처럼 적용)
  prettierPlugin,

  // ESLint-Config-Prettier 추가(Prettier와 충돌하는 모든 규칙 비활성화)
  prettierConfing,
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
