import {
  AbstractDataModel,
  DidDocumentProducer,
  DidDocumentConsumer,
} from '@did-core/data-model';

const banned = ['constructor', '__proto__'];

const cleaner = (key: any, value: any): void => {
  if (banned.includes(key)) {
    throw new Error('Unsafe json detected.');
  } else {
    return value;
  }
};

const assertValidRepresentation = async (
  representation: Buffer
): Promise<void> => {
  const asJson: any = JSON.parse(representation.toString(), cleaner);
  if (asJson['id'] === undefined) {
    throw new Error('"id" is required and not present.');
  }
};

export const produceJson: DidDocumentProducer = async function(
  entries: AbstractDataModel<object>
): Promise<Buffer> {
  await assertValidRepresentation(Buffer.from(JSON.stringify(entries)));
  return Buffer.from(JSON.stringify(entries));
};

export const consumeJson: DidDocumentConsumer = async function(
  representation: Buffer
): Promise<AbstractDataModel<object>> {
  await assertValidRepresentation(representation);
  const entries = JSON.parse(representation.toString());
  return entries;
};

export const representation = {
  contentType: 'application/did+json',
  produce: produceJson,
  consume: consumeJson,
};
