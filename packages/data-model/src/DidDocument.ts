import { Context, VerificationMethodCollectionType } from './types';

import { VerificationMethod } from './VerificationMethod';
import { CborLdDocument } from './CborLdDocument';
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

export class DidDocument extends CborLdDocument {
  public '@context': Context;
  public id: string;
  public publicKey?: VerificationMethodCollectionType;
  public authentication?: VerificationMethodCollectionType;
  public assertionMethod?: VerificationMethodCollectionType;
  public capabilityDelegation?: VerificationMethodCollectionType;
  public capabilityInvocation?: VerificationMethodCollectionType;
  public keyAgreement?: VerificationMethodCollectionType;

  static from(options: any) {
    return new DidDocument({
      ...options,
      '@context': enhanceContext(options['@context'], options.id),
    });
  }

  static async fromCBOR(data: Buffer, type: string = 'CBOR') {
    const { document } = await CborLdDocument.fromCBOR(data, type);
    return new DidDocument(document);
  }

  static _prettifyDDO(options: any) {
    const ddo: any = {};
    ddo['@context'] = enhanceContext(options['@context'], options.id);
    ddo.id = options.id;

    verificationRelationships.forEach((vr: string) => {
      if (options[vr] && options[vr].length) {
        ddo[vr] = options[vr];
      }
    });
    return ddo;
  }

  constructor(options: any) {
    super({
      ...options,
      '@context': enhanceContext(options['@context'], options.id),
    });
    this.id = this.document.id;
    this['@context'] = this.document['@context'];
    verificationRelationships.forEach((vr: string) => {
      if (options[vr] && options[vr].length) {
        (this as any)[vr] = getVerificationMethods(options[vr]);
      }
    });
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
      '@context': enhanceContext(data['@context'], data.id),
    });
  }
}
