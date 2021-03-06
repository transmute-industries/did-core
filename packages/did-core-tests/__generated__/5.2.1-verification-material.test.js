describe('Verification Material', () => {
  describe('5.2.1', () => {
    describe('The publicKeyBase58 property is OPTIONAL. This feature is non-normative. If present, the value MUST be a string representation of a [BASE58] encoded public key.', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe("The publicKeyJwk property is OPTIONAL. If present, the value MUST be a map representing a JSON Web Key that conforms to [RFC7517]. The map MUST NOT contain 'd', or any other members of the private information class as described in Registration Template. It is RECOMMENDED that verification methods that use JWKs [RFC7517] to represent their public keys use the value of kid as their fragment identifier. It is RECOMMENDED that JWK kid values are set to the public key fingerprint [RFC7638]. See the first key in Example 13 for an example of a public key with a compound key identifier.", () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('A verification method MUST NOT contain multiple verification material properties for the same material. For example, expressing key material in a verification method using both publicKeyJwk and publicKeyBase58 at the same time is prohibited.', () => {
      test.todo('positive');
      test.todo('negative');
    });
  });
});
