/* eslint-disable @typescript-eslint/no-require-imports */
// Jest (jsdom env) can't transform isomorphic-dompurify's server-side jsdom
// dependency (it pulls in ESM-only packages outside transformIgnorePatterns).
// In the jsdom test environment we don't need it — route to plain `dompurify`,
// which is API-identical (addHook/sanitize) and runs natively in jsdom. This is
// auto-applied to every test because it lives in the root __mocks__ folder.
module.exports = { __esModule: true, default: require('dompurify') };
