const { factory } = require('@did-core/data-model');
const jsonld = require('@did-core/did-ld-json');

describe('DID Controller', () => {
  describe('5.1.2', () => {
    describe(`The controller property is OPTIONAL. 
      If present, the value MUST be a string or an ordered set 
      of strings that conform to the rules in §3.1 DID Syntax. 
      The corresponding DID document(s) SHOULD contain verification 
      relationships that explicitly permit the use of certain 
      verification methods for specific purposes.`, () => {
      test('did controller can be ommited', async () => {
        await factory
          .build()
          .addRepresentation({
            'application/did+ld+json': jsonld.representation,
          })
          .assign({
            '@context': 'https://www.w3.org/ns/did/v1',
            id: 'did:example:123',
            // not required.
            // controller: 'did:example:456',
          })
          .produce('application/did+ld+json');
      });

      test('did controller can be a did', async () => {
        await factory
          .build()
          .addRepresentation({
            'application/did+ld+json': jsonld.representation,
          })
          .assign({
            '@context': 'https://www.w3.org/ns/did/v1',
            id: 'did:example:123',
            controller: 'did:example:456',
          })
          .produce('application/did+ld+json');
      });

      test('did controller can be an ordered list of dids', async () => {
        await factory
          .build()
          .addRepresentation({
            'application/did+ld+json': jsonld.representation,
          })
          .assign({
            '@context': 'https://www.w3.org/ns/did/v1',
            id: 'did:example:123',
            controller: ['did:example:456', 'did:example:789'],
          })
          .produce('application/did+ld+json');
      });

      test('did controller should be referenced by verification relationships', async () => {
        await factory
          .build()
          .addRepresentation({
            'application/did+ld+json': jsonld.representation,
          })
          .assign({
            '@context': 'https://www.w3.org/ns/did/v1',
            id: 'did:example:123',
            controller: ['did:example:456', 'did:example:789'],
            authentication: [
              {
                id: '#key-0',
                type: 'JsonWebKey2020',
                controller: 'did:example:456',
                publicKeyJwk: {
                  crv: 'Ed25519',
                  x: 'xL_LN_iZwvgMR88v7JzjHlnUFVPgXxT8UbCdKnIav6M',
                  kty: 'OKP',
                },
              },
            ],
            assertionMethod: [
              {
                id: '#key-0',
                type: 'JsonWebKey2020',
                controller: 'did:example:789',
                publicKeyJwk: {
                  crv: 'Ed25519',
                  x: 'xL_LN_iZwvgMR88v7JzjHlnUFVPgXxT8UbCdKnIav6M',
                  kty: 'OKP',
                },
              },
            ],
          })
          .produce('application/did+ld+json');
      });
    });
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
