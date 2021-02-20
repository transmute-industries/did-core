const Ajv = require('ajv');

const ajv = new Ajv({ strict: false });

ajv.addSchema(require('../json-schemas/ascii.json'));

describe('DID Resolution Options', () => {
  describe('7.1.1', () => {
    describe(`The Media Type of the caller's preferred representation of the DID document. 
      The Media Type MUST be expressed as an  ASCII string. The DID resolver implementation 
      SHOULD use this value to determine the representation contained in the returned 
      didDocumentStream if such a representation is supported and available. 
      This property is OPTIONAL for the resolveResolution function and MUST NOT 
      be used with the resolve function.`, () => {
      test('can accept application/did+json', () => {
        const didResolutionOptions = {
          accept: 'application/did+json',
        };
        expect(
          ajv.validate(
            {
              $ref: `ascii.json`,
            },
            didResolutionOptions.accept
          )
        ).toBe(true);
      });

      test('can not accept non ascii', () => {
        const didResolutionOptions = {
          accept: '💎👐',
        };
        expect(
          ajv.validate(
            {
              $ref: `ascii.json`,
            },
            didResolutionOptions.accept
          )
        ).toBe(false);
      });
    });
  });
});
