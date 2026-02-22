import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(() => {
  const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];

  return {
    base: repoName ? `/${repoName}/` : "/",
    plugins: [react(), tailwindcss()],
  };
});
