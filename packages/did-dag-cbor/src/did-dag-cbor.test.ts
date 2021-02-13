import { factory } from '@did-core/data-model';

import { json as jsonFixtures, dagCbor as cborFixtures } from './__fixtures__';
import { representation } from './did-dag-cbor';
const representations = { 'application/did+dag+cbor': representation };

it('can produce application/did+cbor', async () => {
  const didDocument = factory.build({
    entries: {
      ...jsonFixtures.example1,
    },
  });
  didDocument.addRepresentation(representations);
  const serialization = await didDocument.produce('application/did+dag+cbor');
  expect(serialization).toEqual(cborFixtures.example1);
});

it('can consume application/did+dag+cbor', async () => {
  let didDocument = factory.build();
  didDocument.addRepresentation(representations);
  await didDocument.consume('application/did+dag+cbor', cborFixtures.example1);
  expect((didDocument.entries as any).id).toBe('did:example:123');
});

it('can produce example2 application/did+dag+cbor', async () => {
  const didDocument = factory.build({
    entries: {
      ...jsonFixtures.example2,
    },
  });
  didDocument.addRepresentation(representations);
  const serialization = await didDocument.produce('application/did+dag+cbor');
  expect(serialization).toEqual(cborFixtures.example2);
});
