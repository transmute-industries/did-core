import { factory } from '@did-core/data-model';
import { json as jsonFixtures, cbor as cborFixtures } from './__fixtures__';
import { representation } from './did-cbor';
const representations = { 'application/did+cbor': representation };

it('can produce application/did+cbor', async () => {
  const didDocument = factory.build({
    entries: {
      ...jsonFixtures.example1,
    },
  });
  didDocument.addRepresentation(representations);
  const serialization = await didDocument.produce('application/did+cbor');
  expect(serialization).toEqual(cborFixtures.example1);
});

it('can consume application/did+cbor', async () => {
  let didDocument = factory.build();
  didDocument.addRepresentation(representations);
  await didDocument.consume('application/did+cbor', cborFixtures.example1);
  expect((didDocument.entries as any).id).toBe('did:example:123');
});

it('can produce example2 application/did+cbor', async () => {
  const didDocument = factory.build({
    entries: {
      ...jsonFixtures.example2,
    },
  });
  didDocument.addRepresentation(representations);
  const serialization = await didDocument.produce('application/did+cbor');
  expect(serialization).toEqual(cborFixtures.example2);
});
