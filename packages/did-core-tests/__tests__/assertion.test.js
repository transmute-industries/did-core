const { factory } = require('@did-core/data-model');
const { representation } = require('@did-core/did-ld-json');
const Ajv = require('ajv');

const ajv = new Ajv({ strict: false });

ajv.addSchema(require('../json-schemas/didUrl.json'));
ajv.addSchema(require('../json-schemas/Jwk.json'));
ajv.addSchema(require('../json-schemas/verificationMethod.json'));
ajv.addSchema(require('../json-schemas/assertionMethod.json'));

describe('Assertion', () => {
  describe('5.3.2', () => {
    describe(`The assertionMethod property is OPTIONAL. 
    If present, the associated value MUST be 
    an ordered set of one or more verification methods. 
    Each verification method MAY be embedded or referenced.`, () => {
      test('can produce a did document without assertionMethod', async () => {
        const didDocument = factory.build({
          entries: {
            '@context': 'https://www.w3.org/ns/did/v1',
            id: 'did:example:123',
          },
        });
        const didDocumentStream = await didDocument
          .addRepresentation({ 'application/did+ld+json': representation })
          .produce('application/did+ld+json');
        expect(didDocumentStream).toBeDefined();
      });

      test('can produce a did document with assertionMethod', async () => {
        const didDocument = factory.build({
          entries: {
            '@context': 'https://www.w3.org/ns/did/v1',
            id: 'did:example:123',
            assertionMethod: [
              {
                id: '#key-0',
                type: 'JsonWebKey2020',
                controller: 'did:example:123',
                publicKeyJwk: {
                  crv: 'Ed25519',
                  x: 'xL_LN_iZwvgMR88v7JzjHlnUFVPgXxT8UbCdKnIav6M',
                  kty: 'OKP',
                },
              },
            ],
          },
        });
        const didDocumentStream = await didDocument
          .addRepresentation({ 'application/did+ld+json': representation })
          .produce('application/did+ld+json');
        expect(didDocumentStream).toBeDefined();
      });

      test('can validate relative', () => {
        const isValid = ajv.validate(
          {
            $ref: 'assertionMethod.json',
          },
          ['#key-0']
        );
        expect(isValid).toBe(true);
      });

      test('can validate absolute references ', () => {
        const isValid = ajv.validate(
          {
            $ref: 'assertionMethod.json',
          },
          ['did:example:123#key-0']
        );
        expect(isValid).toBe(true);
      });

      test('can validate embedded relative', () => {
        const isValid = ajv.validate(
          {
            $ref: 'assertionMethod.json',
          },
          [
            {
              id: '#key-0',
              type: 'JsonWebKey2020',
              controller: 'did:example:123',
              publicKeyJwk: {
                crv: 'Ed25519',
                x: 'xL_LN_iZwvgMR88v7JzjHlnUFVPgXxT8UbCdKnIav6M',
                kty: 'OKP',
              },
            },
          ]
        );
        expect(isValid).toBe(true);
      });

      test('can validate embedded absolute', () => {
        const isValid = ajv.validate(
          {
            $ref: 'assertionMethod.json',
          },
          [
            {
              id: 'did:example:123#key-0',
              type: 'JsonWebKey2020',
              controller: 'did:example:123',
              publicKeyBase58: 'AMXANyfXDs6goAtjXzsXKGimryx9DNAhHTLgqLWcM29B',
            },
          ]
        );
        expect(isValid).toBe(true);
      });

      test('can validate embedded relative with query', () => {
        const isValid = ajv.validate(
          {
            $ref: 'assertionMethod.json',
          },
          [
            {
              id: '?versionId=42#key-0',
              type: 'JsonWebKey2020',
              controller: 'did:example:123',
              publicKeyBase58: 'AMXANyfXDs6goAtjXzsXKGimryx9DNAhHTLgqLWcM29B',
            },
          ]
        );
        expect(isValid).toBe(true);
      });

      test('can validate embedded absolute with query', () => {
        const isValid = ajv.validate(
          {
            $ref: 'assertionMethod.json',
          },
          [
            {
              id: 'did:example:123?versionId=42#key-0',
              type: 'JsonWebKey2020',
              controller: 'did:example:123',
              publicKeyBase58: 'AMXANyfXDs6goAtjXzsXKGimryx9DNAhHTLgqLWcM29B',
            },
          ]
        );
        expect(isValid).toBe(true);
      });
    });
  });
});
