import {
  AbstractDataModel,
  DidDocumentProducer,
  DidDocumentConsumer,
} from '@did-core/data-model';

import { check } from 'jsonld-checker';

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
  if (asJson['@context'] === undefined) {
    throw new Error('"@context" is required and not present.');
  }
  if (asJson['id'] === undefined) {
    throw new Error('"id" is required and not present.');
  }
  const { error } = await check(asJson);
  let details = error?.details.replace('[null]', '').replace(',null', '');
  if (details && details !== '') {
    details = JSON.parse(details);
    throw new Error('"@context" does not define: ' + details);
  }
};

export const produceJsonLd: DidDocumentProducer = async function(
  entries: AbstractDataModel<object>
): Promise<Buffer> {
  const representation = Buffer.from(JSON.stringify(entries));
  await assertValidRepresentation(representation);
  return representation;
};

export const consumeJsonLd: DidDocumentConsumer = async function(
  representation: Buffer
): Promise<AbstractDataModel<object>> {
  await assertValidRepresentation(representation);
  const entries = JSON.parse(representation.toString());
  return entries;
};

export const representation = {
  contentType: 'application/did+ld+json',
  produce: produceJsonLd,
  consume: consumeJsonLd,
};
