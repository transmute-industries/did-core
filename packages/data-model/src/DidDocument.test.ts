import * as fixtures from './__fixtures__';
import { DidDocument } from './DidDocument';

it('did-key-0', () => {
  const d = DidDocument.from(fixtures.didDocs.didKey0);
  const ddoJson = d.toJSON();
  expect(JSON.parse(ddoJson)).toEqual(fixtures.didDocs.didKey1);
  const ddoCbor = d.toCBOR();
  const d1 = DidDocument.from(ddoCbor);
  expect(JSON.parse(d1.toJSON())).toEqual(fixtures.didDocs.didKey1);
});

// it('did-key-1', () => {
//   const d = new DidDocument(fixtures.didDocs.didKey1);
//   expect(d.id).toBeDefined();
//   const djson = d.toJSON();
//   expect(djson).toEqual(JSON.stringify(fixtures.didDocs.didKey1, null, 2));
// });
