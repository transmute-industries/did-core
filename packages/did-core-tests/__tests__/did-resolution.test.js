const { factory } = require('@did-core/data-model');
const jsonld = require('@did-core/did-ld-json');
const Ajv = require('ajv');

const ajv = new Ajv({ strict: false });

ajv.addSchema(require('../json-schemas/did.json'));

describe('DID Resolution', () => {
  describe('7.1', () => {
    describe(`This is the DID to resolve. 
      This input is REQUIRED and the value MUST be a 
      conformant DID as defined in §3.1 DID Syntax.`, () => {
      test('resolve requires a did as input', () => {
        const did = 'did:example:123';
        expect(
          ajv.validate(
            {
              $ref: `did.json`,
            },
            did
          )
        ).toBe(true);
      });
    });
    describe(`A metadata structure containing properties 
      defined in §7.1.1 DID Resolution Options. 
      This input is REQUIRED, but the structure MAY be empty.`, () => {
      test('resolution options might be empty', () => {
        // eslint-disable-next-line no-unused-vars
        const resolve = (did, resolutionOptions = {}) => ({
          resolutionOptions: {
            contentType: resolutionOptions.accept || 'application/did+json',
          },
          didDocument: { id: did },
          didDocumentMetadata: {
            deactivated: false,
          },
        });
        const { didDocument } = resolve('did:example:123');
        expect(didDocument.id).toBe('did:example:123');
      });
      test('resolution options might contain accept', async () => {
        // eslint-disable-next-line no-unused-vars
        const resolveResolution = async (
          did,
          resolutionOptions = {
            accept: 'application/did+ld+json',
          }
        ) => {
          // somehow consume the result of a DID READ Operation...
          const didDocument = await factory
            .build()
            .addRepresentation({
              'application/did+ld+json': jsonld.representation,
            })
            .consume(
              // here we use the didResolutionMetadata as part of consumption
              resolutionOptions.accept,
              JSON.stringify({
                '@context': ['https://www.w3.org/ns/did/v1'],
                id: 'did:example:123',
              })
            );
          const representation = await didDocument.produce(
            resolutionOptions.accept
          );
          return {
            resolutionOptions: {
              contentType:
                resolutionOptions.accept || 'application/did+ld+json',
            },
            didDocumentStream: representation,
            didDocumentMetadata: {
              deactivated: false,
            },
          };
        };
        const { didDocumentStream } = await resolveResolution(
          'did:example:123',
          {
            accept: 'application/did+ld+json',
          }
        );
        expect(JSON.parse(didDocumentStream.toString()).id).toBe(
          'did:example:123'
        );
      });
    });
    describe(`A metadata structure consisting of values 
      relating to the results of the DID resolution process 
      which typically changes between invocations of the 
      resolve and resolveRepresentation functions, as it 
      represents data about the resolution process itself. 
      This structure is REQUIRED, and MUST NOT be empty. 
      This metadata is defined by §7.1.2 DID Resolution Metadata. 
      If resolveRepresentation was called, this structure MUST contain 
      a contentType property containing the Media Type of the 
      representation found in the didDocumentStream. 
      If the resolution is not successful, this structure MUST contain 
      an error property describing the error.`, () => {
      test(`resolveRepresentation didResolutionMetadata must 
        contain an error when resolution is unsuccessful and must contain contentType`, async () => {
        const resolveResolution = async (
          did,
          resolutionOptions = {
            accept: 'application/did+ld+json',
          }
          // eslint-disable-next-line arrow-body-style
        ) => {
          return {
            // did is going to be not valid... so nothing to do with it.
            didDocumentStream: Buffer.from(''),
            didResolutionMetadata: {
              contentType: resolutionOptions.accept,
              error: 'invalidDid',
            },
          };
        };
        const { didResolutionMetadata } = await resolveResolution(
          'did:Example:123'
        );
        expect(didResolutionMetadata.contentType).toBeDefined();
        expect(didResolutionMetadata.error).toBeDefined();
      });
    });
    describe(`If the resolution is successful, and if the 
      resolve function was called, this MUST be a DID 
      document abstract data model (a map) as described in 
      §4. Data Model that is capable of being transformed 
      into a conforming DID Document (representation), using 
      the production rules specified by the representation. 
      The value of id in the resolved DID document MUST match 
      the DID that was resolved. If the resolution is 
      unsuccessful, this value MUST be empty.`, () => {
      test(`resolve returns an abstract data model when resolution succeeds`, async () => {
        const resolve = async (
          did,
          // eslint-disable-next-line no-unused-vars
          resolutionOptions = {}
          // eslint-disable-next-line arrow-body-style
        ) => {
          const didDocument = await factory
            .build({
              entries: {
                '@context': ['https://www.w3.org/ns/did/v1'],
                id: did,
              },
            })
            .addRepresentation({
              'application/did+ld+json': jsonld.representation,
            });
          return {
            didDocument,
            didResolutionMetadata: {
              // required to make this none empty...
              resolvedAt: new Date().toISOString(),
            },
          };
        };
        const { didDocument, didResolutionMetadata } = await resolve(
          'did:example:123'
        );
        expect(didDocument.entries.id).toBe('did:example:123');
        // https://github.com/w3c/did-core/issues/689
        expect(Object.keys(didResolutionMetadata).length).toBeGreaterThan(0);
      });
    });
    describe(`If the resolution is successful, and if the 
      resolveRepresentation function was called, this MUST be 
      a byte stream of the resolved DID document in one of 
      the conformant representations. The byte stream might 
      then be parsed by the caller of the resolveRepresentation 
      function into a data model, which can in turn be validated 
      and processed. If the resolution is unsuccessful, 
      this value MUST be an empty stream.`, () => {
      test('didDocument is a bytestream when resolveRepresentation is successful', async () => {
        const resolveResolution = async (
          did,
          resolutionOptions = {
            accept: 'application/did+ld+json',
          }
          // eslint-disable-next-line arrow-body-style
        ) => {
          const didDocument = await factory
            .build({
              entries: {
                '@context': ['https://www.w3.org/ns/did/v1'],
                id: did,
              },
            })
            .addRepresentation({
              'application/did+ld+json': jsonld.representation,
            });
          return {
            // did is going to be not valid... so nothing to do with it.
            didDocumentStream: await didDocument.produce(
              resolutionOptions.accept
            ),
            didResolutionMetadata: {
              contentType: resolutionOptions.accept,
            },
          };
        };
        const { didDocumentStream } = await resolveResolution(
          'did:example:123'
        );
        expect(didDocumentStream.toString('hex')).toBe(
          '7b2240636f6e74657874223a5b2268747470733a2f2f7777772e77332e6f72672f6e732f6469642f7631225d2c226964223a226469643a6578616d706c653a313233227d'
        );
      });
    });
    describe(`If the resolution is successful, this MUST be a metadata structure. 
      This structure contains metadata about the DID document contained in the didDocument property. 
      This metadata typically does not change between invocations of the resolve and 
      resolveRepresentation functions unless the DID document changes, as it 
      represents metadata about the DID document. If the resolution is unsuccessful, 
      this output MUST be an empty metadata structure. Properties defined by this 
      specification are in §7.1.3 DID Document Metadata.`, () => {
      test('didDocumentMetadata is none empty of successful resolution', () => {
        const didDocumentMetadata = {
          deactivated: true,
        };
        expect(Object.keys(didDocumentMetadata).length).toBeGreaterThan(0);
      });

      test('didDocumentMetadata is must be empty if resolution is unsuccessful', () => {
        const didResolutionMetadata = {
          error: 'invalidDid',
        };
        const didDocumentMetadata = {};
        expect(Object.keys(didDocumentMetadata).length).toBe(0);
        expect(Object.keys(didResolutionMetadata).length).toBe(1);
      });
    });
  });
});
