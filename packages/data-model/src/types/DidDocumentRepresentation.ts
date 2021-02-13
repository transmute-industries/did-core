import { DidDocumentProducer } from './DidDocumentProducer';
import { DidDocumentConsumer } from './DidDocumentConsumer';

export interface DidDocumentRepresentation {
  contentType: string;
  produce: DidDocumentProducer;
  consume: DidDocumentConsumer;
}
