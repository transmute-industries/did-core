# @did-core/data-model

```
npm i @did-core/data-model --save
```

## Usage

```ts
// const { DidDocument } = require('@did-core/data-model');
import { DidDocument } from '@did-core/data-model';
const data = '...JSON-LD/CBOR/JSON';
const didDoc = DidDocument.from(data);
const didDocAsCbor: Buffer = didDoc.toCBOR();
const didDocAsJson: string = didDoc.toJSON(); // always includes an `@context`...
// because "pure json" representation provides no value over JSON-LD (which is JSON)...
// if you want "pure json" this is how you get it...
// const didDocObject = JSON.parse(didDoc.toJSON());
// delete didDocObject['@context'];
// const pureJson = JSON.stringify(didDocObject);
// NOTE that JSON.stringify does not produce cannonical representations of JSON...
```

#### Compact Representations

Internally uses relative URIs, JSON-LD, and Buffers consistently.

```
DidDocument {
    id: 'did:key:z6MkrmcgCJzwoej6r2BUi9LweSQSj7BBr4EocW3oZsuZPoD1',
    '@context': [
    'https://w3id.org/did/v0.11',
    {
        '@base': 'did:key:z6MkrmcgCJzwoej6r2BUi9LweSQSj7BBr4EocW3oZsuZPoD1'
    }
    ],
    publicKey: [
    VerificationMethod {
        id: '#z6MkrmcgCJzwoej6r2BUi9LweSQSj7BBr4EocW3oZsuZPoD1',
        type: 'Ed25519VerificationKey2018',
        controller: 'did:key:z6MkrmcgCJzwoej6r2BUi9LweSQSj7BBr4EocW3oZsuZPoD1',
        publicKeyBuffer: <Buffer b7 00 06 7d 92 bc af ed 2e 51 9b 93 38 91 72 58 20 13 00 de 8e f3 36 17 82 52 b0 07 04 38 5b a0>
    }
    ],
    authentication: [ '#z6MkrmcgCJzwoej6r2BUi9LweSQSj7BBr4EocW3oZsuZPoD1' ],
    assertionMethod: [ '#z6MkrmcgCJzwoej6r2BUi9LweSQSj7BBr4EocW3oZsuZPoD1' ],
    capabilityDelegation: [ '#z6MkrmcgCJzwoej6r2BUi9LweSQSj7BBr4EocW3oZsuZPoD1' ],
    capabilityInvocation: [ '#z6MkrmcgCJzwoej6r2BUi9LweSQSj7BBr4EocW3oZsuZPoD1' ],
    keyAgreement: [
    VerificationMethod {
        id: '#zCCmmqxU1hJoToBAGrz42Usx6WFpZdX3zUr5cQmjqEMeGZ',
        type: 'did:X25519KeyAgreementKey2019',
        controller: 'did:key:z6MkrmcgCJzwoej6r2BUi9LweSQSj7BBr4EocW3oZsuZPoD1',
        publicKeyBuffer: <Buffer b6 69 13 7f 1d 9e c1 4a 6b 14 66 fb 0a 54 cd 2e ec 77 43 ec 67 c1 81 c2 ee 66 d0 26 79 09 0e 2a>
    }
    ]
}
```

## Representations

This module supports the [did core](https://www.w3.org/TR/did-core/) data model.

All representations rely on a [simple registration table for terms](./did-core-v1.csv)... but beware that CBOR tags are not actually registered.

### JSON-LD

Recommend using this representation, since it has the best documentation, and supports decentralized semantic disambiguity and cannonicalization.

### CBOR

Recommend against using this representation since support for it is blocked pending updates to [cbor-tags](https://www.iana.org/assignments/cbor-tags/cbor-tags.xhtml).

### JSON

Recommend against using this represenation since its equivalent to JSON-LD with a deleted `@context`, and it relies on centralized registries which are often slow to update, and can be hostile to innovation...

- [rfc8785](https://tools.ietf.org/html/rfc8785)
- [jose](https://www.iana.org/assignments/jose/jose.xhtml).
