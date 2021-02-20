const { factory } = require('@did-core/data-model');
const json = require('@did-core/did-json');
const jsonld = require('@did-core/did-ld-json');
const cbor = require('@did-core/did-cbor');

describe('Consumption', () => {
  describe('6.2.2', () => {
    describe(`If media type information is available to a conforming consumer 
      and the media type value is application/did+json, then the data structure 
      being consumed is a DID document, and the root element MUST be a JSON Object 
      where all members of the object are entries of the DID document. 
      A conforming consumer for a JSON representation that is consuming a 
      DID document with a root element that is not a JSON Object MUST report an error.`, () => {
      test('can consume JSON Object', async () => {
        const didDocument = await factory
          .build()
          .addRepresentation({ 'application/did+json': json.representation })
          .consume(
            'application/did+json',
            JSON.stringify({
              id: 'did:example:123',
            })
          );
        expect(didDocument.entries.id).toBe('did:example:123');
      });

      test('cannot consume non JSON Object', async () => {
        try {
          await factory
            .build()
            .addRepresentation({ 'application/did+json': json.representation })
            .consume(
              'application/did+json',
              JSON.stringify(['did:example:123'])
            );
        } catch (e) {
          expect(e.message).toBe('"id" is required and not present.');
        }
      });
    });
  });

  describe('6.3.2', () => {
    describe(`Conforming consumers that process a JSON-LD representation SHOULD
      drop all terms from a DID document that are not defined via the @context.`, () => {
      test('can consume JSON-LD', async () => {
        const didDocument = await factory
          .build()
          .addRepresentation({
            'application/did+ld+json': jsonld.representation,
          })
          .consume(
            'application/did+ld+json',
            JSON.stringify({
              '@context': 'https://www.w3.org/ns/did/v1',
              id: 'did:example:123',
            })
          );
        expect(didDocument.entries['@context']).toBe(
          'https://www.w3.org/ns/did/v1'
        );
        expect(didDocument.entries.id).toBe('did:example:123');
      });

      test('safer to throw than drop properties silently', async () => {
        try {
          await factory
            .build()
            .addRepresentation({
              'application/did+ld+json': jsonld.representation,
            })
            .consume(
              'application/did+ld+json',
              `{"@context": "https://www.w3.org/ns/did/v1","__proto__": { "isAdmin": true },"id": "did:example:123"}`
            );
        } catch (e) {
          expect(e.message).toBe('Unsafe json detected.');
        }
      });
    });
  });

  describe('6.4.2', () => {
    describe(`If media type information is available to a conforming consumer 
      and the media type value is application/did+json, then the data structure 
      being consumed is a DID document, and the root element MUST be a CBOR map
      (major type 5) where all members of the object are entries of the DID document. 
      A conforming consumer for a CBOR representation that is consuming a 
      DID document with a root element that is not a CBOR map (major type 5) 
      MUST report an error.`, () => {
      test('can consume CBOR', async () => {
        const didDocument = await factory.build().addRepresentation({
          'application/did+cbor': cbor.representation,
        });
        didDocument.assign({
          id: 'did:example:123',
        });

        didDocument.consume(
          'application/did+cbor',
          await didDocument.produce('application/did+cbor')
        );

        expect(didDocument.entries.id).toBe('did:example:123');
      });

      test('cannot consume non conforming CBOR', async () => {
        try {
          await factory
            .build()
            .addRepresentation({
              'application/did+cbor': cbor.representation,
            })
            .consume('application/did+cbor', Buffer.from(''));
        } catch (e) {
          expect(e.message).toBe('Insufficient data');
        }
      });
    });
  });
});
