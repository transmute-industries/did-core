const fs = require('fs');
const path = require('path');
import { jsonConverter } from './jsonConverter';
it('can generate a JSON DID Document and convert it to other formats', async () => {
  const didDocumentJson = {
    id: 'did:example:123',
    verificationMethod: [
      {
        id: '#key-0',
        type: 'JsonWebKey2020',
        controller: 'did:example:123',
        publicKeyJwk: {
          kty: 'EC',
          crv: 'P-256',
          x: 'iCsUt8CcUFRnm-5TAVLw6XxmTmUXwVLY_300nxguIPM',
          y: '9ZfGdDmvXvTXpBpbKGw_Rt86whDN9y3TMfgtJAOlV38',
        },
      },
    ],
  };
  let formats = await jsonConverter(didDocumentJson);

  let allFormats: any = {
    json: JSON.stringify(didDocumentJson, null, 2),
    ...formats,
  };

  Object.keys(allFormats).forEach((format: string) => {
    fs.writeFileSync(
      path.resolve(
        __dirname,
        `../../../did-representation-examples/json/didDocument.${format}`
      ),
      allFormats[format]
    );
  });

  const didDocumentJsonLd = {
    '@context': ['https://www.w3.org/ns/did/v1'],
    ...didDocumentJson,
  };

  formats = await jsonConverter(didDocumentJsonLd);

  allFormats = {
    json: JSON.stringify(didDocumentJsonLd, null, 2),
    jsonld: JSON.stringify(didDocumentJsonLd, null, 2),
    ...formats,
  };

  Object.keys(allFormats).forEach((format: string) => {
    fs.writeFileSync(
      path.resolve(
        __dirname,
        `../../../did-representation-examples/jsonld/didDocument.${format}`
      ),
      allFormats[format]
    );
  });
});
