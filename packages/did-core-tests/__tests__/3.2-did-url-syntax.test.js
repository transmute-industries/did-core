const Ajv = require('ajv');

const ajv = new Ajv({ strict: false });

ajv.addSchema(require('../json-schemas/didUrl.json'));

describe('DID URL Syntax', () => {
  describe('3.2', () => {
    describe(`The following is the ABNF definition using the syntax in [RFC5234]. 
      It builds on the did scheme defined in §3.1 DID Syntax. 
      The path-abempty, query, and fragment components are defined in [RFC3986]. 
      All DID URLs MUST conform to the DID URL Syntax ABNF Rules. 
      DID methods can further restrict these rules, as described in §8.1 Method Syntax.`, () => {
      test('should accept valid did url', () => {
        const validExamples = [
          'did:example:123',
          'did:example:123/pathname',
          'did:example:123?query',
          'did:example:123#fragment',
          'did:example:123/pathname?query',
          'did:example:123/pathname?query#fragment',
          'did:example:123?query#fragment',
          'did:example:123/pathname#fragment',
        ];
        expect(
          Array.from(
            new Set(
              validExamples.map((sample) =>
                ajv.validate(
                  {
                    $ref: `didUrl.json`,
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
