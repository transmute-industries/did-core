const { factory } = require('@did-core/data-model');
const jsonld = require('@did-core/did-ld-json');
const Ajv = require('ajv');

const ajv = new Ajv({ strict: false });

ajv.addSchema(require('../json-schemas/didUrl.json'));
ajv.addSchema(require('../json-schemas/service.json'));
ajv.addSchema(require('../json-schemas/services.json'));

describe('Services', () => {
  describe('5.4', () => {
    describe(`The service property is OPTIONAL. 
      If present, the associated value MUST be an ordered set of services, 
      where each service is described by a map. Each service map 
      MUST contain id, type, and serviceEndpoint properties. 
      Each service extension MAY include additional properties 
      and MAY further restrict the properties associated with the extension.`, () => {
      test('can produce without service', async () => {
        await factory
          .build({
            entries: {
              '@context': ['https://www.w3.org/ns/did/v1'],
              id: 'did:example:123',
            },
          })
          .addRepresentation({
            'application/did+ld+json': jsonld.representation,
          });
      });

      test('when present service must match expectation', async () => {
        const didDocument = await factory
          .build({
            entries: {
              '@context': ['https://www.w3.org/ns/did/v1'],
              id: 'did:example:123',
              service: [
                {
                  id: '#agent',
                  type: 'CloudService',
                  serviceEndpoint: 'https://example.com/agents/123',
                },
              ],
            },
          })
          .addRepresentation({
            'application/did+ld+json': jsonld.representation,
          })
          .produce('application/did+ld+json');

        expect(
          ajv.validate(
            {
              // validate conformance to RFC3986
              $ref: 'services.json',
            },
            JSON.parse(didDocument.toString()).service
          )
        ).toBe(true);
      });
    });
    describe(`The value of the id property MUST be a URI conforming to [RFC3986]. 
      A conforming producer MUST NOT produce multiple service entries with the same id. 
      A conforming consumer MUST produce an error if it detects multiple service 
      entries with the same id.`, () => {
      test('service.id musts be a URI', () => {
        expect(
          ajv.validate(
            {
              $ref: 'service.json',
            },
            {
              id: '/pathname?query=foo#bar',
              type: 'Foo',
              serviceEndpoint: 'https://example.com/agent/123',
            }
          )
        ).toBe(true);

        expect(
          ajv.validate(
            {
              $ref: 'service.json',
            },
            {
              id: 'https://example.com/agent/pathname?query=foo#bar',
              type: 'Foo',
              serviceEndpoint: 'https://example.com/agent/123',
            }
          )
        ).toBe(true);

        expect(
          ajv.validate(
            {
              $ref: 'service.json',
            },
            {
              id: 'did:example:123/pathname?query=foo#bar',
              type: 'Foo',
              serviceEndpoint: 'https://example.com/agent/123',
            }
          )
        ).toBe(true);
      });
    });
    describe(`The value of the type property MUST be a string or an ordered set of strings.  
      In order to maximize interoperability, the verification method type and its associated 
      properties SHOULD be registered in the DID Specification Registries [DID-SPEC-REGISTRIES].`, () => {
      test('service.type must match expectations', async () => {
        expect(
          ajv.validate(
            {
              $ref: 'service.json',
            },
            {
              id: 'did:example:123/pathname?query=foo#bar',
              type: 'Foo',
              serviceEndpoint: 'https://example.com/agent/123',
            }
          )
        ).toBe(true);

        expect(
          ajv.validate(
            {
              $ref: 'service.json',
            },
            {
              id: 'did:example:123/pathname?query=foo#bar',
              type: ['Foo', 'Bar'],
              serviceEndpoint: 'https://example.com/agent/123',
            }
          )
        ).toBe(true);
      });
    });
    describe(`The value of the serviceEndpoint property MUST be a string, a map, or an 
      ordered set composed of one or more strings and/or maps. All string values MUST be 
      valid URIs conforming to [RFC3986] and normalized according to the Normalization 
      and Comparison rules in RFC3986 and to any normalization rules in its applicable 
      URI scheme specification.`, () => {
      test('service.type must match expectations', async () => {
        expect(
          ajv.validate(
            {
              $ref: 'service.json',
            },
            {
              id: 'did:example:123/pathname?query=foo#bar',
              type: 'Foo',
              serviceEndpoint: 'https://example.com/agent/123',
            }
          )
        ).toBe(true);

        expect(
          ajv.validate(
            {
              $ref: 'service.json',
            },
            {
              id: 'did:example:123/pathname?query=foo#bar',
              type: 'Foo',
              serviceEndpoint: [
                'https://example.com/agent/123',
                'https://demo.example.com/agent/123',
              ],
            }
          )
        ).toBe(true);

        expect(
          ajv.validate(
            {
              $ref: 'service.json',
            },
            {
              id: 'did:example:123/pathname?query=foo#bar',
              type: 'Foo',
              serviceEndpoint: {
                type: 'Agent',
                endpoint: 'https://example.com/agent/123',
              },
            }
          )
        ).toBe(true);
      });
    });
  });
});
