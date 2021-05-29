import { factory } from '@did-core/data-model';

import { representation } from '../did-ld-json';

const representations = { 'application/did+ld+json': representation };

it('can consume application/did+ld+json', async () => {
  let didDocument = await factory
    .build()
    .addRepresentation(representations)
    .consume(
      'application/did+ld+json',
      Buffer.from(
        JSON.stringify(
          {
            '@context': [
              'https://www.w3.org/ns/did/v1',
              'https://example.com/suites/jws-2020/v1',
            ],
            id: 'did:example:123',
            verificationMethod: [
              {
                id: '#1',
                type: 'JsonWebKey2020',
                controller: 'did:example:123',
                publicKeyJwk: {
                  kty: 'EC',
                  crv: 'P-256',
                  x: 'OnGZYoDhv6aAy19vgVO9Orvm7JmMD9I3NG8I08CjOCc',
                  y: 'vQ3njX0aUGrC1WMEmIzBcMLyUzDWWMdRQQJmAbtZ9wE',
                },
              },
            ],
          },
          null,
          2
        )
      ),
      (iri: string) => {
        if (iri === 'https://www.w3.org/ns/did/v1') {
          return {
            documentUrl: 'https://www.w3.org/ns/did/v1',
            document: {
              '@context': {
                '@protected': true,
                id: '@id',
                type: '@type',

                alsoKnownAs: {
                  '@id': 'https://www.w3.org/ns/activitystreams#alsoKnownAs',
                  '@type': '@id',
                },
                assertionMethod: {
                  '@id': 'https://w3id.org/security#assertionMethod',
                  '@type': '@id',
                  '@container': '@set',
                },
                authentication: {
                  '@id': 'https://w3id.org/security#authenticationMethod',
                  '@type': '@id',
                  '@container': '@set',
                },
                capabilityDelegation: {
                  '@id': 'https://w3id.org/security#capabilityDelegationMethod',
                  '@type': '@id',
                  '@container': '@set',
                },
                capabilityInvocation: {
                  '@id': 'https://w3id.org/security#capabilityInvocationMethod',
                  '@type': '@id',
                  '@container': '@set',
                },
                controller: {
                  '@id': 'https://w3id.org/security#controller',
                  '@type': '@id',
                },
                keyAgreement: {
                  '@id': 'https://w3id.org/security#keyAgreementMethod',
                  '@type': '@id',
                  '@container': '@set',
                },
                service: {
                  '@id': 'https://www.w3.org/ns/did#service',
                  '@type': '@id',
                  '@context': {
                    '@protected': true,
                    id: '@id',
                    type: '@type',
                    serviceEndpoint: {
                      '@id': 'https://www.w3.org/ns/did#serviceEndpoint',
                      '@type': '@id',
                    },
                  },
                },
                verificationMethod: {
                  '@id': 'https://w3id.org/security#verificationMethod',
                  '@type': '@id',
                },
              },
            },
          };
        }
        if (iri === 'https://example.com/suites/jws-2020/v1') {
          return {
            documentUrl: 'https://example.com/suites/jws-2020/v1',
            document: {
              '@context': {
                privateKeyJwk: 'https://w3id.org/security#privateKeyJwk',
                JsonWebKey2020: {
                  '@id': 'https://w3id.org/security#JsonWebKey2020',
                  '@context': {
                    '@protected': true,
                    id: '@id',
                    type: '@type',
                    publicKeyJwk: {
                      '@id': 'https://w3id.org/security#publicKeyJwk',
                      '@type': '@json',
                    },
                  },
                },
                JsonWebSignature2020: {
                  '@id': 'https://w3id.org/security#JsonWebSignature2020',
                  '@context': {
                    '@protected': true,

                    id: '@id',
                    type: '@type',

                    challenge: 'https://w3id.org/security#challenge',
                    created: {
                      '@id': 'http://purl.org/dc/terms/created',
                      '@type': 'http://www.w3.org/2001/XMLSchema#dateTime',
                    },
                    domain: 'https://w3id.org/security#domain',
                    expires: {
                      '@id': 'https://w3id.org/security#expiration',
                      '@type': 'http://www.w3.org/2001/XMLSchema#dateTime',
                    },
                    jws: 'https://w3id.org/security#jws',
                    nonce: 'https://w3id.org/security#nonce',
                    proofPurpose: {
                      '@id': 'https://w3id.org/security#proofPurpose',
                      '@type': '@vocab',
                      '@context': {
                        '@protected': true,

                        id: '@id',
                        type: '@type',

                        assertionMethod: {
                          '@id': 'https://w3id.org/security#assertionMethod',
                          '@type': '@id',
                          '@container': '@set',
                        },
                        authentication: {
                          '@id':
                            'https://w3id.org/security#authenticationMethod',
                          '@type': '@id',
                          '@container': '@set',
                        },
                        capabilityInvocation: {
                          '@id':
                            'https://w3id.org/security#capabilityInvocationMethod',
                          '@type': '@id',
                          '@container': '@set',
                        },
                        capabilityDelegation: {
                          '@id':
                            'https://w3id.org/security#capabilityDelegationMethod',
                          '@type': '@id',
                          '@container': '@set',
                        },
                        keyAgreement: {
                          '@id': 'https://w3id.org/security#keyAgreementMethod',
                          '@type': '@id',
                          '@container': '@set',
                        },
                      },
                    },
                    verificationMethod: {
                      '@id': 'https://w3id.org/security#verificationMethod',
                      '@type': '@id',
                    },
                  },
                },
              },
            },
          };
        }
        throw new Error(`Unsupported iri ${iri}`);
      }
    );
  expect((didDocument.entries as any).id).toBe('did:example:123');
});
