import {
  AbstractDataModel,
  DidDocumentProducer,
  DidDocumentConsumer,
} from '@did-core/data-model';

import { constants, contexts } from '@transmute/did-context';

import { check } from 'jsonld-checker';

const banned = ['constructor', '__proto__'];

import bbsV1 from './contexts/bls12381-2020-v1.json';
import jwsV1 from './contexts/jws-2020-v1.json';
import ed25519V1 from '././contexts/ed25519-2018-v1.json';
import x25519V1 from './contexts/x25519-2018-v1.json';

const cleaner = (key: any, value: any): void => {
  if (banned.includes(key)) {
    throw new Error('Unsafe json detected.');
  } else {
    return value;
  }
};

const defaultDocumentLoader = async (
  iri: string
): Promise<{ documentUrl: string; document: any }> => {
  if (iri === constants.DID_CONTEXT_V1_URL) {
    return {
      documentUrl: iri,
      document: contexts.get(constants.DID_CONTEXT_V1_URL),
    };
  }
  if (iri === constants.DID_CONTEXT_TRANSMUTE_V1_URL) {
    return {
      documentUrl: constants.DID_CONTEXT_TRANSMUTE_V1_URL,
      document: contexts.get(constants.DID_CONTEXT_TRANSMUTE_V1_URL),
    };
  }

  if (iri === 'https://ns.did.ai/suites/bls12381-2020/v1') {
    return {
      documentUrl: 'https://ns.did.ai/suites/bls12381-2020/v1',
      document: bbsV1,
    };
  }

  if (iri === 'https://ns.did.ai/suites/jws-2020/v1') {
    return {
      documentUrl: 'https://ns.did.ai/suites/jws-2020/v1',
      document: jwsV1,
    };
  }

  if (iri === 'https://ns.did.ai/suites/ed25519-2018/v1') {
    return {
      documentUrl: 'https://ns.did.ai/suites/ed25519-2018/v1',
      document: ed25519V1,
    };
  }

  if (iri === 'https://ns.did.ai/suites/x25519-2018/v1') {
    return {
      documentUrl: 'https://ns.did.ai/suites/x25519-2018/v1',
      document: x25519V1,
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
