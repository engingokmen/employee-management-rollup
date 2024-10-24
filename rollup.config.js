import terser from "@rollup/plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: "src/main.js",
  output: [
    {
      file: "dist/bundle.js",
      format: "esm",
    },
    {
      file: "dist/bundle.min.js",
      format: "iife",
      name: "version",
      plugins: [terser()],
    },
  ],
  plugins: [nodeResolve()],
};
