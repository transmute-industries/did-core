import { representation as json } from './did-json';
import { representation as yaml } from './did-yaml';
import { representation as cbor } from './did-cbor';
import { representation as jsonld } from './did-ld-json';

export const representations = {
  'application/did+json': json,
  'application/did+ld+json': jsonld,
  'application/did+cbor': cbor,
  'application/did+yaml': yaml,
};
