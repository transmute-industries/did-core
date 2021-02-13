import * as Factory from 'factory.ts';

import { AbstractDataModel, DidDocumentRepresentation } from './types';

export interface DidDocumentRepresentations {
  [contentType: string]: DidDocumentRepresentation;
}

export interface DidDocument {
  addRepresentation: (
    representations: DidDocumentRepresentations
  ) => DidDocument;
  representations: DidDocumentRepresentations;
  entries: AbstractDataModel<object>;
  assign: (entries: AbstractDataModel<object>) => DidDocument;
  produce: (contentType: string) => Promise<Buffer>;
  consume: (
    contentType: string,
    representation: Buffer
  ) => Promise<DidDocument>;
}

export const factoryDefaults: DidDocument = {
  representations: {},
  addRepresentation: function(
    representations: DidDocumentRepresentations
  ): DidDocument {
    this.representations = {
      ...this.representations,
      ...representations,
    };
    return this;
  },
  entries: {},
  assign: function(entries: AbstractDataModel<object>): DidDocument {
    this.entries = {
      ...this.entries,
      ...entries,
    };
    return this;
  },

  produce: async function(contentType: string): Promise<Buffer> {
    if (this.representations[contentType]) {
      return this.representations[contentType].produce(this.entries);
    }
    throw new Error('Cannot produce unsupported content type: ' + contentType);
  },

  consume: async function(
    contentType: string,
    representation: Buffer
  ): Promise<DidDocument> {
    if (this.representations[contentType]) {
      this.entries = await this.representations[contentType].consume(
        representation
      );
      return this;
    }
    throw new Error('Cannot consume unsupported content type: ' + contentType);
  },
};

export const factory = Factory.Sync.makeFactory<DidDocument>(factoryDefaults);
