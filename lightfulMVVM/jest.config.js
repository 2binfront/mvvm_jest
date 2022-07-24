/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: { "^.+\\.ts?$": "ts-jest" },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};