describe('Production', () => {
  describe('6.2.1', () => {
    describe('All entries of a DID document MUST be included in the root JSON Object. Entries MAY contain additional data substructures subject to the value representation rules in the list above. When serializing a DID document, a conforming producer MUST specify a media type of application/did+json to downstream applications such as described in § 7.1.2 DID Resolution Metadata.', () => {
      test.todo('positive');
      test.todo('negative');
    });
  });

  describe('6.3.1', () => {
    describe('A conforming producer that generates a JSON-LD representation SHOULD NOT produce a DID document that contains terms not defined via the @context as conforming consumers are expected to remove unknown terms. When serializing a JSON-LD representation of a DID document, a conforming producer MUST specify a media type of application/did+ld+json to downstream applications such as described in § 7.1.2 DID Resolution Metadata.', () => {
      test.todo('positive');
      test.todo('negative');
    });
  });

  describe('6.4.1', () => {
    describe('All entries of a DID document MUST be included in the root CBOR map (major type 5). Entries MAY contain additional data substructures subject to the value representation rules in the list above. When serializing a DID document to its CBOR representation, a conforming producer MUST specify a media type of application/did+cbor to downstream applications such as described in § 7.1.2 DID Resolution Metadata.', () => {
      test.todo('positive');
      test.todo('negative');
    });
  });
});
