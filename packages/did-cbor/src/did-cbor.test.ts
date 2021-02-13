import { factory } from '@did-core/data-model';
import { json as jsonFixtures, cbor as cborFixtures } from './__fixtures__';
import { representation } from './did-cbor';
const representations = { 'application/did+cbor': representation };

it('can produce application/did+cbor', async () => {
  const serialization = await factory
    .build({
      entries: {
        ...jsonFixtures.example1,
      },
    })
    .addRepresentation(representations)
    .produce('application/did+cbor');
  expect(serialization).toEqual(cborFixtures.example1);
});

it('can consume application/did+cbor', async () => {
  let didDocument = await factory
    .build()
    .addRepresentation(representations)
    .consume('application/did+cbor', cborFixtures.example1);
  expect((didDocument.entries as any).id).toBe('did:example:123');
});

it('can produce example2 application/did+cbor', async () => {
  const serialization = await factory
    .build({
      entries: {
        ...jsonFixtures.example2,
      },
    })
    .addRepresentation(representations)
    .produce('application/did+cbor');
  expect(serialization).toEqual(cborFixtures.example2);
});
