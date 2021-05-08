const { factory } = require('@did-core/data-model');
const jsonld = require('@did-core/did-ld-json');
const Ajv = require('ajv');

const ajv = new Ajv({ strict: false });

ajv.addSchema(require('../json-schemas/did.json'));
ajv.addSchema(require('../json-schemas/ascii.json'));

describe('DID Document Metadata', () => {
  describe('7.1.3', () => {
    describe(`The possible properties within this structure and their possible values 
      SHOULD be registered in the DID Specification Registries [DID-SPEC-REGISTRIES]. 
      This specification defines the following common properties.`, () => {
      test('can use registerd properties', async () => {
        // https://w3c.github.io/did-spec-registries/#did-document-metadata
        const samplesOfRegisteredParameters = [
          'created',
          'updated',
          'versionId',
        ];
        expect(samplesOfRegisteredParameters.length).toBe(3);
      });
    });
    describe(`DID document metadata SHOULD include a created property to indicate 
      the timestamp of the Create operation. The value of the property MUST be a 
      string formatted as an XML Datetime normalized to UTC 00:00:00 and without 
      sub-second decimal precision. For example: 2020-12-20T19:17:47Z.`, () => {
      test('did document meta data can include created', async () => {
        const didDocumentMetadata = {
          created: '2020-12-20T19:17:47Z',
        };
        const date = new Date(didDocumentMetadata.created);
        expect(date.getMonth()).toBe(11);
      });
    });
    describe(`DID document metadata SHOULD include an updated property to indicate
      the timestamp of the last Update operation for the document version which was
      resolved. The value of the property MUST follow the same formatting rules as 
      the created property. The updated property is omitted if an Update operation 
      has never been performed on the DID document. If an updated property exists, 
      it can be the same value as the created property when the difference between 
      the two timestamps is less than one second.`, () => {
      test('did document meta data can include updated', async () => {
        const didDocumentMetadata = {
          updated: '2020-12-20T19:17:47Z',
        };
        const date = new Date(didDocumentMetadata.updated);
        expect(date.getMonth()).toBe(11);
      });
    });
    describe(`(Feature at Risk) Issue The DID Working Group is seeking implementer 
      feedback on this feature. If there is not enough implementation experience 
      with this feature at the end of the Candidate Recommendation period, 
      it will be removed from the specification. 
      DID document metadata MAY include a nextUpdate property if the resolved 
      document version is not the latest version of the document. It indicates 
      the timestamp of the next Update operation. The value of the property 
      MUST follow the same formatting rules as the created property.`, () => {
      test('did document meta data can include nextUpdate', async () => {
        const didDocumentMetadata = {
          nextUpdate: '2020-12-20T19:17:47Z',
        };
        const date = new Date(didDocumentMetadata.nextUpdate);
        expect(date.getMonth()).toBe(11);
      });
    });
    describe(`DID document metadata SHOULD include a versionId property to 
      indicate the version of the last Update operation for the document 
      version which was resolved. The value of the property MUST be an ASCII string.`, () => {
      test('did document meta data can include versionId', async () => {
        const didDocumentMetadata = {
          versionId: 'bafyreifederejlobaec...',
        };
        expect(
          ajv.validate(
            {
              $ref: `ascii.json`,
            },
            didDocumentMetadata.versionId
          )
        ).toBe(true);
      });
    });
    describe(`(Feature at Risk) Issue The DID Working Group is seeking 
      implementer feedback on this feature. If there is not enough 
      implementation experience with this feature at the end of the 
      Candidate Recommendation period, it will be removed from the specification. 
      DID document metadata MAY include a nextVersionId property if the resolved 
      document version is not the latest version of the document. It indicates 
      the version of the next Update operation. 
      The value of the property MUST be an ASCII string.`, () => {
      test('did document meta data can include versionId', async () => {
        const didDocumentMetadata = {
          nextVersionId: 'bafyreifederejlobaec...',
        };
        expect(
          ajv.validate(
            {
              $ref: `ascii.json`,
            },
            didDocumentMetadata.nextVersionId
          )
        ).toBe(true);
      });
    });
    describe(`The value of equivalentId MUST be an ordered set where 
      each item in the list is a string that conforms to the rules in 
      Section §3.1 DID Syntax. The relationship is a statement that each 
      equivalentId value is logically equivalent to the id property value 
      and thus identifies the same DID subject. 
      Each equivalentId DID value MUST be produced by, and a form of, 
      the same DID Method as the id property value. 
      (e.g., did:example:abc == did:example:ABC)`, () => {
      test('equivalentId must be a list of valid dids', () => {
        const equivalentId = ['did:example:123', 'did:example:456'];
        expect(
          equivalentId.map((sample) =>
            ajv.validate(
              {
                $ref: `did.json`,
              },
              sample
            )
          )
        ).toEqual([true, true]);
      });

      test('equivalentId must be of the same method', () => {
        const equivalentId = ['did:example:123', 'did:example:456'];
        const methods = equivalentId.map((id) => id.split(':')[1]);
        const uniqueMethods = Array.from(new Set(methods));
        expect(uniqueMethods).toEqual(['example']);
      });
    });
    describe(`A conforming DID Method specification MUST guarantee 
      that each equivalentId value is logically equivalent to the id property value.  
      A requesting party is expected to retain the values from the id and 
      equivalentId properties to ensure any subsequent interactions with 
      any of the values they contain are correctly handled as logically 
      equivalent (e.g. retain all variants in a database so an interaction 
      with any one maps to the same underlying account). 
      Note: Stronger equivalence equivalentId is a much stronger 
      form of equivalence than alsoKnownAs because the equivalence 
      MUST be guaranteed by the governing DID method. equivalentId 
      represents a full graph merge because the same DID document 
      describes both the equivalentId DID and the id property DID. 
      If a requesting party does not retain the values from the 
      id and equivalentId properties and ensure any subsequent 
      interactions with any of the values they contain are 
      correctly handled as logically equivalent, there might be 
      negative or unexpected issues that arise. Implementers are 
      strongly advised to observe the directives related to this metadata property.`, () => {
      test('beg relying parties to keep an unbounded list of equivalent subject identifiers', () => {
        const rpSubjectIdentifiers = ['did:example:123', 'did:example:456'];
        const exampleDidDocument = {
          id: 'did:example:123',
          equivalentId: ['did:example:456'],
        };
        // rp checks its list based on `id`
        expect(rpSubjectIdentifiers.includes(exampleDidDocument.id)).toBe(true);
      });
    });
    describe(`equivalentId is a much stronger form of equivalence than alsoKnownAs 
    because the equivalence MUST be guaranteed by the governing DID method. 
    equivalentId represents a full graph merge because the same DID document 
    describes both the equivalentId DID and the id property DID.`, () => {
      test('beg relying parties to keep an unbounded list of equivalent subject identifiers', () => {
        const exampleDidDocument = {
          id: 'did:example:123',
          alsoKnownAs: ['did:example-1:789'],
          equivalentId: ['did:example:456'],
        };

        const equivalentIds = [
          exampleDidDocument.id,
          ...exampleDidDocument.equivalentId,
        ];

        const relatedIds = [
          exampleDidDocument.id,
          ...exampleDidDocument.equivalentId,
          ...exampleDidDocument.alsoKnownAs,
        ];
        // equivalent Ids are of the same method
        expect(
          Array.from(new Set(equivalentIds.map((id) => id.split(':')[1])))
        ).toEqual(['example']);

        // relatedIds Ids can be of other methods
        expect(
          Array.from(new Set(relatedIds.map((id) => id.split(':')[1])))
        ).toEqual(['example', 'example-1']);
      });
    });
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
            '@context': [
              'https://www.w3.org/ns/did/v1',
              'https://ns.did.ai/suites/jws-2020/v1',
            ],
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
