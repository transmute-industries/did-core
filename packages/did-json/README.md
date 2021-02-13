# @did-core/did-json

```
npm i @did-core/did-json --save
```

## Usage

```ts
import { factory, DidDocument } from '@did-core/data-model';
import { representation } from '@did-core/did-json';

const didDocument: DidDocument = factory.build({
  entries: {
    // @context is required for use with jsonld verifiable credentials
    // but technically optional here
    '@context': 'https://www.w3.org/ns/did/v1',
    id: 'did:example:123',
  },
});

const representation: Buffer = await didDocument
  .addRepresentation({ 'application/did+json': representation })
  .produce('application/did+json');
```
