const Ajv = require('ajv');

const ajv = new Ajv({ strict: false });

ajv.addSchema(require('../json-schemas/didUrl.json'));

describe('DID Parameters', () => {
  describe('3.2.1', () => {
    describe(`Implementers as well as DID method specification authors 
      might use additional DID parameters that are not listed here. 
      For maximum interoperability, it is RECOMMENDED that DID parameters 
      use the DID Specification Registries mechanism [DID-SPEC-REGISTRIES], 
      to avoid collision with other uses of the same DID 
      parameter with different semantics.`, () => {
      test('can use registered did parameters', () => {
        const samplesOfRegisteredParameters = [
          'did:example:123?versionId=0',
          'did:example:123signed-ietf-json-patch=eyJraWQiOiJkaWQ6ZXhhb...',
          'did:example:123?service=website',
        ];
        const registeredSamplesAreValidDidUrls = samplesOfRegisteredParameters.map(
          (sample) =>
            ajv.validate(
              {
                $ref: `didUrl.json`,
              },
              sample
            )
        );
        expect(registeredSamplesAreValidDidUrls).toEqual([true, true, true]);
      });
    });
  });
});
