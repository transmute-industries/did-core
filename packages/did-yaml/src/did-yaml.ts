import {
  AbstractDataModel,
  DidDocumentProducer,
  DidDocumentConsumer,
} from '@did-core/data-model';

import yaml from 'js-yaml';

export const produceYaml: DidDocumentProducer = async function(
  entries: AbstractDataModel<object>
): Promise<Buffer> {
  // TODO: security checks for sanitization
  return Buffer.from(yaml.dump(entries));
};

export const consumeYaml: DidDocumentConsumer = async function(
  representation: Buffer
): Promise<AbstractDataModel<object>> {
  // TODO: security checks for sanitization
  return yaml.load(representation.toString());
};

export const representation = {
  contentType: 'application/did+yaml',
  produce: produceYaml,
  consume: consumeYaml,
};
