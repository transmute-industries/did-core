const { factory } = require('@did-core/data-model');
const jsonld = require('@did-core/did-ld-json');

describe('Verification Relationships', () => {
  describe('5.3', () => {
    describe(`The following sections define several useful verification relationships. 
      A DID document MAY include any of these, or other properties, to express a specific 
      verification relationship. In order to maximize global interoperability, 
      any such properties used SHOULD be registered in the 
      DID Specification Registries [DID-SPEC-REGISTRIES].`, () => {
      test('can produce with registered relationships', async () => {
        await factory
          .build({
            entries: {
              '@context': [
                'https://www.w3.org/ns/did/v1',
                'https://ns.did.ai/suites/jws-2020/v1',
              ],
              id: 'did:example:123',
              verificationMethod: [
                {
                  id: '#key',
                  type: 'JsonWebKey2020',
                  controller: 'did:example:123',
                  publicKeyJwk: {
                    crv: 'Ed25519',
                    x: 'Qibo5D0d0-BKpk5tqWyZ-QBdxaLFxI3x_zOBXyg4Owc',
                    kty: 'OKP',
                  },
                },
              ],
              authentication: ['#key'],
              assertionMethod: ['#key'],
              capabilityInvocation: ['#key'],
              capabilityDelegation: ['#key'],
              keyAgreement: [
                {
                  id: '#key-2',
                  type: 'JsonWebKey2020',
                  controller: 'did:example:123',
                  publicKeyJwk: {
                    kty: 'OKP',
                    crv: 'X25519',
                    x: 'EL6TJQHCNTVFqU52sxfC23V7oS-yCq82pCe6DeXBtgA',
                  },
                },
              ],
            },
          })
          .addRepresentation({
            'application/did+ld+json': jsonld.representation,
          })
          .produce('application/did+ld+json');
      });

      test('can produce with unregistered relationships', async () => {
        await factory
          .build({
            entries: {
              '@context': [
                'https://www.w3.org/ns/did/v1',
                'https://ns.did.ai/suites/jws-2020/v1',
                {
                  magicMethod: {
                    '@id': 'https://example.com/ns#magicMethod',
                    '@type': '@id',
                    '@container': '@set',
                  },
                },
              ],
              id: 'did:example:123',
              magicMethod: [
                {
                  id: '#key',
                  type: 'JsonWebKey2020',
                  controller: 'did:example:123',
                  publicKeyJwk: {
                    crv: 'Ed25519',
                    x: 'Qibo5D0d0-BKpk5tqWyZ-QBdxaLFxI3x_zOBXyg4Owc',
                    kty: 'OKP',
                  },
                },
              ],
            },
          })
          .addRepresentation({
            'application/did+ld+json': jsonld.representation,
          })
          .produce('application/did+ld+json');
      });
    });
  });
});
