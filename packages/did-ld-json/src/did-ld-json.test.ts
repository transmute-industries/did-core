import { factory } from '@did-core/data-model';

import { representation } from './did-ld-json';

import { json as jsonFixtures, jsonld as jsonldFixtures } from './__fixtures__';

const representations = { 'application/did+ld+json': representation };

it('can produce application/did+ld+json', async () => {
  const didDocument = factory.build({
    entries: {
      ...jsonldFixtures.example1,
    },
  });
  didDocument.addRepresentation(representations);
  const serialization = await didDocument.produce('application/did+ld+json');
  expect(JSON.parse(serialization.toString())).toEqual(jsonldFixtures.example1);
});

it('can consume application/did+ld+json', async () => {
  let didDocument = factory.build();
  didDocument.addRepresentation(representations);
  await didDocument.consume(
    'application/did+ld+json',
    Buffer.from(JSON.stringify(jsonldFixtures.example1, null, 2))
  );
  expect((didDocument.entries as any).id).toBe('did:example:123');
});

it('cannot produce application/did+ld+json from application/did+json', async () => {
  expect.assertions(1);
  const didDocument = factory.build({
    entries: {
      ...jsonFixtures.example1,
    },
  });
  didDocument.addRepresentation(representations);
  try {
    await didDocument.produce('application/did+ld+json');
  } catch (e) {
    expect(e.message).toBe('"@context" is required and not present.');
  }
});

it('can produce application/did+ld+json from application/did+json after adding @context', async () => {
  const didDocument = factory.build({
    entries: {
      ...jsonFixtures.example1,
    },
  });
  didDocument.addRepresentation(representations);
  didDocument.assign({
    '@context': 'https://www.w3.org/ns/did/v1',
  });
  const serialization = await didDocument.produce('application/did+ld+json');
  // not the map order does not matter
  expect(JSON.parse(serialization.toString())).toEqual(jsonldFixtures.example1);
});

it('cannot produce application/did+ld+json from entries not defined in the context', async () => {
  expect.assertions(1);
  const didDocument = factory.build({
    entries: {
      ...jsonldFixtures.example1,
    },
  });
  didDocument.addRepresentation(representations);
  didDocument.assign({
    '🔥': '💩',
  });
  try {
    await didDocument.produce('application/did+ld+json');
  } catch (e) {
    expect(e.message).toBe('"@context" does not define: 🔥');
  }
});

it('can produce application/did+ld+json from entries defined in context', async () => {
  expect.assertions(1);
  const didDocument = factory.build({
    entries: {
      ...jsonldFixtures.example1,
    },
  });
  didDocument.addRepresentation(representations);
  didDocument.assign({
    '🔥': '💩',
  });
  didDocument.assign({
    '@context': [
      'https://www.w3.org/ns/did/v1',
      {
        '🔥': 'https://en.wikipedia.org/wiki/Open-world_assumption',
      },
    ],
  });
  const serialization = await didDocument.produce('application/did+ld+json');
  expect(JSON.parse(serialization.toString())).toEqual(jsonldFixtures.example3);
});
