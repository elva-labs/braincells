import { defineConfig } from "@playwright/test";
import config from "./Config";
import path from "path";

export const STORAGE_STATE = path.join(__dirname, "playwright/.auth/user.json");

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: "html",
  timeout: 5 * 60 * 1000,
  use: {
    trace: "on-first-retry",
    baseURL: config.WEAVER_BASE_URL,
  },
  projects: [
    {
      name: "setup",
      testMatch: /global\.setup\.ts/,
      use: {
        video: "on",
      },
    },
    {
      name: "API",
      testMatch: /organization.spec.ts/,
      dependencies: ["setup"],
      use: {
        video: "on",
      },
    },
  ],
});