import * as fixtures from './__fixtures__';
import { VerificationMethod } from './VerificationMethod';

it('toJSON', async () => {
  const vm = VerificationMethod.from(fixtures.didDocs.didKey0.publicKey[0]);
  const d1 = vm.toJSON();
  expect(JSON.parse(d1)).toEqual(fixtures.didDocs.didKey1.publicKey[0]);
});

it('toCBOR', async () => {
  const vm = VerificationMethod.from(fixtures.didDocs.didKey0.publicKey[0]);
  const cb = vm.toCBOR();
  const vm2 = VerificationMethod.from(cb);
  expect(vm2).toEqual(vm);
});
