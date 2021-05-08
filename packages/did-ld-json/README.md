# @did-core/did-ld-json

```
npm i @did-core/did-ld-json --save
```

## Usage

```ts
import { factory, DidDocument } from '@did-core/data-model';
import { representation } from '@did-core/did-ld-json';

const didDocument: DidDocument = factory.build({
  entries: {
    '@context': [
      'https://www.w3.org/ns/did/v1',
      'https://ns.did.ai/suites/jws-2020/v1',
    ],
    id: 'did:example:123',
    verificationMethod: [
      {
        id: '#z6MktjiTVhTt2NWEYUjbqrkRVLWqJgpw85jFRmHcGrYFD7jM',
        type: 'JsonWebKey2020',
        controller: 'did:example:123',
        publicKeyJwk: {
          kty: 'OKP',
          crv: 'Ed25519',
          x: '1DrGM08j2Agl8F14fN69RexmNON2Yczq3hp47wMRilA',
        },
      },
    ],
  },
});

const representation: Buffer = await didDocument
  .addRepresentation({ 'application/did+ld+json': representation })
  .produce('application/did+ld+json');
```
