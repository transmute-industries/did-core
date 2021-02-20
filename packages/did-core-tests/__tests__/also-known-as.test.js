const { factory } = require('@did-core/data-model');
const { representation } = require('@did-core/did-ld-json');
const Ajv = require('ajv');

const ajv = new Ajv({ strict: false });
ajv.addSchema(require('../json-schemas/alsoKnownAs.json'));

describe('Also Known As', () => {
  describe('5.1.3', () => {
    describe(`
    The alsoKnownAs property is OPTIONAL. 
    If present, the value MUST be an ordered set where 
    each item in the set is a URI conforming to [RFC3986].`, () => {
      test('can produce a did document without alsoKnownAs', async () => {
        const didDocument = factory.build({
          entries: {
            '@context': 'https://www.w3.org/ns/did/v1',
            id: 'did:example:123',
          },
        });
        const didDocumentStream = await didDocument
          .addRepresentation({ 'application/did+ld+json': representation })
          .produce('application/did+ld+json');
        expect(didDocumentStream).toBeDefined();
      });

      test('can produce a did document with alsoKnownAs', async () => {
        const didDocument = factory.build({
          entries: {
            '@context': 'https://www.w3.org/ns/did/v1',
            id: 'did:example:123',
            alsoKnownAs: ['https://example.com/user/123'],
          },
        });
        const didDocumentStream = await didDocument
          .addRepresentation({ 'application/did+ld+json': representation })
          .produce('application/did+ld+json');
        expect(didDocumentStream).toBeDefined();
        const parsedDidDocumentStream = JSON.parse(
          didDocumentStream.toString()
        );
        const isValid = ajv.validate(
          {
            // validate conformance to RFC3986
            $ref: 'alsoKnownAs.json',
          },
          parsedDidDocumentStream.alsoKnownAs
        );
        expect(isValid).toBe(true);
      });

      // negative test for RFC3986
      test('should validate according to RFC3986 ', async () => {
        const isValid = ajv.validate(
          {
            $ref: 'alsoKnownAs.json',
          },
          ['012312']
        );
        expect(isValid).toBe(false);
      });
    });
  });
});
