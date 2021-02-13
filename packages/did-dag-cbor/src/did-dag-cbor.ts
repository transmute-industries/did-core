import {
  AbstractDataModel,
  DidDocumentProducer,
  DidDocumentConsumer,
} from '@did-core/data-model';

import * as ipld from 'ipld-dag-cbor';

export const produceDagCbor: DidDocumentProducer = async function(
  entries: AbstractDataModel<object>
): Promise<Buffer> {
  // TODO: security checks for sanitization
  return ipld.util.serialize(entries);
};

export const consumeDagCbor: DidDocumentConsumer = async function(
  representation: Buffer
): Promise<AbstractDataModel<object>> {
  // TODO: security checks for sanitization
  return ipld.util.deserialize(representation);
};

export const representation = {
  contentType: 'application/did+dag+cbor',
  produce: produceDagCbor,
  consume: consumeDagCbor,
};
