import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: [".esbuild/*", 'babel.config.js'],
  },
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off"
    }
  }
];