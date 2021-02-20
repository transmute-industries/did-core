const fs = require('fs');
const path = require('path');
const slugify = require('slugify');
const statements = require('../__fixtures__/statements.json');

const blocks = {};

statements.map((text) => {
  const section = text.split('\n')[0];
  const caseNumber = section.split(' ')[0];
  const sectionHeader = section.split(' ').splice(1).join(' ');
  blocks[sectionHeader] = blocks[sectionHeader] || {};
  // kill duplicates
  blocks[sectionHeader][caseNumber] = text.split('\n').splice(1).join(' ');
});

Object.keys(blocks).map((key) => {
  let fileName = slugify(key, {
    replacement: '-',
    lower: true,
  });
  let fileTestCases = Object.keys(blocks[key])
    .map((caseNumber) => {
      return `
describe("${caseNumber}", ()=>{
  describe("${blocks[key][caseNumber].trim()}", ()=>{
    test.todo("positive")
    test.todo("negative")
  })
})`;
    })
    .join('\n');
  fs.writeFileSync(
    path.resolve(__dirname, `../__generated__/${fileName}.test.js`),
    fileTestCases
  );
});
