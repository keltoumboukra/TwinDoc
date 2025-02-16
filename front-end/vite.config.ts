import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import styleX from 'vite-plugin-stylex'
// import {remixDevTools} from 'remix-development-tools'

installGlobals();

export default defineConfig({
  ssr: {
    noExternal: ['@radix-ui/themes'],
  },
  plugins: [
    // remixDevTools(),
    remix(),
    tsconfigPaths(),
    styleX(),
  ],
});
