import { defineConfig } from 'father';

export default defineConfig({
  esm: {},
  cjs:{
    platform:'browser',
  },
  prebundle: {},
  extraBabelPresets: ["@babel/preset-react"],
});
