import {
  AbstractDataModel,
  DidDocumentProducer,
  DidDocumentConsumer,
} from '../types';

export const produceJson: DidDocumentProducer = function(
  entries: AbstractDataModel<object>
): string {
  if (!(entries as any)['@context']) {
    throw new Error('@context is required and not present.');
  }
  // TODO: security checks for sanitization
  return JSON.stringify(entries, null, 2);
};

export const consumeJson: DidDocumentConsumer = function(
  representation: Buffer
): AbstractDataModel<object> {
  // TODO: security checks for sanitization
  const entries = JSON.parse(representation.toString());
  if (!entries['@context']) {
    throw new Error('@context is required and not present.');
  }
  return entries;
};

export const representation = {
  contentType: 'application/did+ld+json',
  produce: produceJson,
  consume: consumeJson,
};
