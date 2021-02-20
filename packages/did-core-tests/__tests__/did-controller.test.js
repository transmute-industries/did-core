const { factory } = require('@did-core/data-model');
const jsonld = require('@did-core/did-ld-json');

describe('DID Controller', () => {
  describe('5.1.2', () => {
    describe(`When a controller property is present in a DID document, 
      its value expresses one or more DIDs. Any verification methods 
      contained in the DID documents for those DIDs SHOULD be accepted 
      as authoritative, such that proofs that satisfy those verification 
      methods are to be considered equivalent to proofs provided by the DID subject.`, () => {
      test('can treat controller and subject as equally authoritative', async () => {
        const didDocument = await factory
          .build()
          .addRepresentation({
            'application/did+ld+json': jsonld.representation,
          })
          .assign({
            '@context': 'https://www.w3.org/ns/did/v1',
            id: 'did:example:123',
            controller: 'did:example:456',
          });

        const equivalentAuthoritativeIds = [
          'did:example:123',
          'did:example:456',
        ];

        expect(
          equivalentAuthoritativeIds.includes(didDocument.entries.id)
        ).toBe(true);

        expect(
          equivalentAuthoritativeIds.includes(didDocument.entries.controller)
        ).toBe(true);
      });
    });
  });
});
