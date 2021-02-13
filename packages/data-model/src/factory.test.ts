import { representations } from './representations';

import { factory } from './factory';

const example1 = {
  id: 'did:example:123',
};

const example2 = {
  verificationMethod: [
    {
      id: '#signing-key',
      type: 'Ed25519VerificationKey2018',
      publicKeyBase58: '...',
    },
  ],
  service: [
    {
      id: '#foo',
      type: 'BarService',
      serviceEndpoint: 'https://example.com/789',
    },
  ],
};

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

it('can produce application/did+json', async () => {
  const didDocument = factory.build({
    entries: {
      ...example1,
    },
  });
  didDocument.addRepresentation(representations);
  const serialization = didDocument.produce('application/did+json');
  expect(serialization).toBe(`{
  "id": "did:example:123"
}`);
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

it('can consume application/did+json', async () => {
  let didDocument = factory.build();
  didDocument.addRepresentation(representations);
  didDocument.consume(
    'application/did+json',
    Buffer.from(`{"id": "did:example:123"}`)
  );
  expect((didDocument.entries as any).id).toBe('did:example:123');
});
