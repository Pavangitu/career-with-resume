import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

// Automatically copy assets on load
try {
  const srcDir = 'C:\\Users\\pavan\\.gemini\\antigravity-ide\\brain\\6065cd77-f42c-49c1-b878-2e9214e42072';
  const destDir = path.join(__dirname, 'public');
  if (fs.existsSync(srcDir)) {
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    const fileMap: { [key: string]: string } = {
      'tech_elegant_1785134306277.png': 'tech_elegant.png',
      'boardroom_classic_1785134323072.png': 'boardroom_classic.png',
      'minimal_developer_1785134340633.png': 'minimal_developer.png',
      'creative_split_panel_1785134359616.png': 'creative_split_panel.png'
    };
    Object.entries(fileMap).forEach(([srcName, destName]) => {
      const srcPath = path.join(srcDir, srcName);
      const destPath = path.join(destDir, destName);
      if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`[Vite Asset Setup] Copied ${srcName} -> ${destName}`);
      }
    });
  }
} catch (err: any) {
  console.warn("Asset copying in vite.config.ts failed:", err.message);
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
