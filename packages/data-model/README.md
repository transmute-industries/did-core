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

## License

```
Copyright 2020 Transmute Industries Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
