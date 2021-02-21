const Ajv = require('ajv');

const ajv = new Ajv({ strict: false });

ajv.addSchema(require('../json-schemas/ascii.json'));
ajv.addSchema(require('../json-schemas/didUrl.json'));

describe('DID Parameters', () => {
  describe('3.2.1', () => {
    describe(`Identifies a service from the DID document by service ID. 
      If present, the associated value MUST be an ASCII string.`, () => {
      test('service must be an ascii string', () => {
        const sample = 'did:example:123?service=website';
        const sampleValue = sample.split('?service=').pop();
        expect(
          ajv.validate(
            {
              $ref: `ascii.json`,
            },
            sampleValue
          )
        ).toBe(true);
      });
    });
    describe(`A relative URI reference according to RFC3986 Section 4.2 
      that identifies a resource at a service endpoint, which is selected 
      from a DID document by using the service parameter. If present, 
      the associated value MUST be an ASCII string and MUST use 
      percent-encoding for certain characters as specified in RFC3986 Section 2.1.`, () => {
      test('relativeRef must be an ascii string', () => {
        const relativeRef = '/direcory/file.png';
        const sample = `did:example:123?service=website&relativeRef=${encodeURIComponent(
          relativeRef
        )}`;
        expect(sample).toBe(
          'did:example:123?service=website&relativeRef=%2Fdirecory%2Ffile.png'
        );
        const sampleValue = sample.split('?service=website&relativeRef=').pop();
        const decodedValue = decodeURIComponent(sampleValue);
        expect(decodedValue).toBe(relativeRef);
        expect(
          ajv.validate(
            {
              $ref: `ascii.json`,
            },
            decodedValue
          )
        ).toBe(true);
      });
    });
    describe(`Identifies a specific version of a DID document to be 
      resolved (the version ID could be sequential, or a UUID, or method-specific). 
      If present, the associated value MUST be an ASCII string.`, () => {
      test('versionId must be an ascii string', () => {
        const sample = 'did:example:123?versionId=bafy..';
        const sampleValue = sample.split('?versionId=').pop();
        expect(
          ajv.validate(
            {
              $ref: `ascii.json`,
            },
            sampleValue
          )
        ).toBe(true);
      });
    });
    describe(`Identifies a certain version timestamp of a DID document to be 
      resolved. That is, the DID document that was valid for a DID at a 
      certain time. If present, the associated value MUST be an ASCII 
      string which is a valid XML datetime value, as defined in section 
      3.3.7 of W3C XML Schema Definition Language (XSD) 1.1 Part 2: 
      Datatypes [XMLSCHEMA11-2]. This datetime value MUST be 
      normalized to UTC 00:00:00 and without sub-second decimal precision. 
      For example: 2020-12-20T19:17:47Z.`, () => {
      test('versionTime must be an ascii string', () => {
        const sample = 'did:example:123?versionTime=2020-12-20T19:17:47Z';
        const sampleValue = sample.split('?versionTime=').pop();
        const date = new Date(sampleValue);
        expect(date.toISOString()).toBe('2020-12-20T19:17:47.000Z');
        expect(
          ajv.validate(
            {
              $ref: `ascii.json`,
            },
            sampleValue
          )
        ).toBe(true);
      });
    });
    describe(`A resource hash of the DID document to add integrity protection, 
      as specified in [HASHLINK]. This parameter is non-normative. 
      If present, the associated value MUST be an ASCII string.`, () => {
      test('hl must be an ascii string', () => {
        const sample =
          'did:example:123?hl=hl:zQmZYUEoPBfMoF49szD91QPCHvxVhZdk7dW9bKkjGVmMxov';
        const sampleValue = sample.split('?hl=').pop();
        expect(
          ajv.validate(
            {
              $ref: `ascii.json`,
            },
            sampleValue
          )
        ).toBe(true);
      });
    });
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
