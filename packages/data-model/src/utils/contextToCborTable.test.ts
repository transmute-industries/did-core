import { contextToCborTable } from './contextToCborTable';

// it('context to table', async () => {
//   const table = await contextToCborTable('https://www.w3.org/ns/did/v1');
//   // console.log(JSON.stringify(table, null, 2));
//   // expect(table).toEqual(fixtures.didV1CborTable);
// });

it('context to csv', async () => {
  const { table } = await contextToCborTable('https://www.w3.org/ns/did/v1');
  // console.log(JSON.stringify(table, null, 2));
  let str = 'Tag,Term,Definition\n';
  table.forEach((t: any) => {
    str += `${t.tag},${t.term},${t.definition}\n`;
  });
  const fs = require('fs');
  const path = require('path');
  fs.writeFileSync(path.resolve(__dirname, '../../did-core-v1.csv'), str);
});
