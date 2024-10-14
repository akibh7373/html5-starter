import { defineConfig } from "vite";
import fs from "fs";
import path from "path";

// Function to get all HTML files in the root directory
function getHtmlFiles() {
  const files = fs.readdirSync("./"); // Read files from the root directory
  const htmlFiles = files.filter((file) => file.endsWith(".html")); // Filter for .html files
  return htmlFiles.reduce((acc, file) => {
    acc[file.replace(".html", "")] = `./${file}`; // Create an entry for each HTML file
    return acc;
  }, {});
}

export default defineConfig({
  root: ".", // Set root directory as base
  build: {
    outDir: "dist", // Output directory for build
    rollupOptions: {
      input: {
        ...getHtmlFiles(), // Use the dynamic input from the function
      },
    },
  },
  server: {
    open: "./index.html", // Open the index on server start
    watch: {
      usePolling: true, // Useful for hot reload in certain environments
    },
  },
});
