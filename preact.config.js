import { defaultConfig } from '@preact/preset-vite';

export default {
  ...defaultConfig,
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  }
};