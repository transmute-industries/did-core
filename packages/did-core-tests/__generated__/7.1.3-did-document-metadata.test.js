describe('DID Document Metadata', () => {
  describe('7.1.3', () => {
    describe('The possible properties within this structure and their possible values SHOULD be registered in the DID Specification Registries [DID-SPEC-REGISTRIES]. This specification defines the following common properties.', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('DID document metadata SHOULD include a created property to indicate the timestamp of the Create operation. The value of the property MUST be a string formatted as an XML Datetime normalized to UTC 00:00:00 and without sub-second decimal precision. For example: 2020-12-20T19:17:47Z.', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('DID document metadata SHOULD include an updated property to indicate the timestamp of the last Update operation for the document version which was resolved. The value of the property MUST follow the same formatting rules as the created property. The updated property is omitted if an Update operation has never been performed on the DID document. If an updated property exists, it can be the same value as the created property when the difference between the two timestamps is less than one second.', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('(Feature at Risk) Issue The DID Working Group is seeking implementer feedback on this feature. If there is not enough implementation experience with this feature at the end of the Candidate Recommendation period, it will be removed from the specification.                 DID document metadata MAY include a nextUpdate property if the resolved document version is not the latest version of the document. It indicates the timestamp of the next Update operation. The value of the property MUST follow the same formatting rules as the created property.', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('DID document metadata SHOULD include a versionId property to indicate the version of the last Update operation for the document version which was resolved. The value of the property MUST be an ASCII string.', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('(Feature at Risk) Issue The DID Working Group is seeking implementer feedback on this feature. If there is not enough implementation experience with this feature at the end of the Candidate Recommendation period, it will be removed from the specification.                 DID document metadata MAY include a nextVersionId property if the resolved document version is not the latest version of the document. It indicates the version of the next Update operation. The value of the property MUST be an ASCII string.', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('The value of equivalentId MUST be an ordered set where each item in the list is a string that conforms to the rules in Section § 3.1 DID Syntax. The relationship is a statement that each equivalentId value is logically equivalent to the id property value and thus identifies the same DID subject. Each equivalentId DID value MUST be produced by, and a form of, the same DID Method as the id property value. (e.g., did:example:abc == did:example:ABC)', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('A conforming DID Method specification MUST guarantee that each equivalentId value is logically equivalent to the id property value.                           A requesting party is expected to retain the values from the id and equivalentId properties to ensure any subsequent interactions with any of the values they contain are correctly handled as logically equivalent (e.g. retain all variants in a database so an interaction with any one maps to the same underlying account).                          Note: Stronger equivalence equivalentId is a much stronger form of equivalence than alsoKnownAs because the equivalence MUST be guaranteed by the governing DID method. equivalentId represents a full graph merge because the same DID document describes both the equivalentId DID and the id property DID.                           If a requesting party does not retain the values from the id and equivalentId properties and ensure any subsequent interactions with any of the values they contain are correctly handled as logically equivalent, there might be negative or unexpected issues that arise. Implementers are strongly advised to observe the directives related to this metadata property.', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('equivalentId is a much stronger form of equivalence than alsoKnownAs because the equivalence MUST be guaranteed by the governing DID method. equivalentId represents a full graph merge because the same DID document describes both the equivalentId DID and the id property DID.', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('The value of canonicalId MUST be a string that conforms to the rules in Section § 3.1 DID Syntax. The relationship is a statement that the canonicalId value is logically equivalent to the id property value and that the canonicalId value is defined by the DID Method to be the canonical ID for the DID subject in the scope of the containing DID document. A canonicalId value MUST be produced by, and a form of, the same DID Method as the id property value. (e.g., did:example:abc == did:example:ABC). A conforming DID Method specification MUST guarantee that the canonicalId value is logically equivalent to the id property value.', () => {
      test.todo('positive');
      test.todo('negative');
    });
  });
});
