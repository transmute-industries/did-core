import yaml from 'js-yaml';

import {
  AbstractDataModel,
  DidDocumentProducer,
  DidDocumentConsumer,
} from '../types';

export const produceYaml: DidDocumentProducer = function(
  entries: AbstractDataModel<object>
): string {
  // TODO: security checks for sanitization
  return yaml.dump(entries);
};

export const consumeYaml: DidDocumentConsumer = function(
  representation: Buffer
): AbstractDataModel<object> {
  // TODO: security checks for sanitization
  return yaml.load(representation.toString());
};

export const representation = {
  contentType: 'application/did+yaml',
  produce: produceYaml,
  consume: consumeYaml,
};
