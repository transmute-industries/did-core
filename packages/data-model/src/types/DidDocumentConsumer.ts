import { AbstractDataModel } from './AbstractDataModel';

export type DidDocumentConsumer = (
  representation: Buffer
) => Promise<AbstractDataModel<object>>;
