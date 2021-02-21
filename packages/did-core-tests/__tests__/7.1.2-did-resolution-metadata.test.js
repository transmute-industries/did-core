const { factory } = require('@did-core/data-model');
const jsonld = require('@did-core/did-ld-json');

const Ajv = require('ajv');

const ajv = new Ajv({ strict: false });

ajv.addSchema(require('../json-schemas/ascii.json'));

describe('DID Resolution Metadata', () => {
  describe('7.1.2', () => {
    describe(`The Media Type of the returned didDocumentStream. 
      This property is REQUIRED if resolution is successful and if 
      the resolveRepresentation function was called. 
      This property MUST NOT be present if the resolve function was called. 
      The value of this property MUST be an ASCII string that is 
      the Media Type of the conformant representations. 
      The caller of the resolveRepresentation function MUST use 
      this value when determining how to parse and process the 
      didDocumentStream returned by this function into the data model.`, () => {
      test('contentType is required when resolveRepresentation is called', async () => {
        const didResolutionMetadata = {
          contentType: 'application/did+ld+json',
        };
        expect(
          ajv.validate(
            {
              $ref: `ascii.json`,
            },
            didResolutionMetadata.contentType
          )
        ).toBe(true);
        // resolveRepresentation ~= resolve -> consume -> produce
        const didDocument = await factory
          .build()
          .addRepresentation({
            'application/did+ld+json': jsonld.representation,
          })
          .consume(
            // here we use the didResolutionMetadata as part of consumption
            didResolutionMetadata.contentType,
            JSON.stringify({
              '@context': ['https://www.w3.org/ns/did/v1'],
              id: 'did:example:123',
            })
          );
        const representation = await didDocument.produce(
          // here we use the didResolutionMetadata as part of producion
          didResolutionMetadata.contentType
        );
        expect(representation.toString('hex')).toBe(
          '7b2240636f6e74657874223a5b2268747470733a2f2f7777772e77332e6f72672f6e732f6469642f7631225d2c226964223a226469643a6578616d706c653a313233227d'
        );
      });
    });
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

      test('can report error representationNotSupported', () => {
        const didResolutionMetadata = {
          error: 'representationNotSupported',
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
