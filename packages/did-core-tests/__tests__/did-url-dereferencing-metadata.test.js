const Ajv = require('ajv');

const ajv = new Ajv({ strict: false });

ajv.addSchema(require('../json-schemas/ascii.json'));
ajv.addSchema(require('../json-schemas/didUrl.json'));

describe('DID URL Dereferencing Metadata', () => {
  describe('7.2.2', () => {
    describe(`The Media Type of the returned contentStream SHOULD 
      be expressed using this property if dereferencing is successful. 
      The Media Type value MUST be expressed as an ASCII string.`, () => {
      test('contentStream should have a media type', () => {
        const relativeRef = '/direcory/file.png';
        const didUrl = `did:example:123?service=images&relativeRef=${encodeURIComponent(
          relativeRef
        )}`;
        const didUrlDereferencingOptions = {
          accept: 'image/png',
        };
        expect(
          ajv.validate(
            {
              $ref: `ascii.json`,
            },
            didUrlDereferencingOptions.accept
          )
        ).toBe(true);
        // eslint-disable-next-line
        const dereference = (didUrl, options) => Buffer.from('...');
        const contentStream = dereference(didUrl, didUrlDereferencingOptions);
        expect(Buffer.isBuffer(contentStream)).toBe(true);
      });
    });
    describe(`The error code from the dereferencing process. 
      This property is REQUIRED when there is an error in the dereferencing process. 
      The value of this property MUST be a single keyword expressed as an ASCII string. 
      The possible property values of this field SHOULD be registered in the 
      DID Specification Registries [DID-SPEC-REGISTRIES]. 
      This specification defines the following common error values: 
      - invalidDidUrl 
      The DID URL supplied to the DID URL dereferencing function does not conform to valid syntax. 
      (See §3.2 DID URL Syntax.)  
      - notFound 
      The DID URL dereferencer was unable to find the contentStream resulting 
      from this dereferencing request.`, () => {
      test('dereferencingMetadata might have error invalidDidUrl', () => {
        const dereferencingMetadata = {
          error: 'invalidDidUrl',
        };
        expect(
          ajv.validate(
            {
              $ref: `ascii.json`,
            },
            dereferencingMetadata.error
          )
        ).toBe(true);
      });
      test('dereferencingMetadata might have error notFound', () => {
        const dereferencingMetadata = {
          error: 'notFound',
        };
        expect(
          ajv.validate(
            {
              $ref: `ascii.json`,
            },
            dereferencingMetadata.error
          )
        ).toBe(true);
      });
    });
  });
});
