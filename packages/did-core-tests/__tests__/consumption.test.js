const { factory } = require('@did-core/data-model');
const json = require('@did-core/did-json');
const jsonld = require('@did-core/did-ld-json');
const cbor = require('@did-core/did-cbor');

describe('Consumption', () => {
  describe('6.2.2', () => {
    describe(`The DID document and any DID document data structures expressed by 
      a JSON representation MUST be deserialized into the data model according to 
      the following consumption rules: ... (valid json)`, () => {
      test('can consume JSON Object', async () => {
        const didDocument = await factory
          .build()
          .addRepresentation({ 'application/did+json': json.representation })
          .consume(
            'application/did+json',
            JSON.stringify({
              id: 'did:example:123',
              string: 'string',
              boolean: true,
              number: 42,
              null: null,
              map: {
                foo: 'bar',
              },
            })
          );
        expect(didDocument.entries.id).toBe('did:example:123');
        expect(typeof didDocument.entries.string).toBe('string');
        expect(typeof didDocument.entries.boolean).toBe('boolean');
        expect(typeof didDocument.entries.number).toBe('number');
        expect(typeof didDocument.entries.null).toBe('object');
        expect(didDocument.entries.null).toBe(null);
        expect(typeof didDocument.entries.map).toBe('object');
        expect(didDocument.entries.map).toEqual({
          foo: 'bar',
        });
      });
    });
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
    describe(`The DID document and any DID document data structures expressed 
      by a JSON-LD representation MUST be deserialized into the data model according 
      to the JSON representation consumption rules as defined in §6.2 JSON.`, () => {
      test('can consume JSON-LD via JSON', async () => {
        const didDocument = await factory
          .build()
          .addRepresentation({
            'application/did+ld+json': jsonld.representation,
          })
          .consume(
            'application/did+ld+json',
            // OMG, is JSON-LD really JSON???? why does this work?
            // (insider joke)
            JSON.stringify({
              '@context': [
                'https://www.w3.org/ns/did/v1',
                {
                  string: 'https://example.com/infra/string',
                  boolean: 'https://example.com/infra/boolean',
                  number: 'https://example.com/infra/number',
                  null: 'https://example.com/infra/null',
                  map: {
                    '@id': 'https://example.com/infra/map',
                    '@type': '@json',
                  },
                },
              ],
              id: 'did:example:123',
              string: 'string',
              boolean: true,
              number: 42,
              null: null,
              map: {
                foo: 'bar',
              },
            })
          );
        expect(didDocument.entries.id).toBe('did:example:123');
        expect(typeof didDocument.entries.string).toBe('string');
        expect(typeof didDocument.entries.boolean).toBe('boolean');
        expect(typeof didDocument.entries.number).toBe('number');
        expect(typeof didDocument.entries.null).toBe('object');
        expect(didDocument.entries.null).toBe(null);
        expect(typeof didDocument.entries.map).toBe('object');
        expect(didDocument.entries.map).toEqual({
          foo: 'bar',
        });
      });
    });
    describe(`In addition to using the JSON representation consumption rules, 
      JSON-LD consumption MUST add the representation-specific entries into the 
      data model according to the JSON representation consumption rules.`, () => {
      test('@context is a valid representation specific property that can be represented in JSON.', async () => {
        const didDocument = await factory
          .build()
          .addRepresentation({
            'application/did+ld+json': jsonld.representation,
          })
          .consume(
            'application/did+ld+json',
            // OMG, is JSON-LD really JSON???? why does this work?
            // (insider joke)
            JSON.stringify({
              '@context': ['https://www.w3.org/ns/did/v1'],
              id: 'did:example:123',
            })
          );
        expect(didDocument.entries['@context']).toEqual([
          'https://www.w3.org/ns/did/v1',
        ]);
        expect(didDocument.entries.id).toBe('did:example:123');
      });
    });
    describe(`Conforming consumers that process a JSON-LD representation SHOULD
      drop all terms from a DID document that are not defined via the @context.`, () => {
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
    describe(`All data structures expressed by a CBOR representation 
      MUST be deserialized into the data model according to the 
      following consumption rules: ...(valid cbor)`, () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('CBOR indefinite-length items are not allowed and MUST produce an error.', () => {
      test.todo('should throw an error when consuming indefinite-length items');
    });
    describe('A duplicate key in the same CBOR map MUST produce an error.', () => {
      test.todo(
        'should throw an error when consuming cbor with duplicate keys'
      );
    });
    describe('All CBOR tags MUST be retained for CBOR production regardless of whether they are optional.', () => {
      test.todo('positive');
      test.todo('negative');
    });
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
