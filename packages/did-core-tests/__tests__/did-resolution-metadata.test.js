const Ajv = require('ajv');

const ajv = new Ajv({ strict: false });

ajv.addSchema(require('../json-schemas/ascii.json'));

describe('DID Resolution Metadata', () => {
  describe('7.1.2', () => {
    describe(`The error code from the resolution process. 
      This property is REQUIRED when there is an error in the resolution process. 
      The value of this property MUST be a single keyword ASCII string. 
      The possible property values of this field SHOULD be registered in 
      the DID Specification Registries [DID-SPEC-REGISTRIES]. 
      This specification defines the following common error values: 
      - invalidDid 
      The DID supplied to the DID resolution function does not conform to valid syntax. 
      (See §3.1 DID Syntax.)  
      - notFound 
      The DID resolver was unable to find the DID document resulting from this resolution request.  
      - representationNotSupported  
      This error code is returned if the representation requested via the accept 
      input metadata property is not supported by the DID method and/or DID resolver implementation. 
      - deactivated   
      The DID supplied to the DID resolution function has been deactivated as described in 
      §8.2 Method Operations.`, () => {
      test('can report error invalidDid', () => {
        const didResolutionMetadata = {
          error: 'invalidDid',
        };
        expect(
          ajv.validate(
            {
              $ref: `ascii.json`,
            },
            didResolutionMetadata.error
          )
        ).toBe(true);
      });

      test('can report error notFound', () => {
        const didResolutionMetadata = {
          error: 'notFound',
        };
        expect(
          ajv.validate(
            {
              $ref: `ascii.json`,
            },
            didResolutionMetadata.error
          )
        ).toBe(true);
      });

      test('can report error deactivated', () => {
        const didResolutionMetadata = {
          error: 'deactivated',
        };
        expect(
          ajv.validate(
            {
              $ref: `ascii.json`,
            },
            didResolutionMetadata.error
          )
        ).toBe(true);
      });
    });
  });
});
