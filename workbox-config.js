module.exports = {
  globDirectory: 'public/',
  globPatterns: ['**/*.{js,ico,html,png,json,txt,css}'],
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
  maximumFileSizeToCacheInBytes: 2500000,
  swDest: 'public/sw.js',
};
