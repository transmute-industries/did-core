const didUrlPattern = /did:(?<method>[a-z0-9]+):(?<idchar>[a-zA-Z0-9:]+)(?<pathname>((\/.[^#?]+)?))(?<query>((\?.[^#\n?]+)?))(?<fragment>((#.*)?))/;

it('should match', () => {
  let sample = 'did:example:123';
  let matches = sample.match(didUrlPattern);
  expect(matches.groups.method).toBe('example');
  expect(matches.groups.idchar).toBe('123');

  sample = 'did:example:123/pathname';
  matches = sample.match(didUrlPattern);
  expect(matches.groups.pathname).toBe('/pathname');

  sample = 'did:example:123?query';
  matches = sample.match(didUrlPattern);
  expect(matches.groups.query).toBe('?query');

  sample = 'did:example:123#key';
  matches = sample.match(didUrlPattern);
  expect(matches.groups.fragment).toBe('#key');

  sample = 'did:example:123/pathname?query#key';
  matches = sample.match(didUrlPattern);
  expect(matches.groups.pathname).toBe('/pathname');
  expect(matches.groups.query).toBe('?query');
  expect(matches.groups.fragment).toBe('#key');
});

it('should NOT match', () => {
  let sample = 'did:Example:123';
  let matches = sample.match(didUrlPattern);
  expect(matches).toBe(null);
  sample = 'did::example:123';
  matches = sample.match(didUrlPattern);
  expect(matches).toBe(null);
});
