const { factory } = require('@did-core/data-model');
const jsonld = require('@did-core/did-ld-json');
const Ajv = require('ajv');

const ajv = new Ajv({ strict: false });

ajv.addSchema(require('../json-schemas/did.json'));

describe('DID Subject', () => {
  describe('5.1.1', () => {
    describe(`The value of id MUST be a string that conforms to 
      the rules in §3.1 DID Syntax and MUST exist in the root map 
      of the data model for the DID document.`, () => {
      test('', async () => {
        const didDocument = await factory
          .build({
            entries: {
              '@context': ['https://www.w3.org/ns/did/v1'],
              id: 'did:example:123',
            },
          })
          .addRepresentation({
            'application/did+ld+json': jsonld.representation,
          });

        expect(
          ajv.validate(
            {
              $ref: `did.json`,
            },
            didDocument.entries.id
          )
        ).toBe(true);
      });
    });
  });
});
