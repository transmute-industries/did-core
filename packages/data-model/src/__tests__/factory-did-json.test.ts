import { factory, representations } from '..';

import { json as fixtures } from '../__fixtures__';

it('can produce application/did+json', async () => {
  const didDocument = factory.build({
    entries: {
      ...fixtures.example1,
    },
  });
  didDocument.addRepresentation(representations);
  const serialization = didDocument.produce('application/did+json');
  expect(serialization).toEqual(JSON.stringify(fixtures.example1, null, 2));
});

it('can consume application/did+json', async () => {
  let didDocument = factory.build();
  didDocument.addRepresentation(representations);
  didDocument.consume(
    'application/did+json',
    Buffer.from(JSON.stringify(fixtures.example1, null, 2))
  );
  expect((didDocument.entries as any).id).toBe('did:example:123');
});
