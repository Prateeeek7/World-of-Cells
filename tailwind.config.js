module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Enable content purging in production for smaller CSS bundles
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./public/index.html"
    ],
  },
  // Optimize for production
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
}; 