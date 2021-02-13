# Decentralized Identifiers

TypeScript implementations of [did core](https://www.w3.org/TR/did-core/) and related utilities.

These modules are agnostic to [DID Methods](https://www.w3.org/TR/did-core/#dfn-did-methods).

## Usage with Verifiable Credentials

```ts
import { factory, DidDocument } from '@did-core/data-model';
import { representation } from '@did-core/did-ld-json';

const didDocument: DidDocument = factory.build({
  entries: {
    '@context': 'https://www.w3.org/ns/did/v1',
    id: 'did:example:123',
  },
});

const representation: string = await didDocument
  .addRepresentation({ 'application/did+ld+json': representation })
  .produce('application/did+ld+json');
```

## Usage with IPLD

```ts
import { factory, DidDocument } from '@did-core/data-model';
import { representation } from '@did-core/did-dag-cbor';

const didDocument: DidDocument = factory.build({
  entries: {
    // @context is required for use with jsonld verifiable credentials
    // but technically optional here
    '@context': 'https://www.w3.org/ns/did/v1',
    id: 'did:example:123',
  },
});

const representation: Buffer = await didDocument
  .addRepresentation({ 'application/did+dag+cbor': representation })
  .produce('application/did+dag+cbor');
```

## Usage with JOSE

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

const representation: string = await didDocument
  .addRepresentation({ 'application/did+json': representation })
  .produce('application/did+json');
```
