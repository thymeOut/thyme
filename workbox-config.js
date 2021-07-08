module.exports = {
  globDirectory: 'public/',
  globPatterns: ['**/*.{js,ico,html,png,json,txt,css}'],
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
  swDest: 'public/sw.js',
};
