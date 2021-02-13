# Decentralized Identifiers

TypeScript implementations of [did core](https://www.w3.org/TR/did-core/) and related utilities.

These modules are agnostic to [DID Methods](https://www.w3.org/TR/did-core/#dfn-did-methods).

## Usage

```ts
import { factory } from '@did-core/data-model';
import { representation } from '@did-core/did-ld-json';

// An instance of the DID Core Abstract Data Model
const didDocument = factory.build({
  entries: {
    id: 'did:example:123',
  },
});

// Add support for production and consumption for the JSON-LD Representation
didDocument.addRepresentation({ 'application/did+ld+json': representation });

// JSON-LD requires `@context` and that all terms be defined by it.
try {
  await didDocument.produce('application/did+ld+json');
} catch (e) {
  expect(e.message).toBe('@context is required and not present.');
}

// Add `@context` to the Abstract Data Model
didDocument.assign({
  '@context': 'https://www.w3.org/ns/did/v1',
});

// Produce JSON-LD
const serialization = await didDocument.produce('application/did+ld+json');
expect(JSON.parse(serialization.toString())).toEqual({
  '@context': 'https://www.w3.org/ns/did/v1',
  id: 'did:example:123',
});

// What about unregistered properties?
const didDocument = factory
  .build({
    entries: {
      '@context': ['https://www.w3.org/ns/did/v1'],
      id: 'did:example:123',
      '🔥': '💩',
    },
  })
  .addRepresentation({ 'application/did+ld+json': representation });

// JSON-LD Production fails when `@context` does not define all properties
try {
  await didDocument.produce('application/did+ld+json');
} catch (e) {
  expect(e.message).toBe('@context does not define: 🔥');
}

// Add context so your DID Document works with the open world model of verifiable credentials...
didDocument.assign({
  '@context': [
    'https://www.w3.org/ns/did/v1',
    {
      '🔥': 'https://en.wikipedia.org/wiki/Open-world_assumption',
    },
  ],
});

// Produce JSON-LD that works with Verifiable Credentials
const serialization = await didDocument.produce('application/did+ld+json');
expect(JSON.parse(serialization.toString())).toEqual({
  '@context': [
    'https://www.w3.org/ns/did/v1',
    {
      '🔥': 'https://en.wikipedia.org/wiki/Open-world_assumption',
    },
  ],
  id: 'did:example:123',
  '🔥': '💩',
});
```
