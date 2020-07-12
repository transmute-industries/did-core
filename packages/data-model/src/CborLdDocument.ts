import { tags } from './cbor';
const jsonld = require('jsonld');
const pako = require('pako');
const cbor = require('cbor');
const dagCBOR = require('ipld-dag-cbor');

export class CborLdDocument {
  public document: any;
  constructor(document: any) {
    this.document = document;
  }
  static encodeCompressedAsync = async (data: any): Promise<Buffer> => {
    const nquads = await jsonld.canonize(data, {
      algorithm: 'URDNA2015',
      format: 'application/n-quads',
    });

    const compressed = pako.deflate(nquads);
    const enc = new cbor.Encoder();
    enc.addSemanticType(CborLdDocument, async (encoder: any, _b: any) => {
      const tagged = new cbor.Tagged(tags.zlib_compressed_nquads, [
        data['@context'],
        compressed,
      ]);
      encoder.pushAny(tagged);
    });
    const _encodeCompressedAsync = (data: any): Promise<Buffer> => {
      let buf = Buffer.from('');
      return new Promise(resolve => {
        enc.on('data', (_buf: any) => {
          buf = Buffer.concat([buf, _buf]);
        });
        enc.on('error', console.error);
        enc.on('finish', () => {
          resolve(buf);
        });
        enc.end(data);
      });
    };
    return _encodeCompressedAsync(new CborLdDocument(data));
  };

  static decodeCompressedAsync = async (
    data: Buffer
  ): Promise<{ document: any }> => {
    const dec = new cbor.Decoder({
      tags: {
        [tags.zlib_compressed_nquads]: async (val: any) => {
          const [context, compressed] = val;
          const decompressed = pako.inflate(compressed);
          const nquads = Buffer.from(decompressed).toString();

          const doc = await jsonld.fromRDF(nquads, {
            format: 'application/n-quads',
          });

          let id = doc[0]['@id'];

          const framed = await jsonld.frame(doc, {
            '@context': context,
            '@embed': '@last',
            id: id,
          });

          const options = { ...framed, '@context': context };
          const foo = new CborLdDocument(options);
          return foo;
        },
      },
    });
    const _decodeCompressedAsync = async (
      _data: Buffer
    ): Promise<{ document: any }> => {
      return new Promise(resolve => {
        dec.on('data', (obj: any) => {
          resolve(obj);
        });
        dec.end(_data);
      });
    };
    return _decodeCompressedAsync(data);
  };

  static toCBOR(data: any, type: string = 'CBOR') {
    if (type === 'CBOR_ZLIB_URDNA2015') {
      return CborLdDocument.encodeCompressedAsync(data);
    }

    if (type === 'DAG_CBOR') {
      return dagCBOR.util.serialize(data);
    }

    return cbor.encode(data);
  }

  static async fromCBOR(
    data: Buffer,
    type: string = 'CBOR'
  ): Promise<{ document: any }> {
    if (type === 'CBOR_ZLIB_URDNA2015') {
      const { document } = await CborLdDocument.decodeCompressedAsync(data);
      return document;
    }

    if (type === 'DAG_CBOR') {
      return Promise.resolve(dagCBOR.util.deserialize(data));
    }

    return Promise.resolve(cbor.decode(data));
  }
}
