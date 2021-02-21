const Ajv = require('ajv');

const ajv = new Ajv({ strict: false });

ajv.addSchema(require('../json-schemas/ascii.json'));
ajv.addSchema(require('../json-schemas/didUrl.json'));

describe('DID URL Dereferencing', () => {
  describe('7.2', () => {
    describe(`A conformant DID URL as a single string. 
      This is the DID URL to dereference. 
      To dereference a DID fragment, the complete DID URL 
      including the DID fragment MUST be used. This input is REQUIRED.`, () => {
      test('dereference takes a did url as input', () => {
        const relativeRef = '/direcory/file.png';
        const didUrl = `did:example:123?service=images&relativeRef=${encodeURIComponent(
          relativeRef
        )}`;
        expect(
          ajv.validate(
            {
              $ref: `didUrl.json`,
            },
            didUrl
          )
        ).toBe(true);
      });
    });
    describe(`A metadata structure consisting of input options 
      to the dereference function in addition to the didUrl itself. 
      Properties defined by this specification are in 
      §7.2.1 DID URL Dereferencing Options. 
      This input is REQUIRED, but the structure MAY be empty.`, () => {
      test('dereference takes dereferencingOptions', () => {
        const relativeRef = '/direcory/file.png';
        const didUrl = `did:example:123?service=images&relativeRef=${encodeURIComponent(
          relativeRef
        )}`;
        const dereferencingOptions = { didUrl };
        expect(
          ajv.validate(
            {
              $ref: `didUrl.json`,
            },
            dereferencingOptions.didUrl
          )
        ).toBe(true);
      });
    });
    describe(`A metadata structure consisting of values relating to 
      the results of the DID URL dereferencing process. 
      This structure is REQUIRED and in the case of an error in the dereferencing process, 
      this MUST NOT be empty. Properties defined by this specification are 
      in §7.2.2 DID URL Dereferencing Metadata. If the dereferencing is not successful, 
      this structure MUST contain an error property describing the error.`, () => {
      test('on success dereference produces dereferenceMetadata with content type', () => {
        const dereferenceMetadata = { contentType: 'image/png' };
        expect(dereferenceMetadata.contentType).toBeDefined();
      });
      test('on failure dereference produces dereferenceMetadata with error', () => {
        const dereferenceMetadata = { error: 'notFound' };
        expect(dereferenceMetadata.error).toBeDefined();
      });
    });
    describe(`If the dereferencing function was called and successful, 
      this MUST contain a resource corresponding to the DID URL. 
      The contentStream MAY be a resource such as a DID Document 
      that is serializable in one of the conformant representations,  
      a Verification Method,  a service, or any other resource format 
      that can be identified via a Media Type and obtained 
      through the resolution process. 
      If the dereferencing is unsuccessful, this value MUST be empty.`, () => {
      test('on success dereference produces contentStream and dereferenceMetadata with contentType', () => {
        const response = {
          dereferenceMetadata: {
            contentType: 'image/png',
            contentStream: Buffer.from('...'),
          },
        };
        expect(response.dereferenceMetadata.contentType).toBeDefined();
      });

      test('on failure dereference produces dereferenceMetadata that contains an error', () => {
        const response = {
          dereferenceMetadata: {
            error: 'invalidDidUrl',
          },
        };
        expect(response.dereferenceMetadata.error).toBeDefined();
      });
    });
    describe(`If the dereferencing is successful, this MUST be a metadata structure, 
      but the structure MAY be empty. This structure contains metadata about the contentStream. 
      If the contentStream is a DID document, this MUST be a didDocumentMetadata 
      structure as described in DID Resolution. If the dereferencing is unsuccessful, 
      this output MUST be an empty metadata structure.`, () => {
      test('on success dereference produces dereferenceMetadata but it may be empty', () => {
        const response = {
          dereferenceMetadata: {},
        };
        expect(response.dereferenceMetadata).toBeDefined();
      });
      test.todo(
        'if contentStream is a DID Document dereferenceMetadata is didDocumentMetadata'
      );
    });
  });
});
