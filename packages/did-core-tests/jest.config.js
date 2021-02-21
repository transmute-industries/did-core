module.exports = {
  testPathIgnorePatterns: ['/__generated__'],
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: '../../docs',
        filename: 'index.html',
        expand: true,
      },
    ],
  ],
};
