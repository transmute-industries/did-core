# @did-core/data-model

```
npm i @did-core/data-model --save
```

## Representations

This module supports the [did core](https://www.w3.org/TR/did-core/) data model.

All representations rely on a [simple registration table for terms](./did-core-v1.csv).

### JSON-LD

Recommend using this representation, since it has the most active implementations and support, and supports decentralized semantic disambiguity and cannonicalization.

### CBOR

Recommend against using this representation since support for it is blocked pending updates to [cbor-tags](https://www.iana.org/assignments/cbor-tags/cbor-tags.xhtml).

### JSON

Recommend against using this represenation since its equivalent to JSON-LD with a deleted `@context`, and it relies on centralized registries which are often slow to update, and hostile to innovation. See [jose](https://www.iana.org/assignments/jose/jose.xhtml).
