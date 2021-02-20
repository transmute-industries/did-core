const Ajv = require('ajv');

const ajv = new Ajv({ strict: false });

ajv.addSchema(require('../json-schemas/did.json'));

describe('DID Syntax', () => {
  describe('3.1', () => {
    describe(`The generic DID scheme is a URI scheme conformant with [RFC3986]. 
    The ABNF definition can be found below, which uses the syntax in [RFC5234] 
    and the corresponding definitions for ALPHA and DIGIT. 
    All other rule names not defined in the ABNF below are defined in [RFC3986]. 
    All DIDs MUST conform to the DID Syntax ABNF Rules.`, () => {
      test('valid did test cases', () => {
        const base58Alphabet =
          '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
        const base64urlAlphabet =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

        const validExamples = [
          'did:example:123',
          `did:example:${base64urlAlphabet}`,
          `did:example:${base58Alphabet}`,
        ];
        expect(
          Array.from(
            new Set(
              validExamples.map((sample) =>
                ajv.validate(
                  {
                    $ref: `did.json`,
                  },
                  sample
                )
              )
            )
          )
        ).toEqual([true]);
      });
    });
  });
});
