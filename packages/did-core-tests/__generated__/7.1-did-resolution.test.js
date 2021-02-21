describe('DID Resolution', () => {
  describe('7.1', () => {
    describe('This is the DID to resolve. This input is REQUIRED and the value MUST be a conformant DID as defined in § 3.1 DID Syntax.', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('A metadata structure containing properties defined in § 7.1.1 DID Resolution Options. This input is REQUIRED, but the structure MAY be empty.', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('A metadata structure consisting of values relating to the results of the DID resolution process which typically changes between invocations of the resolve and resolveRepresentation functions, as it represents data about the resolution process itself. This structure is REQUIRED, and MUST NOT be empty. This metadata is defined by § 7.1.2 DID Resolution Metadata. If resolveRepresentation was called, this structure MUST contain a contentType property containing the Media Type of the representation found in the didDocumentStream. If the resolution is not successful, this structure MUST contain an error property describing the error.', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('If the resolution is successful, and if the resolve function was called, this MUST be a DID document abstract data model (a map) as described in § 4. Data Model that is capable of being transformed into a conforming DID Document (representation), using the production rules specified by the representation. The value of id in the resolved DID document MUST match the DID that was resolved. If the resolution is unsuccessful, this value MUST be empty.', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('If the resolution is successful, and if the resolveRepresentation function was called, this MUST be a byte stream of the resolved DID document in one of the conformant representations. The byte stream might then be parsed by the caller of the resolveRepresentation function into a data model, which can in turn be validated and processed. If the resolution is unsuccessful, this value MUST be an empty stream.', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('If the resolution is successful, this MUST be a metadata structure. This structure contains metadata about the DID document contained in the didDocument property. This metadata typically does not change between invocations of the resolve and resolveRepresentation functions unless the DID document changes, as it represents metadata about the DID document. If the resolution is unsuccessful, this output MUST be an empty metadata structure. Properties defined by this specification are in § 7.1.3 DID Document Metadata.', () => {
      test.todo('positive');
      test.todo('negative');
    });
  });
});
