import { representation as json } from './did-json';
import { representation as yaml } from './did-yaml';

export const representations = {
  'application/did+json': json,
  'application/did+yaml': yaml,
};
