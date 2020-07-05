import {
  Context,
  IDidOptions,
  VerificationMethodCollectionType,
} from './types';

import { VerificationMethod } from './VerificationMethod';
import { tags } from './cbor';
const cbor = require('cbor');
const canonicalize = require('canonicalize');

const getVerificationMethods = (options: VerificationMethodCollectionType) => {
  let _options: any = [];
  options.forEach((opt: any) => {
    if (typeof opt === 'string') {
      _options.push('#' + opt.split('#')[1]);
    }
    if (typeof opt === 'object') {
      _options.push(VerificationMethod.from(opt));
    }
  });
  return _options;
};

const verificationMethodCollectionToJson = (
  vmc: VerificationMethodCollectionType
) => {
  return vmc.map((vm: any) => {
    if (vm instanceof VerificationMethod) {
      return JSON.parse(vm.toJSON());
    }
    return vm;
  });
};

const verificationRelationships = [
  'publicKey',
  'authentication',
  'assertionMethod',
  'capabilityDelegation',
  'capabilityInvocation',
  'keyAgreement',
];

const getDidOptions = (options: any): IDidOptions => {
  if (Buffer.isBuffer(options)) {
    const tagged = cbor.decode(options, {
      tags: {
        [tags.VerificationMethod]: (val: any) => {
          // check val to make sure it's an Array as expected, etc.
          return JSON.parse(
            new VerificationMethod(VerificationMethod.fromArray(val)).toJSON()
          );
        },
      },
    });
    tagged.value['@context'] = enhanceContext(
      tagged.value['@context'],
      tagged.value.id
    );

    return tagged.value;
  }

  return options;
};

const enhanceContext = (context: any, did: string) => {
  const _context: any = [];
  if (typeof context === 'string') {
    _context.push(context);
  }
  let flagUsingRelative = false;
  if (Array.isArray(context)) {
    context.forEach((c: any) => {
      if (typeof c === 'string') {
        _context.push(c);
      }
      if (typeof c === 'object' && c['@base'] && c['@base'] === did) {
        flagUsingRelative = true;
      }
    });
    if (!flagUsingRelative) {
      _context.push({
        '@base': did,
      });
    }
  }
  return _context;
};

export class DidDocument {
  public '@context': Context;
  public id: string;
  public publicKey?: VerificationMethodCollectionType;
  public authentication?: VerificationMethodCollectionType;
  public assertionMethod?: VerificationMethodCollectionType;
  public capabilityDelegation?: VerificationMethodCollectionType;
  public capabilityInvocation?: VerificationMethodCollectionType;
  public keyAgreement?: VerificationMethodCollectionType;

  static from(options: any) {
    return new DidDocument(getDidOptions(options));
  }

  constructor(options: any) {
    this['@context'] = enhanceContext(options['@context'], options.id);
    this.id = options.id;
    let ddo: any = this;
    verificationRelationships.forEach((vr: string) => {
      if (options[vr] && options[vr].length) {
        ddo[vr] = getVerificationMethods(options[vr]);
      }
    });
  }

  encodeCBOR(encoder: any) {
    const tagged = new cbor.Tagged(tags.DidDocument, {
      ...this,
    });
    return encoder.pushAny(tagged);
  }

  toCBOR() {
    const encoded = cbor.encode(this);
    return encoded;
  }

  toJSON() {
    const data: any = {
      '@context': this['@context'],
      id: this.id,
    };

    let ddo: any = this;
    verificationRelationships.forEach((vr: string) => {
      if (ddo[vr] && ddo[vr].length) {
        data[vr] = verificationMethodCollectionToJson(ddo[vr]);
      }
    });

    return canonicalize({
      ...data,
    });
  }
}
