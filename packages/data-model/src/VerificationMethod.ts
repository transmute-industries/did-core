import { VerificationMethodOptions, VerificationMethodType } from './types';
import { tags } from './cbor';
const bs58 = require('bs58');
const canonicalize = require('canonicalize');
const cbor = require('cbor');

export class VerificationMethod {
  public id: string;
  public type: string;
  public controller: string;
  public publicKeyBuffer: Buffer;

  static from(_options: VerificationMethodType) {
    return new VerificationMethod(VerificationMethod._getVmOptions(_options));
  }

  static decodeOptionsFromCbor = (data: Buffer) => {
    const tagged = cbor.decode(data);
    return VerificationMethod.fromArray(tagged.value);
  };

  static fromArray = (data: Array<any>) => {
    const [id, type, controller, publicKeyBuffer] = data;
    return { id, type, controller, publicKeyBuffer };
  };

  private static _getVmOptions = (
    options: VerificationMethodType
  ): VerificationMethodOptions => {
    if (Buffer.isBuffer(options)) {
      return VerificationMethod.decodeOptionsFromCbor(options);
    }
    if (options.publicKeyBase58) {
      return {
        ...options,
        publicKeyBuffer: bs58.decode(options.publicKeyBase58),
      };
    }
    throw new Error('Unsupported VerificationMethodType.');
  };

  constructor(options: VerificationMethodOptions) {
    this.id = '#' + options.id.split('#')[1];
    this.type = options.type;
    this.controller = options.controller;
    this.publicKeyBuffer = options.publicKeyBuffer;
  }

  encodeCBOR(encoder: any) {
    const tagged = new cbor.Tagged(tags.VerificationMethod, [
      this.id,
      this.type,
      this.controller,
      this.publicKeyBuffer,
    ]);
    return encoder.pushAny(tagged);
  }

  toCBOR() {
    const encoded = cbor.encode(this);
    return encoded;
  }

  toJSON(bufferEncoding: string = 'base58') {
    let data = { ...this };
    switch (bufferEncoding) {
      case 'base58': {
        data = {
          ...data,
          publicKeyBase58: bs58.encode(data.publicKeyBuffer),
        };
        break;
      }
      default: {
        throw new Error('Unsupported bufferEncoding: ' + bufferEncoding);
      }
    }
    delete data.publicKeyBuffer;
    return canonicalize({
      ...data,
    });
  }
}
