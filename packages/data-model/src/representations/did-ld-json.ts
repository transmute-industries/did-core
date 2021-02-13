import {
  AbstractDataModel,
  DidDocumentProducer,
  DidDocumentConsumer,
} from '../types';

export const produceJson: DidDocumentProducer = function(
  entries: AbstractDataModel<object>
): string {
  // TODO: security checks for sanitization
  return JSON.stringify(entries, null, 2);
};

export const consumeJson: DidDocumentConsumer = function(
  representation: Buffer
): AbstractDataModel<object> {
  // TODO: security checks for sanitization
  return JSON.parse(representation.toString());
};

export const representation = {
  contentType: 'application/did+json',
  produce: produceJson,
  consume: consumeJson,
};
