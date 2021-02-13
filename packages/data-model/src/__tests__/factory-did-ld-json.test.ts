import { factory, representations } from '..';

import { jsonld as jsonldFixtures } from '../__fixtures__';

it('can produce application/did+ld+json', async () => {
  const didDocument = factory.build({
    entries: {
      ...jsonldFixtures.example1,
    },
  });
  didDocument.addRepresentation(representations);
  const serialization = didDocument.produce('application/did+ld+json');
  expect(serialization).toEqual(
    JSON.stringify(jsonldFixtures.example1, null, 2)
  );
});

it('can consume application/did+ld+json', async () => {
  let didDocument = factory.build();
  didDocument.addRepresentation(representations);
  didDocument.consume(
    'application/did+ld+json',
    Buffer.from(JSON.stringify(jsonldFixtures.example1, null, 2))
  );
  expect((didDocument.entries as any).id).toBe('did:example:123');
});
