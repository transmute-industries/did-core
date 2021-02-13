# @did-core/did-yaml

```
npm i @did-core/did-yaml --save
```

## Usage

```ts
import { factory, DidDocument } from '@did-core/data-model';
import { representation } from '@did-core/did-yaml';

const didDocument: DidDocument = factory.build({
  entries: {
    '@context': 'https://www.w3.org/ns/did/v1',
    id: 'did:example:123',
  },
});

const representation: Buffer = await didDocument
  .addRepresentation({ 'application/did+yaml': representation })
  .produce('application/did+yaml');
```
