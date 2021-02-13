import {
  AbstractDataModel,
  DidDocumentProducer,
  DidDocumentConsumer,
} from '@did-core/data-model';

import { check } from 'jsonld-checker';

export const produceJson: DidDocumentProducer = async function (
  entries: AbstractDataModel<object>
): Promise<string> {
  if (!(entries as any)['@context']) {
    throw new Error('@context is required and not present.');
  }
  // TODO: security checks for sanitization
  const serialization = JSON.parse(JSON.stringify(entries));
  const { error } = await check(serialization);
  if (error?.details === '' || error?.details === '[null]') {
    return JSON.stringify(serialization, null, 2);
  }
  throw new Error(
    '@context does not define: ' +
      JSON.parse(error?.details.replace(',null', '') as string)
  );
};

export const consumeJson: DidDocumentConsumer = async function (
  representation: Buffer
): Promise<AbstractDataModel<object>> {
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
