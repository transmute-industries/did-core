import { factory } from './factory';

import { json } from './__fixtures__';

const { example1, example2 } = json;

it('can build a didDocument with defaults', async () => {
  const didDocument = factory.build({
    entries: {
      ...example1,
    },
  });
  expect(Object.keys(didDocument.entries).length).toBe(1);
});

it('can add entries to a didDocument', async () => {
  const didDocument = factory.build();
  didDocument.assign(example1);
  expect(Object.keys(didDocument.entries).length).toBe(1);
  didDocument.assign(example2);
  expect(Object.keys(didDocument.entries).length).toBe(3);
});

it('throws when asked to produce an unsupported representation', async () => {
  expect.assertions(1);
  const didDocument = factory.build({
    entries: {
      ...example1,
    },
  });
  try {
    didDocument.produce('application/did+json');
  } catch (e) {
    expect(e.message).toBe(
      'Cannot produce unsupported content type: application/did+json'
    );
  }
});

it('throws when asked to consume an unsupported representation', async () => {
  expect.assertions(1);
  const didDocument = factory.build({
    entries: {
      ...example1,
    },
  });
  try {
    didDocument.consume(
      'application/did+json',
      Buffer.from(`{"id": "did:example:123"}`)
    );
  } catch (e) {
    expect(e.message).toBe(
      'Cannot consume unsupported content type: application/did+json'
    );
  }
});
