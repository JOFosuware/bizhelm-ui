// Next.js runs PostCSS config in ESM when package.json has "type": "module".
// Use ESM export syntax to avoid "module is not defined" errors.
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
