import { factory, representations } from '..';

import {
  json as jsonFixtures,
  jsonld as jsonldFixtures,
} from '../__fixtures__';

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

it('cannot produce application/did+ld+json from application/did+json', async () => {
  expect.assertions(1);
  const didDocument = factory.build({
    entries: {
      ...jsonFixtures.example1,
    },
  });
  didDocument.addRepresentation(representations);
  try {
    didDocument.produce('application/did+ld+json');
  } catch (e) {
    expect(e.message).toBe('@context is required and not present.');
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
  const serialization = didDocument.produce('application/did+ld+json');
  // not the map order does not matter
  expect(JSON.parse(serialization.toString())).toEqual(jsonldFixtures.example1);
});
