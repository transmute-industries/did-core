import {
  AbstractDataModel,
  DidDocumentProducer,
  DidDocumentConsumer,
} from '@did-core/data-model';

import { constants, contexts } from '@transmute/did-context';

import { check } from 'jsonld-checker';

const banned = ['constructor', '__proto__'];

const cleaner = (key: any, value: any): void => {
  if (banned.includes(key)) {
    throw new Error('Unsafe json detected.');
  } else {
    return value;
  }
};

const defaultSupportedContexts: any = {
  // did core only defines relationships, not key types...
  [constants.DID_CONTEXT_V1_URL]: contexts.get(constants.DID_CONTEXT_V1_URL),
  // our kitchen sink context for common key types
  [constants.DID_CONTEXT_TRANSMUTE_V1_URL]: contexts.get(
    constants.DID_CONTEXT_TRANSMUTE_V1_URL
  ),
  // specific suite key types
  [constants.DID_CONTEXT_TRANSMUTE_BLS12381_2020_V1_URL]: contexts.get(
    constants.DID_CONTEXT_TRANSMUTE_BLS12381_2020_V1_URL
  ),
  [constants.DID_CONTEXT_TRANSMUTE_JWS_2020_V1_URL]: contexts.get(
    constants.DID_CONTEXT_TRANSMUTE_JWS_2020_V1_URL
  ),
  [constants.DID_CONTEXT_TRANSMUTE_ED25519_2018_V1_URL]: contexts.get(
    constants.DID_CONTEXT_TRANSMUTE_ED25519_2018_V1_URL
  ),
  [constants.DID_CONTEXT_TRANSMUTE_X25519_2018_V1_URL]: contexts.get(
    constants.DID_CONTEXT_TRANSMUTE_X25519_2018_V1_URL
  ),
};

const defaultDocumentLoader = async (
  iri: string
): Promise<{ documentUrl: string; document: any }> => {
  if (defaultSupportedContexts[iri]) {
    return {
      documentUrl: iri,
      document: defaultSupportedContexts[iri],
    };
  }

  console.error('Unsupported iri: ' + iri);
  throw new Error('Unsupported iri: ' + iri);
};

const assertValidRepresentation = async (
  representation: Buffer,
  documentLoader: (
    iri: string
  ) => Promise<{ documentUrl: string; document: any }>
): Promise<void> => {
  const asJson: any = JSON.parse(representation.toString(), cleaner);
  if (asJson['@context'] === undefined) {
    throw new Error('"@context" is required and not present.');
  }
  if (asJson['id'] === undefined) {
    throw new Error('"id" is required and not present.');
  }
  const { error } = await check(asJson, documentLoader);
  let details = error?.details.replace('[null]', '').replace(',null', '');
  if (details && details !== '') {
    details = JSON.parse(details);
    throw new Error('"@context" does not define: ' + details);
  }
};

export const produceJsonLd: DidDocumentProducer = async function(
  entries: AbstractDataModel<object>,
  documentLoader = defaultDocumentLoader
): Promise<Buffer> {
  const representation = Buffer.from(JSON.stringify(entries));
  await assertValidRepresentation(representation, documentLoader);
  return representation;
};

export const consumeJsonLd: DidDocumentConsumer = async function(
  representation: Buffer,
  documentLoader = defaultDocumentLoader
): Promise<AbstractDataModel<object>> {
  await assertValidRepresentation(representation, documentLoader);
  const entries = JSON.parse(representation.toString());
  return entries;
};

export const representation = {
  contentType: 'application/did+ld+json',
  produce: produceJsonLd,
  consume: consumeJsonLd,
};
