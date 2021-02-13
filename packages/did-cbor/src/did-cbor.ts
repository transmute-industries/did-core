import {
  AbstractDataModel,
  DidDocumentProducer,
  DidDocumentConsumer,
} from '@did-core/data-model';

import cbor from 'cbor';

export const produceCbor: DidDocumentProducer = async function (
  entries: AbstractDataModel<object>
): Promise<Buffer> {
  // TODO: security checks for sanitization
  return cbor.encode(entries);
};

export const consumeCbor: DidDocumentConsumer = async function (
  representation: Buffer
): Promise<AbstractDataModel<object>> {
  // TODO: security checks for sanitization
  return cbor.decode(representation);
};

export const representation = {
  contentType: 'application/did+cbor',
  produce: produceCbor,
  consume: consumeCbor,
};
