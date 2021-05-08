describe('Production and Consumption', () => {
  describe('6.1', () => {
    describe('A representation MUST define deterministic production and consumption rules for all data types specified in § 4. Data Model.', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('A representation MUST be uniquely associated with an IANA-registered Media Type.', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('A representation MUST define fragment processing rules for its Media Type that are conformant with the fragment processing rules defined in § Fragment.', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('A representation SHOULD use the lexical representation of data model data types. For example, JSON and JSON-LD use the XML Schema dateTime lexical serialization to represent datetimes. A representation MAY choose to serialize the data model data types using a different lexical serializations as long as the consumption process back into the data model is lossless. For example, some CBOR-based representations express datetime values using integers to represent the number of seconds since the Unix epoch.', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('In order to maximize interoperability, representation specification authors SHOULD register their representation in the DID Specification Registries [DID-SPEC-REGISTRIES].', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe("A conforming producer MUST serialize all entries in the data model that do not have explicit processing rules for the representation being produced using only the representation's data type processing rules.", () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('A conforming producer MUST indicate which representation has been used for a DID document via a Media Type as described in § 7.1.2 DID Resolution Metadata.', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe("A conforming consumer MUST add all entries that do not have explicit processing rules for the representation being consumed to the data model using only the representation's data type processing rules.", () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('A conforming consumer MUST determine the representation of a DID document using the associated Media Type as described in § 7.1.2 DID Resolution Metadata.', () => {
      test.todo('positive');
      test.todo('negative');
    });
  });
});
