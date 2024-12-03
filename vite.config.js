import { defineConfig } from 'vite'
import htmlMinifier from 'html-minifier'

export default defineConfig({
  base: './',
  server: {
    open: true,
    host: '0.0.0.0'  // This enables access from other devices
  },
  build: {
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      }
    },
    minify: true,
    cssMinify: true
  },
  plugins: [
    {
      name: 'move-scripts-to-body-and-minify',
      transformIndexHtml(html) {
        // Move script tags from head to body
        const scriptRegex = /<script[^>]*>[\s\S]*?<\/script>/gi;
        const scripts = html.match(scriptRegex) || [];
        let newHtml = html.replace(scriptRegex, '');
        
        // Insert scripts at the end of body
        newHtml = newHtml.replace('</body>', scripts.join('') + '</body>');

        // Minify HTML
        return htmlMinifier.minify(newHtml, {
          collapseWhitespace: true,
          removeComments: true,
          minifyCSS: true,
          minifyJS: true
        });
      }
    }
  ]
})
