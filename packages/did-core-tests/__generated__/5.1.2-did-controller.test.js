describe('DID Controller', () => {
  describe('5.1.2', () => {
    describe('The controller property is OPTIONAL. If present, the value MUST be a string or an ordered set of strings that conform to the rules in § 3.1 DID Syntax. The corresponding DID document(s) SHOULD contain verification relationships that explicitly permit the use of certain verification methods for specific purposes.', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('When a controller property is present in a DID document, its value expresses one or more DIDs. Any verification methods contained in the DID documents for those DIDs SHOULD be accepted as authoritative, such that proofs that satisfy those verification methods are to be considered equivalent to proofs provided by the DID subject.', () => {
      test.todo('positive');
      test.todo('negative');
    });
  });
});
