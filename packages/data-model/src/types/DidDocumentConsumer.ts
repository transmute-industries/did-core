import { AbstractDataModel } from './AbstractDataModel';

export type DidDocumentConsumer = (
  representation: Buffer
) => AbstractDataModel<object>;
