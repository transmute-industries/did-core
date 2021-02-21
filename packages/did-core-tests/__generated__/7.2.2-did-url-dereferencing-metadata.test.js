describe('DID URL Dereferencing Metadata', () => {
  describe('7.2.2', () => {
    describe('The Media Type of the returned contentStream SHOULD be expressed using this property if dereferencing is successful. The Media Type value MUST be expressed as an ASCII string.', () => {
      test.todo('positive');
      test.todo('negative');
    });
    describe('The error code from the dereferencing process. This property is REQUIRED when there is an error in the dereferencing process. The value of this property MUST be a single keyword expressed as an ASCII string. The possible property values of this field SHOULD be registered in the DID Specification Registries [DID-SPEC-REGISTRIES]. This specification defines the following common error values:                                               invalidDidUrl                                                   The DID URL supplied to the DID URL dereferencing function does not conform to valid syntax. (See § 3.2 DID URL Syntax.)                                                   notFound                                                   The DID URL dereferencer was unable to find the contentStream resulting from this dereferencing request.', () => {
      test.todo('positive');
      test.todo('negative');
    });
  });
});
