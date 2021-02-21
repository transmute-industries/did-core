describe('DID Parameters', () => {
  describe('3.2.1', () => {
    describe('Identifies a service from the DID document by service ID. If present, the associated value MUST be an ASCII string.', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('A relative URI reference according to RFC3986 Section 4.2 that identifies a resource at a service endpoint, which is selected from a DID document by using the service parameter. If present, the associated value MUST be an ASCII string and MUST use percent-encoding for certain characters as specified in RFC3986 Section 2.1.', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('Identifies a specific version of a DID document to be resolved (the version ID could be sequential, or a UUID, or method-specific). If present, the associated value MUST be an ASCII string.', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('Identifies a certain version timestamp of a DID document to be resolved. That is, the DID document that was valid for a DID at a certain time. If present, the associated value MUST be an ASCII string which is a valid XML datetime value, as defined in section 3.3.7 of W3C XML Schema Definition Language (XSD) 1.1 Part 2: Datatypes [XMLSCHEMA11-2]. This datetime value MUST be normalized to UTC 00:00:00 and without sub-second decimal precision. For example: 2020-12-20T19:17:47Z.', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('A resource hash of the DID document to add integrity protection, as specified in [HASHLINK]. This parameter is non-normative. If present, the associated value MUST be an ASCII string.', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('Implementers as well as DID method specification authors might use additional DID parameters that are not listed here. For maximum interoperability, it is RECOMMENDED that DID parameters use the DID Specification Registries mechanism [DID-SPEC-REGISTRIES], to avoid collision with other uses of the same DID parameter with different semantics.', () => {
      test.todo('positive');
      test.todo('negative');
    });
  });
});
