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
  expect(JSON.parse(serialization.toString())).toEqual(jsonFixtures.example1);
});

it('can consume application/did+json', async () => {
  let didDocument = factory.build();
  didDocument.addRepresentation({ 'application/did+json': representation });
  await didDocument.consume(
    'application/did+json',
    Buffer.from(JSON.stringify(jsonFixtures.example1))
  );
  expect((didDocument.entries as any).id).toBe('did:example:123');
});

it('cannot produce application/did+json with __proto__ entries', async () => {
  const didDocument = factory
    .build()
    .addRepresentation({ 'application/did+json': representation });
  try {
    await didDocument.consume(
      'application/did+json',
      Buffer.from(
        `{"id": "did:example:123","__proto__":{"isAdmin": "Let json be json!"}}`
      )
    );
  } catch (e) {
    expect(e.message).toBe('Unsafe json detected.');
  }
});

it('chaining example', async () => {
  const didDocument = await factory
    .build()
    .addRepresentation({ 'application/did+json': representation })
    .consume('application/did+json', Buffer.from(`{"id": "did:example:123"}`));
  // be careful what you asssign!
  const serialization = await didDocument
    .assign({ alg: 'none' })
    .produce('application/did+json');
  expect(JSON.parse(serialization.toString())).toEqual({
    id: 'did:example:123',
    alg: 'none',
  });
});
