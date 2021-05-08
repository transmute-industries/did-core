describe('Services', () => {
  describe('5.4', () => {
    describe('The service property is OPTIONAL. If present, the associated value MUST be an ordered set of services, where each service is described by a map. Each service map MUST contain id, type, and serviceEndpoint properties. Each service extension MAY include additional properties and MAY further restrict the properties associated with the extension.', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('The value of the id property MUST be a URI conforming to [RFC3986]. A conforming producer MUST NOT produce multiple service entries with the same id. A conforming consumer MUST produce an error if it detects multiple service entries with the same id.', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('The value of the type property MUST be a string or an ordered set of strings.  In order to maximize interoperability, the verification method type and  its associated properties SHOULD be registered in the DID Specification Registries [DID-SPEC-REGISTRIES].', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('The value of the serviceEndpoint property MUST be a string, a map, or an ordered set composed of one or more strings and/or maps. All string values MUST be valid URIs conforming to [RFC3986] and normalized according to the Normalization and Comparison rules in RFC3986 and to any normalization rules in its applicable URI scheme specification.', () => {
      test.todo('positive');
      test.todo('negative');
    });
  });
});
