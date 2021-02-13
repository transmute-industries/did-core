import { representation as json } from './did-json';
import { representation as yaml } from './did-yaml';
import { representation as cbor } from './did-cbor';

export const representations = {
  'application/did+json': json,
  'application/did+cbor': cbor,
  'application/did+yaml': yaml,
};
