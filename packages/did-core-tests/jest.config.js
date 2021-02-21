module.exports = {
  testPathIgnorePatterns: ['/__generated__'],
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        pageTitle: 'DID Core Test Suite',
        logoImgPath: './logo.png',
        publicPath: '../../docs',
        filename: 'index.html',
        expand: true,
      },
    ],
  ],
};
