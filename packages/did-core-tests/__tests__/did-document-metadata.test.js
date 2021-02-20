const { factory } = require('@did-core/data-model');
const jsonld = require('@did-core/did-ld-json');

describe('DID Document Metadata', () => {
  describe('7.1.3', () => {
    describe(`The value of canonicalId MUST be a string that conforms 
    to the rules in Section §3.1 DID Syntax. The relationship is a 
    statement that the canonicalId value is logically equivalent to 
    the id property value and that the canonicalId value is defined 
    by the DID Method to be the canonical ID for the DID subject in 
    the scope of the containing DID document. A canonicalId value 
    MUST be produced by, and a form of, the same DID Method as the id 
    property value. (e.g., did:example:abc == did:example:ABC). 
    A conforming DID Method specification MUST guarantee that the 
    canonicalId value is logically equivalent to the id property value.`, () => {
      test('can treat canonicalId as equivalent to did subject', async () => {
        const didDocument = await factory
          .build()
          .addRepresentation({
            'application/did+ld+json': jsonld.representation,
          })
          .assign({
            '@context': 'https://www.w3.org/ns/did/v1',
            id: 'did:example:123',
          });

        const didDocumentMetaData = {
          canonicalId: 'did:example:456',
        };

        const equivalentAuthoritativeIds = [
          'did:example:123',
          'did:example:456',
        ];

        expect(
          equivalentAuthoritativeIds.includes(didDocument.entries.id)
        ).toBe(true);

        expect(
          equivalentAuthoritativeIds.includes(didDocumentMetaData.canonicalId)
        ).toBe(true);
      });
    });
  });
});
