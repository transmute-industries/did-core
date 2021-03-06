describe('DID Resolution Metadata', () => {
  describe('7.1.2', () => {
    describe('The Media Type of the returned didDocumentStream. This property is REQUIRED if resolution is successful and if the resolveRepresentation function was called. This property MUST NOT be present if the resolve function was called. The value of this property MUST be an ASCII string that is the Media Type of the conformant representations. The caller of the resolveRepresentation function MUST use this value when determining how to parse and process the didDocumentStream returned by this function into the data model.', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('The error code from the resolution process. This property is REQUIRED when there is an error in the resolution process. The value of this property MUST be a single keyword ASCII string. The possible property values of this field SHOULD be registered in the DID Specification Registries [DID-SPEC-REGISTRIES]. This specification defines the following common error values:                                               invalidDid                                                   The DID supplied to the DID resolution function does not conform to valid syntax. (See § 3.1 DID Syntax.)                                                   notFound                                                   The DID resolver was unable to find the DID document resulting from this resolution request.                                                   representationNotSupported                                                   This error code is returned if the representation requested via the accept input metadata property is not supported by the DID method and/or DID resolver implementation.                                                   deactivated                                                   The DID supplied to the DID resolution function has been deactivated as described in § 8.2 Method Operations.', () => {
      test.todo('positive');
      test.todo('negative');
    });
  });
});
