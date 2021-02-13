import {
  AbstractDataModel,
  DidDocumentProducer,
  DidDocumentConsumer,
} from '@did-core/data-model';

import { check } from 'jsonld-checker';

export const produceJson: DidDocumentProducer = async function(
  entries: AbstractDataModel<object>
): Promise<string> {
  if (!(entries as any)['@context']) {
    throw new Error('@context is required and not present.');
  }

  const banned = ['constructor', '__proto__'];
  const cleaner = (key: any, value: any) =>
    banned.includes(key) ? undefined : value;
  const serialization = JSON.parse(JSON.stringify(entries), cleaner);
  const { error } = await check(serialization);
  if (error?.details === '' || error?.details === '[null]') {
    return JSON.stringify(serialization, null, 2);
  }
  throw new Error(
    '@context does not define: ' +
      JSON.parse(error?.details.replace(',null', '') as string)
  );
};

export const consumeJson: DidDocumentConsumer = async function(
  representation: Buffer
): Promise<AbstractDataModel<object>> {
  const banned = ['constructor', '__proto__'];
  const cleaner = (key: any, value: any) =>
    banned.includes(key) ? undefined : value;
  const entries = JSON.parse(representation.toString(), cleaner);
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
