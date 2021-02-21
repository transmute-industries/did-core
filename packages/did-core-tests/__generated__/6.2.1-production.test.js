describe('Production', () => {
  describe('6.2.1', () => {
    describe('The DID document and any DID document data structures expressed by the data model MUST be serialized to the JSON representation according to the following production rules:                                                 Data Type                               JSON Representation Type                                                                                ordered map                               A JSON Object, where each entry is serialized as a member of the JSON Object with the entry key as a JSON String member name and the entry value according to its type, as defined in this table.                                                         list                               A JSON Array, where each element of the list is serialized, in order, as a value of the array according to its type, as defined in this table.                                                         ordered set                               A JSON Array, where each element of the set is added, in order, as a value of the array according to its type, as defined in this table.                                                         datetime                               A JSON String serialized as an XML Datetime normalized to UTC 00:00:00 and without sub-second decimal precision. For example: 2020-12-20T19:17:47Z.                                                         string                               A JSON String.                                                         integer                               A JSON Number without a decimal or fractional component.                                                         double                               A JSON Number with a decimal and fractional component.                                                         boolean                               A JSON Boolean.                                                         null                               A JSON null literal.', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('All entries of a DID document MUST be included in the root JSON Object. Entries MAY contain additional data substructures subject to the value representation rules in the list above. When serializing a DID document, a conforming producer MUST specify a media type of application/did+json to downstream applications such as described in § 7.1.2 DID Resolution Metadata.', () => {
      test.todo('positive');
      test.todo('negative');
    });
  });

  describe('6.3.1', () => {
    describe('The DID document and any DID document data structures expressed by the data model MUST be serialized to the JSON-LD representation according to the JSON representation production rules as defined in § 6.2 JSON.', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('In addition to using the JSON representation production rules, JSON-LD production MUST include the representation-specific @context entry. The serialized value of @context MUST be the JSON String https://www.w3.org/ns/did/v1, or a JSON Array where the first item is the JSON String https://www.w3.org/ns/did/v1 and the subsequent items are serialized according to the JSON representation production rules.', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('In order to achieve interoperability across different representations, all JSON-LD Contexts and their terms SHOULD be registered in the DID Specification Registries [DID-SPEC-REGISTRIES].', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('A conforming producer that generates a JSON-LD representation SHOULD NOT produce a DID document that contains terms not defined via the @context as conforming consumers are expected to remove unknown terms. When serializing a JSON-LD representation of a DID document, a conforming producer MUST specify a media type of application/did+ld+json to downstream applications such as described in § 7.1.2 DID Resolution Metadata.', () => {
      test.todo('positive');
      test.todo('negative');
    });
  });

  describe('6.4.1', () => {
    describe('All DID document data structures expressed by the data model MUST be serialized to the CBOR representation according to the following production rules:                                                 Data Type                               CBOR Representation Type                                                                                ordered map                               A CBOR map (major type 5), where each entry is represented as a member of the CBOR map. The entry key is expressed as a CBOR string (major type 3) as the key, and the entry value according to its type, as defined in this table.                                                         list                               A CBOR array (major type 4), where each element of the list is added, in order, as a value of the array according to its type, as defined in this table.                                                         ordered set                               A CBOR array (major type 4), where each element of the list is added, in order, as a value of the array according to its type, as defined in this table.                                                         datetime                               A CBOR string (major type 3) formatted as an XML Datetime normalized to UTC 00:00 and without sub-second decimal precision. For example: 2020-12-20T19:17:47Z.                                                         string                               A CBOR string (major type 3).                                                         integer                               A CBOR integer (major type 0 or 1), choosing the shortest byte representation.                                                         double                               A CBOR floating-point number (major type 7). All floating point values MUST be encoded as 64-bits (additional type value 27), even for integral values.                                                         boolean                               A CBOR simple value (major type 7, subtype 24) with a simple value of 21 (true) or 20 (false).                                                         null                               A CBOR simple value (major type 7, subtype 24) with a simple value of 22 (null).', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('A CBOR floating-point number (major type 7). All floating point values MUST be encoded as 64-bits (additional type value 27), even for integral values.', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('Indefinite-length items are not allowed and MUST be made a CBOR definite length.', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('All CBOR tags MUST be retained regardless of whether they are optional.', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('All four Canonical CBOR rules listed in [RFC8949] MUST be applied to all relevant data types.', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('All entries of a DID document MUST be included in the root CBOR map (major type 5). Entries MAY contain additional data substructures subject to the value representation rules in the list above. When serializing a DID document to its CBOR representation, a conforming producer MUST specify a media type of application/did+cbor to downstream applications such as described in § 7.1.2 DID Resolution Metadata.', () => {
      test.todo('positive');
      test.todo('negative');
    });
  });
});
