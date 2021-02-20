describe('Consumption', () => {
  describe('6.2.2', () => {
    describe('The DID document and any DID document data structures expressed by a JSON representation MUST be deserialized into the data model according to the following consumption rules:                                                 JSON Representation Type                               Data Type                                                                                JSON Object                               An ordered map, where each member of the JSON Object is added as an entry to the ordered map. Each entry key is set as the JSON Object member name. Each entry value is set by converting the JSON Object member value according to the JSON representation type as defined in this table. Since order is not specified by JSON Objects, no insertion order is guaranteed.                                                         JSON Array where the data model entry value is a list or unknown                               A list, where each value of the JSON Array is added to the list in order, converted based on the JSON representation type of the array value, as defined in this table.                                                         JSON Array where the data model entry value is an ordered set                               An ordered set, where each value of the JSON Array is added to the ordered set in order, converted based on the JSON representation type of the array value, as defined in this table.                                                         JSON String where data model entry value is a datetime                               A datetime.                                                         JSON String, where the data model entry value type is string or unknown                               A string.                                                         JSON Number without a decimal or fractional component                               An integer.                                                         JSON Number with a decimal and fractional component, or when entry value is a double regardless of inclusion of fractional component                               A double.                                                         JSON Boolean                               A boolean.                                                         JSON null literal                               A null value.', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('If media type information is available to a conforming consumer and the media type value is application/did+json, then the data structure being consumed is a DID document, and the root element MUST be a JSON Object where all members of the object are entries of the DID document. A conforming consumer for a JSON representation that is consuming a DID document with a root element that is not a JSON Object MUST report an error.', () => {
      test.todo('positive');
      test.todo('negative');
    });
  });

  describe('6.3.2', () => {
    describe('The DID document and any DID document data structures expressed by a JSON-LD representation MUST be deserialized into the data model according to the JSON representation consumption rules as defined in § 6.2 JSON.', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('In addition to using the JSON representation consumption rules, JSON-LD consumption MUST add the representation-specific entries into the data model according to the JSON representation consumption rules.', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('Conforming consumers that process a JSON-LD representation SHOULD drop all terms from a DID document that are not defined via the @context.', () => {
      test.todo('positive');
      test.todo('negative');
    });
  });

  describe('6.4.2', () => {
    describe('All data structures expressed by a CBOR representation MUST be deserialized into the data model according to the following consumption rules:                                                 CBOR Representation Type                               Data Type                                                                                CBOR map (major type 5)                               An ordered map, where each data item of the CBOR map is added as an entry to the ordered map with the entry key being the data item name and the value converted based on the CBOR type and, if available, entry definition, as defined here; as no order can be enforced for general CBOR maps, no insertion order is guaranteed.                                                         CBOR array (major type 4), where the data model entry value is a list or unknown                               A list, where each value of the CBOR array is added to the list in order, converted based on the CBOR type of the array value, as defined in this table.                                                         CBOR array (major type 4), where the data model entry value is an ordered set                               An ordered set, where each value of the CBOR array is added to the ordered set in order, converted based on the CBOR type of the array value as defined in this table.                                                         CBOR string (major type 3) where the data model entry value is a datetime                               A datetime.                                                         CBOR string (major type 3), where the data model entry value type is string or unknown                               A string.                                                         CBOR integer (major type 0 or 1), choosing the shortest byte representation                               An integer.                                                         CBOR floating-point number (major type 7)                               A double.                                                         CBOR simple value (major type 7, subtype 24) with a simple value of 21 (True) or 20 (False)                               A boolean.                                                         CBOR simple value (major type 7, subtype 24) with a simple value of 22 (Null)                               A null value.', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('CBOR indefinite-length items are not allowed and MUST produce an error.', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('A duplicate key in the same CBOR map MUST produce an error.', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('All CBOR tags MUST be retained for CBOR production regardless of whether they are optional.', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('If media type information is available to a conforming consumer and the media type value is application/did+json, then the data structure being consumed is a DID document, and the root element MUST be a CBOR map (major type 5) where all members of the object are entries of the DID document. A conforming consumer for a CBOR representation that is consuming a DID document with a root element that is not a CBOR map (major type 5) MUST report an error.', () => {
      test.todo('positive');
      test.todo('negative');
    });
  });
});
