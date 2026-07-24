import { defineConfig } from 'astro/config';

// Project Theos — static, zero-runtime-framework output.
// No React, no client framework. The only JS shipped is a few kilobytes of
// progressive-enhancement (scroll reveal, ambient audio toggle) that the site
// works fine without. This is the PRD's "maintainable by one non-coder" bet.
export default defineConfig({
  site: 'https://project-theos.example',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
  devToolbar: {
    enabled: false,
  },
});
