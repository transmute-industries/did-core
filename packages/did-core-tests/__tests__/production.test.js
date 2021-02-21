const { factory } = require('@did-core/data-model');
const json = require('@did-core/did-json');
const jsonld = require('@did-core/did-ld-json');
const cbor = require('@did-core/did-cbor');

describe('Production', () => {
  describe('6.2.1', () => {
    describe(`The DID document and any DID document data structures expressed 
      by the data model MUST be serialized to the JSON representation according 
      to the following production rules: ...(valid-json) `, () => {
      test('can produce json', async () => {
        let didDocument = await factory
          .build({
            entries: {
              id: 'did:example:123',
              string: 'string',
              boolean: true,
              number: 42,
              null: null,
              map: {
                foo: 'bar',
              },
            },
          })
          .addRepresentation({ 'application/did+json': json.representation })
          .produce('application/did+json');
        didDocument = JSON.parse(didDocument.toString());
        expect(didDocument.id).toBe('did:example:123');
        expect(typeof didDocument.string).toBe('string');
        expect(typeof didDocument.boolean).toBe('boolean');
        expect(typeof didDocument.number).toBe('number');
        expect(typeof didDocument.null).toBe('object');
        expect(didDocument.null).toBe(null);
        expect(typeof didDocument.map).toBe('object');
        expect(didDocument.map).toEqual({
          foo: 'bar',
        });
      });
    });
    describe(`All entries of a DID document MUST be included in the root JSON Object. 
      Entries MAY contain additional data substructures subject to the value 
      representation rules in the list above. When serializing a DID document, 
      a conforming producer MUST specify a media type of application/did+json 
      to downstream applications such as described in §7.1.2 DID Resolution Metadata.`, () => {
      test('can produce json', async () => {
        let didDocument = await factory
          .build({
            entries: {
              id: 'did:example:123',
              string: 'string',
              boolean: true,
              number: 42,
              null: null,
              map: {
                foo: 'bar',
              },
            },
          })
          .addRepresentation({ 'application/did+json': json.representation })
          .produce('application/did+json');
        didDocument = JSON.parse(didDocument.toString());
        expect(didDocument.id).toBe('did:example:123');
        expect(typeof didDocument.string).toBe('string');
        expect(typeof didDocument.boolean).toBe('boolean');
        expect(typeof didDocument.number).toBe('number');
        expect(typeof didDocument.null).toBe('object');
        expect(didDocument.null).toBe(null);
        expect(typeof didDocument.map).toBe('object');
        expect(didDocument.map).toEqual({
          foo: 'bar',
        });
      });
    });
  });

  describe('6.3.1', () => {
    describe(`The DID document and any DID document data structures expressed 
      by the data model MUST be serialized to the JSON-LD representation according 
      to the JSON representation production rules as defined in §6.2 JSON.`, () => {
      test('can produce json ld', async () => {
        let didDocument = await factory
          .build({
            entries: {
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
            },
          })
          .addRepresentation({
            'application/did+ld+json': jsonld.representation,
          })
          .produce('application/did+ld+json');
        didDocument = JSON.parse(didDocument.toString());
        expect(didDocument['@context']).toEqual([
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
        ]);
        expect(didDocument.id).toBe('did:example:123');
        expect(typeof didDocument.string).toBe('string');
        expect(typeof didDocument.boolean).toBe('boolean');
        expect(typeof didDocument.number).toBe('number');
        expect(typeof didDocument.null).toBe('object');
        expect(didDocument.null).toBe(null);
        expect(typeof didDocument.map).toBe('object');
        expect(didDocument.map).toEqual({
          foo: 'bar',
        });
      });
    });
    describe(`In addition to using the JSON representation production rules, 
      JSON-LD production MUST include the representation-specific @context entry. 
      The serialized value of @context MUST be the JSON String https://www.w3.org/ns/did/v1, 
      or a JSON Array where the first item is the JSON String https://www.w3.org/ns/did/v1 
      and the subsequent items are serialized according to the JSON representation production rules.`, () => {
      test('@context as url', async () => {
        const didDocument = await factory
          .build({
            entries: {
              '@context': 'https://www.w3.org/ns/did/v1',
              id: 'did:example:123',
            },
          })
          .addRepresentation({
            'application/did+ld+json': jsonld.representation,
          })
          .produce('application/did+ld+json');
        expect(JSON.parse(didDocument.toString())['@context']).toBe(
          'https://www.w3.org/ns/did/v1'
        );
      });

      test('@context as array', async () => {
        const didDocument = await factory
          .build({
            entries: {
              '@context': ['https://www.w3.org/ns/did/v1'],
              id: 'did:example:123',
            },
          })
          .addRepresentation({
            'application/did+ld+json': jsonld.representation,
          })
          .produce('application/did+ld+json');
        expect(JSON.parse(didDocument.toString())['@context']).toEqual([
          'https://www.w3.org/ns/did/v1',
        ]);
      });

      test('@context as array with last element object', async () => {
        const didDocument = await factory
          .build()
          .assign({
            '@context': [
              'https://www.w3.org/ns/did/v1',
              {
                '💎': 'https://example.com/infra/string',
              },
            ],
            id: 'did:example:123',
            '💎': 'foo',
          })
          .addRepresentation({
            'application/did+ld+json': jsonld.representation,
          })
          .produce('application/did+ld+json');
        expect(JSON.parse(didDocument.toString())['@context']).toEqual([
          'https://www.w3.org/ns/did/v1',
          {
            '💎': 'https://example.com/infra/string',
          },
        ]);
      });
    });
    describe(`In order to achieve interoperability across different representations, 
      all JSON-LD Contexts and their terms SHOULD be registered in the 
      DID Specification Registries [DID-SPEC-REGISTRIES].`, () => {
      test.todo('untestable');
    });
    describe(`A conforming producer that generates a JSON-LD representation 
      SHOULD NOT produce a DID document that contains terms not defined via 
      the @context as conforming consumers are expected to remove unknown terms. 
      When serializing a JSON-LD representation of a DID document, a conforming producer 
      MUST specify a media type of application/did+ld+json to downstream 
      applications such as described in §7.1.2 DID Resolution Metadata.`, () => {
      test('safer to throw than produce json ld with undefined terms', async () => {
        try {
          await factory
            .build()
            .assign({
              '@context': ['https://www.w3.org/ns/did/v1'],
              id: 'did:example:123',
              '💎': 'foo',
            })
            .addRepresentation({
              'application/did+ld+json': jsonld.representation,
            })
            .produce('application/did+ld+json');
        } catch (e) {
          expect(e.message).toBe('"@context" does not define: 💎');
        }
      });
    });
  });

  describe('6.4.1', () => {
    describe(`All DID document data structures expressed by the data model 
      MUST be serialized to the CBOR representation according to 
      the following production rules:  ...(valid-cbor)  `, () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe(`A CBOR floating-point number (major type 7). 
      All floating point values MUST be encoded as 64-bits 
      (additional type value 27), even for integral values.`, () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe(`Indefinite-length items are not allowed and MUST be made a CBOR definite length.`, () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe(`All CBOR tags MUST be retained regardless of whether they are optional.`, () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe(`All four Canonical CBOR rules listed in [RFC8949] MUST be applied to all relevant data types.`, () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe(`All entries of a DID document MUST be included in the root CBOR map (major type 5). 
      Entries MAY contain additional data substructures subject to the value 
      representation rules in the list above. When serializing a DID document 
      to its CBOR representation, a conforming producer MUST specify a media 
      type of application/did+cbor to downstream applications such as described 
      in §7.1.2 DID Resolution Metadata.`, () => {
      test.todo('positive');
      test.todo('negative');
    });
  });
});
