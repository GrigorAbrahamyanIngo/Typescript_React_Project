import js from "@eslint/js";
import globals from "globals";
import testing from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-config-prettier";
import * as tseslint from "typescript-eslint";

export default [
  js.configs.recommended,

  // Type-checked rules only for your source code
  ...tseslint.configs.recommendedTypeChecked.map(config => ({
    ...config,
    files: ["src/**/*.ts", "src/**/*.tsx"],
  })),

  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
    languageOptions: {
      parser: testing.parser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
      globals: globals.browser,
    },

    plugins: {
      "@typescript-eslint": testing.plugin,
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      // React 19 + Vite
      "react/react-in-jsx-scope": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // TypeScript
      "@typescript-eslint/no-unused-vars": ["warn"],
      "@typescript-eslint/consistent-type-imports": "warn",

      // Style (Airbnb-like)
      "no-console": "warn",
      "prefer-const": "error",
    },
    ignores: [
      "node_modules",
      "dist",
      "build",
      "coverage",

      "vite.config.*",
      "eslint.config.mjs",
      ".prettierrc.mjs",

      ".env",
      ".env.*",
    ],
  },
  // Prettier last
  prettier,

];
