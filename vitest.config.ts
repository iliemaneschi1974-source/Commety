import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,

    environment: "node",

    include: [
      "**/*.test.ts",
      "**/*.spec.ts",
    ],

    exclude: [
      "**/node_modules/**",
      "**/.next/**",
      "**/dist/**",
      "**/coverage/**",
    ],

    coverage: {
      provider: "v8",
      reporter: [
        "text",
        "html",
      ],
    },
  },
});