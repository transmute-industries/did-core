import { factory } from '@did-core/data-model';

import { representation } from './did-yaml';
import { json as jsonFixtures, yaml as yamlFixtures } from './__fixtures__';

it('can produce application/did+yaml', async () => {
  const didDocument = factory.build({
    entries: {
      ...jsonFixtures.example1,
    },
  });
  didDocument.addRepresentation({ 'application/did+yaml': representation });
  const serialization = await didDocument.produce('application/did+yaml');
  expect(serialization.toString()).toEqual(yamlFixtures.example0);
});

it('can consume application/did+yaml', async () => {
  let didDocument = factory.build();
  didDocument.addRepresentation({ 'application/did+yaml': representation });
  await didDocument.consume(
    'application/did+yaml',
    Buffer.from(yamlFixtures.example1)
  );
  expect((didDocument.entries as any).id).toBe('did:example:123');
});

it('can produce example2 application/did+yaml', async () => {
  const didDocument = factory.build({
    entries: {
      ...jsonFixtures.example2,
    },
  });
  didDocument.addRepresentation({ 'application/did+yaml': representation });
  const serialization = await didDocument.produce('application/did+yaml');
  expect(serialization.toString()).toEqual(yamlFixtures.example2);
});
