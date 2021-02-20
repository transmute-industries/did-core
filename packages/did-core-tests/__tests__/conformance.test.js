const { factory } = require('@did-core/data-model');
const { representation } = require('@did-core/did-ld-json');

describe('Conformance', () => {
  describe('1.4', () => {
    describe(`A conforming consumer is any algorithm realized as software 
      and/or hardware that consumes conforming DIDs or conforming DID documents. 
      A conforming consumer MUST produce errors when 
      consuming non-conforming DIDs or DID documents.`, () => {
      test('can consume JSON-LD', async () => {
        const didDocument = await factory
          .build()
          .addRepresentation({ 'application/did+ld+json': representation })
          .consume(
            'application/did+ld+json',
            JSON.stringify({
              '@context': 'https://www.w3.org/ns/did/v1',
              id: 'did:example:123',
            })
          );
        expect(didDocument.entries['@context']).toBe(
          'https://www.w3.org/ns/did/v1'
        );
        expect(didDocument.entries.id).toBe('did:example:123');
      });

      test('cannot consume non conformant JSON-LD', async () => {
        try {
          await factory
            .build()
            .addRepresentation({ 'application/did+ld+json': representation })
            .consume(
              'application/did+ld+json',
              JSON.stringify({
                id: 'did:example:123',
              })
            );
        } catch (e) {
          expect(e.message).toBe('"@context" is required and not present.');
        }
      });
    });
  });
});