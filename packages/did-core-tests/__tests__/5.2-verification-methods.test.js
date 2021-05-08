const { factory } = require('@did-core/data-model');
const jsonld = require('@did-core/did-ld-json');
const Ajv = require('ajv');
const {
  assertVerificationRelationship,
} = require('../test-helpers/assertVerificationRelationship');

const ajv = new Ajv({ strict: false });

ajv.addSchema(require('../json-schemas/did.json'));
ajv.addSchema(require('../json-schemas/didUrl.json'));
ajv.addSchema(require('../json-schemas/Jwk.json'));
ajv.addSchema(require('../json-schemas/verificationMethod.json'));
ajv.addSchema(require('../json-schemas/verificationMethods.json'));

describe('Verification Methods', () => {
  describe('5.2', () => {
    assertVerificationRelationship(
      'verificationMethod',
      ajv,
      'verificationMethods.json'
    );

    describe(`The verificationMethod property is OPTIONAL. 
      If present, the value MUST be an ordered set of verification methods, 
      where each verification method is expressed using a map. 
      The verification method map MUST include the id, type, 
      controller, and specific verification material properties 
      that are determined by the value of type and are defined 
      in §5.2.1 Verification Material. A verification method MAY 
      include additional properties. Verification methods SHOULD be 
      registered in the DID Specification Registries [DID-SPEC-REGISTRIES].`, () => {
      test('can produce without verificationMethod', async () => {
        await factory
          .build({
            entries: {
              '@context': ['https://www.w3.org/ns/did/v1'],
              id: 'did:example:123',
            },
          })
          .addRepresentation({
            'application/did+ld+json': jsonld.representation,
          })
          .produce('application/did+ld+json');
      });

      test('can produce with verificationMethod', async () => {
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
                  id: '#foo',
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
    });
    describe(`The value of the id property for a verification method MUST be 
      a string that conforms to the rules in Section §3.2 DID URL Syntax.`, () => {
      test('verificationMethod.id should match expectations', async () => {
        expect(
          ajv.validate(
            {
              $ref: `verificationMethod.json`,
            },
            {
              id: '#foo',
              type: 'Bar',
              controller: 'did:example:123',
              publicKeyJwk: {
                kty: 'OKP',
                crv: 'X25519',
                x: 'EL6TJQHCNTVFqU52sxfC23V7oS-yCq82pCe6DeXBtgA',
              },
            }
          )
        ).toBe(true);

        expect(
          ajv.validate(
            {
              $ref: `verificationMethod.json`,
            },
            {
              id: 'did:example:123#foo',
              type: 'Bar',
              controller: 'did:example:123',
              publicKeyJwk: {
                kty: 'OKP',
                crv: 'X25519',
                x: 'EL6TJQHCNTVFqU52sxfC23V7oS-yCq82pCe6DeXBtgA',
              },
            }
          )
        ).toBe(true);

        expect(
          ajv.validate(
            {
              $ref: `verificationMethod.json`,
            },
            {
              id: 'did:example:123/pathname?query=boo#foo',
              type: 'Bar',
              controller: 'did:example:123',
              publicKeyJwk: {
                kty: 'OKP',
                crv: 'X25519',
                x: 'EL6TJQHCNTVFqU52sxfC23V7oS-yCq82pCe6DeXBtgA',
              },
            }
          )
        ).toBe(true);
      });
    });
    describe(`The value of the type property MUST be exactly one verification method type. 
      In order to maximize global interoperability, the verification method type SHOULD 
      be registered in the DID Specification Registries [DID-SPEC-REGISTRIES].`, () => {
      test('can use registered verification method types', () => {
        expect(
          ajv.validate(
            {
              $ref: `verificationMethod.json`,
            },
            {
              id: '#foo',
              type: 'JsonWebKey2020',
              controller: 'did:example:123',
              publicKeyJwk: {
                kty: 'OKP',
                crv: 'X25519',
                x: 'EL6TJQHCNTVFqU52sxfC23V7oS-yCq82pCe6DeXBtgA',
              },
            }
          )
        ).toBe(true);

        expect(
          ajv.validate(
            {
              $ref: `verificationMethod.json`,
            },
            {
              id: '#foo',
              type: 'Ed25519VerificationKey2018',
              controller: 'did:example:123',
              publicKeyBase58: '28N4yL5ErBRwxS8q2xdnkgtLG3TVgxEMzTLtcLHCxaNK',
            }
          )
        ).toBe(true);
      });
    });
    describe(`The value of the controller property MUST be a string that conforms to 
      the rules in Section §3.1 DID Syntax.`, () => {
      test('controller must be a did', async () => {
        expect(
          ajv.validate(
            {
              $ref: `verificationMethod.json`,
            },
            {
              id: '#foo',
              type: 'Ed25519VerificationKey2018',
              controller: 'did:example:123',
              publicKeyBase58: '28N4yL5ErBRwxS8q2xdnkgtLG3TVgxEMzTLtcLHCxaNK',
            }
          )
        ).toBe(true);

        expect(
          ajv.validate(
            {
              $ref: `verificationMethod.json`,
            },
            {
              id: '#foo',
              type: 'Ed25519VerificationKey2018',
              controller: 'https://example.com/123',
              publicKeyBase58: '28N4yL5ErBRwxS8q2xdnkgtLG3TVgxEMzTLtcLHCxaNK',
            }
          )
        ).toBe(false);
      });
    });
  });
});
