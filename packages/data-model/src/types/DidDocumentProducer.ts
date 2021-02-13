import { AbstractDataModel } from './AbstractDataModel';

export type DidDocumentProducer = (
  entries: AbstractDataModel<object>
) => Promise<Buffer>;
