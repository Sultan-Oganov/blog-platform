import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  transformIgnorePatterns: ["/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default config;
