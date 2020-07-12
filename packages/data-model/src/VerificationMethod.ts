import { VerificationMethodOptions, VerificationMethodType } from './types';
const bs58 = require('bs58');
const canonicalize = require('canonicalize');

export class VerificationMethod {
  public id: string;
  public type: string;
  public controller: string;
  public publicKeyBuffer: Buffer;

  static from(_options: VerificationMethodType) {
    return new VerificationMethod(VerificationMethod._getVmOptions(_options));
  }

  private static _getVmOptions = (options: any): VerificationMethodOptions => {
    if (options.publicKeyBuffer) {
      return options;
    }
    if (options.publicKeyBase58) {
      return {
        ...options,
        publicKeyBuffer: bs58.decode(options.publicKeyBase58),
      };
    }

    throw new Error(
      'Unsupported VerificationMethodType.\n' + JSON.stringify(options, null, 2)
    );
  };

  constructor(options: VerificationMethodOptions) {
    this.id = '#' + options.id.split('#')[1];
    this.type = options.type;
    this.controller = options.controller;
    this.publicKeyBuffer = options.publicKeyBuffer;
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
