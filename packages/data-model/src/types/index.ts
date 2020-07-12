export type Context = string | Array<string | any>;

export type Ed25519VerificationKey2018 = {
  id: string;
  type: 'Ed25519VerificationKey2018';
  controller: string;
  publicKeyBase58: string;
};

export type X25519KeyAgreementKey2019 = {
  id: string;
  type: 'X25519KeyAgreementKey2019';
  controller: string;
  publicKeyBase58: string;
};

export type VerificationMethodOptions = {
  id: string;
  type: string;
  controller: string;
  publicKeyBuffer: Buffer;
};

export type VerificationMethodType =
  | Ed25519VerificationKey2018
  | X25519KeyAgreementKey2019
  | VerificationMethodOptions;

export type VerificationMethodCollectionType = Array<
  VerificationMethodType | string
>;

export interface IDidOptions {
  '@context'?: string;
  id: string;
  publicKey?: VerificationMethodCollectionType;
  authentication?: VerificationMethodCollectionType;
  assertionMethod?: VerificationMethodCollectionType;
  capabilityDelegation?: VerificationMethodCollectionType;
  capabilityInvocation?: VerificationMethodCollectionType;
  keyAgreement?: VerificationMethodCollectionType;
}
