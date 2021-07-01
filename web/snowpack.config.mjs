/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  mount: {
    // directory name: 'build directory'
     public: '/',
     src: '/dist',
  },
  plugins: [
    ["@snowpack/plugin-build-script", { cmd: "postcss", input: [".css"], output: [".css"] }],
    ["@snowpack/plugin-webpack"]
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    {match: "routes", src: ".*", dest: "/index.html"},
  ],
  env: {
    API_URL: 'http://localhost:3000/api'
  },
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};
