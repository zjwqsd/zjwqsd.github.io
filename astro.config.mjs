// @ts-check
import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import preact from '@astrojs/preact';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import vue from '@astrojs/vue';
import pagefind from "astro-pagefind";
// import pa
// import content from 'astro-content';
// https://astro.build/config
export default defineConfig({
  site: 'https://zjwqsd.github.io',
  vite: { optimizeDeps: { include: ['asciinema-player'] } },
  markdown: {
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
  },
  integrations: [preact(), mdx(), react(), vue(),pagefind()],
});