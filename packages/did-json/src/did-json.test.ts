import { factory } from '@did-core/data-model';

import { representation } from './did-json';

import { json as jsonFixtures } from './__fixtures__';

it('can produce application/did+json', async () => {
  const didDocument = factory.build({
    entries: {
      ...jsonFixtures.example1,
    },
  });
  didDocument.addRepresentation({ 'application/did+json': representation });
  const serialization = await didDocument.produce('application/did+json');
  expect(serialization).toEqual(JSON.stringify(jsonFixtures.example1, null, 2));
});

it('can consume application/did+json', async () => {
  let didDocument = factory.build();
  didDocument.addRepresentation({ 'application/did+json': representation });
  await didDocument.consume(
    'application/did+json',
    Buffer.from(JSON.stringify(jsonFixtures.example1, null, 2))
  );
  expect((didDocument.entries as any).id).toBe('did:example:123');
});