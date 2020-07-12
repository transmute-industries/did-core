import * as fixtures from './__fixtures__';
import { DidDocument } from './DidDocument';

it('toJSON', () => {
  const d = DidDocument.from(fixtures.didDocs.didKey0);
  const ddoJson = d.toJSON();
  expect(JSON.parse(ddoJson)).toEqual(fixtures.didDocs.didKey1);
});

it('CBOR to/from', async () => {
  const b = new DidDocument(fixtures.didDocs.didKey0);
  const d: any = await b.toCBOR();
  expect(d.length).toBe(1246);
  const d1 = await DidDocument.fromCBOR(d);
  expect(JSON.parse(d1.toJSON())).toEqual(fixtures.didDocs.didKey1);
});

it('DAG_CBOR to/from', async () => {
  const b = new DidDocument(fixtures.didDocs.didKey0);
  const d: any = await b.toCBOR('DAG_CBOR');
  expect(d.length).toBe(1246);
  const d1 = await DidDocument.fromCBOR(d, 'DAG_CBOR');
  expect(JSON.parse(d1.toJSON())).toEqual(fixtures.didDocs.didKey1);
});

it('CBOR_ZLIB_URDNA2015 to/from', async () => {
  const b = new DidDocument(fixtures.didDocs.didKey0);
  const d: any = await b.toCBOR('CBOR_ZLIB_URDNA2015');
  expect(d.length).toBe(529);
  const d1 = await DidDocument.fromCBOR(d, 'CBOR_ZLIB_URDNA2015');
  // console.log(d1);
  expect(JSON.parse(d1.toJSON())).toEqual(fixtures.didDocs.didKey1);
});
