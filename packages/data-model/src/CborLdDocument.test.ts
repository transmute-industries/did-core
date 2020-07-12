import * as fixtures from './__fixtures__';
import { CborLdDocument } from './CborLdDocument';

class Bar extends CborLdDocument {
  public id: string;
  constructor(options: any) {
    super(options);
    this.id = options.id;
  }
  static async fromCBOR(data: Buffer, type: string = 'CBOR') {
    const { document } = await CborLdDocument.fromCBOR(data, type);
    return new Bar(document);
  }
}

it('static', async () => {
  const encoded: any = await Bar.encodeCompressedAsync(
    fixtures.didDocs.didKey0
  );
  const decoded: any = await Bar.decodeCompressedAsync(encoded);
  expect(decoded.document.id).toBe(fixtures.didDocs.didKey0.id);
});

describe('toCBOR/fromCBOR', () => {
  it('CBOR', async () => {
    const b = new Bar(fixtures.didDocs.didKey0);
    const d: any = await b.toCBOR();
    expect(d.length).toBe(1177);
    const d1 = await Bar.fromCBOR(d);
    expect(b.id).toEqual(d1.id);
    // TODO compare to fixtures... maybe in another class.
  });
  it('DAG_CBOR', async () => {
    const b = new Bar(fixtures.didDocs.didKey0);
    const d: any = await b.toCBOR('DAG_CBOR');
    expect(d.length).toBe(1177);
    const d1 = await Bar.fromCBOR(d, 'DAG_CBOR');
    expect(b.id).toEqual(d1.id);
  });
  it('CBOR_ZLIB_URDNA2015', async () => {
    const b = new Bar(fixtures.didDocs.didKey0);
    const d: any = await b.toCBOR('CBOR_ZLIB_URDNA2015');
    expect(d.length).toBe(441);
    const d1 = await Bar.fromCBOR(d, 'CBOR_ZLIB_URDNA2015');
    expect(b.id).toEqual(d1.id);
  });
});
