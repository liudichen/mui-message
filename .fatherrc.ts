import { defineConfig } from 'father';

export default defineConfig({
  esm: {},
  cjs:{
    platform:'browser',
  },
  // prebundle: {},
});
