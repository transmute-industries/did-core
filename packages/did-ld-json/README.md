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
      'https://ns.did.ai/transmute/v1',
      // this context defines common key types
    ],
    id: 'did:example:123',
  },
});

const representation: Buffer = await didDocument
  .addRepresentation({ 'application/did+ld+json': representation })
  .produce('application/did+ld+json');
```
