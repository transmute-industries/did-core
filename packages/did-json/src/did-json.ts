import {
  AbstractDataModel,
  DidDocumentProducer,
  DidDocumentConsumer,
} from '@did-core/data-model';

export const produceJson: DidDocumentProducer = async function(
  entries: AbstractDataModel<object>
): Promise<string> {
  const banned = ['constructor', '__proto__'];
  const cleaner = (key: any, value: any) =>
    banned.includes(key) ? undefined : value;
  return JSON.stringify(JSON.parse(JSON.stringify(entries), cleaner), null, 2);
};

export const consumeJson: DidDocumentConsumer = async function(
  representation: Buffer
): Promise<AbstractDataModel<object>> {
  const banned = ['constructor', '__proto__'];
  const cleaner = (key: any, value: any) =>
    banned.includes(key) ? undefined : value;
  const entries = JSON.parse(representation.toString(), cleaner);
  return entries;
};

export const representation = {
  contentType: 'application/did+json',
  produce: produceJson,
  consume: consumeJson,
};
