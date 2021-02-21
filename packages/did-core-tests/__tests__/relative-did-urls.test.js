describe('Relative DID URLs', () => {
  describe('3.2.2', () => {
    describe(`When resolving a relative DID URL reference, 
    the algorithm specified in RFC3986 Section 5: Reference Resolution 
    MUST be used. The base URI value is the DID that is associated 
    with the DID subject, see §5.1.1 DID Subject. 
    The scheme is did. The authority is a combination 
    of <method-name>:<method-specific-id>, and the path, query, 
    and fragment values are those defined in §Path, §Query, 
    and §Fragment, respectively.`, () => {
      const didUrl = 'did:example:123/pathname?query=bar#fragment';

      test('absolute did urls can be made from relative ones', () => {
        const didDocument = {
          id: 'did:example:123',
          service: [{ id: '/pathname?query=bar#fragment' }],
        };
        const absoluteUrl = didDocument.id + didDocument.service[0].id;
        expect(absoluteUrl).toBe(didUrl);
      });
      test('absolute did urls are urls', () => {
        const url = new URL(didUrl);
        expect(url.pathname).toBe('example:123/pathname');
        expect(url.search).toBe('?query=bar');
        expect(url.hash).toBe('#fragment');
      });
    });
  });
});
