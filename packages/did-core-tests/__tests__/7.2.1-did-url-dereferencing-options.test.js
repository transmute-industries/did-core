const Ajv = require('ajv');

const ajv = new Ajv({ strict: false });

ajv.addSchema(require('../json-schemas/ascii.json'));
ajv.addSchema(require('../json-schemas/didUrl.json'));

describe('DID URL Dereferencing Options', () => {
  describe('7.2.1', () => {
    describe(`The possible properties within this structure and 
      their possible values SHOULD be registered in the 
      DID Specification Registries [DID-SPEC-REGISTRIES]. 
      This specification defines the following common properties 
      for dereferencing options:  
      - accept 
      The Media Type that the caller prefers for contentStream. 
      The Media Type MUST be expressed as an ASCII string. 
      The DID URL dereferencing implementation SHOULD use this value 
      to determine the contentType of the representation contained 
      in the returned value if such a representation is supported and available.`, () => {
      test('didUrlDereferencingOptions might have accept', () => {
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
        const dereference = (didUrl, options) => {
          return {
            contentStream: Buffer.from('...'),
            dereferencingMetadata: {
              contentType: 'image/png',
            },
          };
        };
        const { contentStream, dereferencingMetadata } = dereference(
          didUrl,
          didUrlDereferencingOptions
        );
        expect(Buffer.isBuffer(contentStream)).toBe(true);
        expect(dereferencingMetadata.contentType).toBe('image/png');
      });
    });
    describe(`The Media Type that the caller prefers for contentStream. 
    The Media Type MUST be expressed as an ASCII string. 
    The DID URL dereferencing implementation SHOULD use this value 
    to determine the contentType of the representation contained 
    in the returned value if such a representation is supported and available.`, () => {
      test('accept should be ussed to obtain contentStream', () => {
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
        const dereference = (didUrl, options) => {
          return {
            contentStream: Buffer.from('...'),
            dereferencingMetadata: {
              contentType: 'image/png',
            },
          };
        };
        const { contentStream, dereferencingMetadata } = dereference(
          didUrl,
          didUrlDereferencingOptions
        );
        expect(Buffer.isBuffer(contentStream)).toBe(true);
        expect(dereferencingMetadata.contentType).toBe('image/png');
      });
    });
  });
});
