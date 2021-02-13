# @did-core/data-model

```
npm i @did-core/data-model --save
```

## Usage

```ts
import { factory, DidDocument } from '@did-core/data-model';
import { representation } from '@did-core/did-ld-json';

const didDocument: DidDocument = factory.build({
  entries: {
    id: 'did:example:123',
  },
});
```

## For use with Verifiable Credentials

```ts
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
const didDocument = factory.build({
  entries: {
    '@context': ['https://www.w3.org/ns/did/v1'],
    id: 'did:example:123',
    '🔥': '💩',
  },
});
didDocument.addRepresentation({ 'application/did+ld+json': representation });

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

## What about other representations?

### application/did+dag+cbor

```ts
import { factory } from '@did-core/data-model';
import { representation } from '@did-core/did-dag-cbor';

const serialization = await factory
  .build({ entries: { id: 'did:example:123' } })
  .addRepresentation({ 'application/did+dag+cbor': representation })
  .produce('application/did+dag+cbor');

expect(serialization.toString('hex')).toBe(
  'a16269646f6469643a6578616d706c653a313233'
);
```

### application/did+json

```ts
import { factory } from '@did-core/data-model';
import { representation } from '@did-core/did-json';

const didDocument = await factory
  .build()
  .addRepresentation({ 'application/did+json': representation })
  .consume(
    'application/did+json',
    // be careful what you consume!
    Buffer.from(
      `{"id": "did:example:123","__proto__":{"isAdmin": "Let json be json!"}}`
    )
  );
const serialization = await didDocument
  // be careful what you assign!
  .assign({ 'this is safe': 'right guys...?' })
  .produce('application/did+json');

// JSON only requires `id` be present...
expect(JSON.parse(serialization.toString())).toEqual({
  id: 'did:example:123',
  'this is safe': 'right guys...?',
});

// prototype pollution will succeeed if you are not careful...
// expect((didDocument.entries as any).isAdmin).toBe('Let json be json!');
```
