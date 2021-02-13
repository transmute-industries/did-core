import cbor from 'cbor';
import {
  AbstractDataModel,
  DidDocumentProducer,
  DidDocumentConsumer,
} from '../types';

export const produceCbor: DidDocumentProducer = function(
  entries: AbstractDataModel<object>
): Buffer {
  // TODO: security checks for sanitization
  return cbor.encode(entries);
};

export const consumeCbor: DidDocumentConsumer = function(
  representation: Buffer
): AbstractDataModel<object> {
  // TODO: security checks for sanitization
  return cbor.decode(representation);
};

export const representation = {
  contentType: 'application/did+cbor',
  produce: produceCbor,
  consume: consumeCbor,
};
