import { defineConfig } from 'astro/config';

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  ...(isGitHubPages
    ? {
        site: 'https://ecoartic.github.io',
        base: '/ontario-hvac'
      }
    : {
        base: '/'
      }),
  server: {
    host: '127.0.0.1',
    port: 55000
  }
});
