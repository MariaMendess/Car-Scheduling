import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";
import "reflect-metadata";

export default {
	bail: true,
	verbose: true,
	clearMocks: true,
	coverageProvider: "v8",
	moduleNameMapper: {
		"^@modules/(.*)$": "<rootDir>/src/modules/$1",
		"^@config/(.*)$": "<rootDir>/src/config/$1",
		"^@utils/(.*)$": "<rootDir>/src/utils/$1",
		"^@shared/(.*)$": "<rootDir>/src/shared/$1",
		"^@errors/(.*)$": "<rootDir>/src/errors/$1",
	},
	// pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/" }),
	preset: "ts-jest",
	testMatch: ["**/*.spec.ts"],
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
