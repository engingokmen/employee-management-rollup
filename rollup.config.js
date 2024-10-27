import terser from "@rollup/plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: "src/main.js",
  output: [
    {
      file: "dist/index.js",
      format: "umd",
      name: "name",
    },
    {
      file: "dist/index.min.js",
      format: "iife",
      name: "version",
      plugins: [terser()],
    },
  ],
  plugins: [nodeResolve()],
};
