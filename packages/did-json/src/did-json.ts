import {
  AbstractDataModel,
  DidDocumentProducer,
  DidDocumentConsumer,
} from '@did-core/data-model';

export const produceJson: DidDocumentProducer = async function(
  entries: AbstractDataModel<object>
): Promise<string> {
  // TODO: security checks for sanitization
  return JSON.stringify(entries, null, 2);
};

export const consumeJson: DidDocumentConsumer = async function(
  representation: Buffer
): Promise<AbstractDataModel<object>> {
  // TODO: security checks for sanitization
  return JSON.parse(representation.toString());
};

export const representation = {
  contentType: 'application/did+json',
  produce: produceJson,
  consume: consumeJson,
};
