const { factory } = require('@did-core/data-model');
const jsonld = require('@did-core/did-ld-json');
const json = require('@did-core/did-json');
const axios = require('axios');

const fs = require('fs');
const path = require('path');

const examples = require('../__fixtures__/transmute-did-examples');

jest.setTimeout(1 * 60 * 1000);

const documentLoader = async (iri) => {
  try {
    const { data } = await axios.get(iri, {
      headers: {
        accept: 'application/json',
      },
    });
    return {
      documentUrl: iri,
      document: data,
    };
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(`failed to dereference: ${iri}`);
  }
  throw new Error(`unsupported iri ${iri}`);
};

const methodImplementations = {};

const represtentationsByName = {
  'application/did+json': json.representation,
  'application/did+ld+json': jsonld.representation,
};

const supportedContentTypes = [
  'application/did+json',
  'application/did+ld+json',
];
describe('W3C DID Test Suite Transmute Implementations', () => {
  Object.values(examples).forEach((didDocument) => {
    test(didDocument.id, async () => {
      const method = didDocument.id.split(':')[1];
      if (!methodImplementations[`did:${method}`]) {
        methodImplementations[`did:${method}`] = {
          didMethod: `did:${method}`,
          implementation: 'https://github.com/transmute-industries/did-core',
          implementer: 'Transmute',
          supportedContentTypes,
          dids: [didDocument.id],
          didParameters: {},
        };
      }

      if (
        !methodImplementations[`did:${method}`].dids.includes(didDocument.id)
      ) {
        methodImplementations[`did:${method}`].dids.push(didDocument.id);
      }

      const didMethodFixture = methodImplementations[`did:${method}`];

      try {
        // eslint-disable-next-line no-restricted-syntax
        for (const contentType of supportedContentTypes) {
          if (
            didDocument.verificationMethod[0].type === 'JsonWebKey2020' &&
            contentType === 'application/did+ld+json'
          ) {
            // eslint-disable-next-line no-continue
            continue;
          }
          // eslint-disable-next-line no-await-in-loop
          const adm = await factory
            .build()
            .addRepresentation({
              [contentType]: represtentationsByName[contentType],
            })
            .consume(
              contentType,
              JSON.stringify({
                ...didDocument,
              }),
              documentLoader
            );

          // eslint-disable-next-line no-await-in-loop
          const didDocumentStream = await adm.produce(
            contentType,
            documentLoader
          );

          const didDocumentString = didDocumentStream.toString();
          const parsedDidDocumentString = JSON.parse(didDocumentString);

          const parsedDidDocumentStreamWithoutContext = JSON.parse(
            didDocumentString
          );
          delete parsedDidDocumentStreamWithoutContext['@context'];

          methodImplementations[`did:${method}`][didDocument.id] = {
            ...methodImplementations[`did:${method}`][didDocument.id],
          };

          // due to unfortunate choices made by W3C DID Core Editors, we must choose
          // a single ADM JSON representation for each
          // ADM - representation pair
          // this means that you will observe key types changes between the ADM and the representation
          // we choose to suppport JWK and did+json as the default for our implementations.
          if (didDocument.verificationMethod[0].type === 'JsonWebKey2020') {
            didMethodFixture[didDocument.id].didDocumentDataModel = {
              properties: parsedDidDocumentStreamWithoutContext,
            };
          }

          if (!didMethodFixture[didDocument.id][contentType]) {
            didMethodFixture[didDocument.id] = {
              ...didMethodFixture[didDocument.id],
              [contentType]: {
                didDocumentDataModel: {
                  representationSpecificEntries: {
                    '@context': parsedDidDocumentString['@context'],
                  },
                },
                representation: didDocumentString,
                didDocumentMetadata: {},
                didResolutionMetadata: {
                  contentType,
                },
              },
            };
          }
        }
        // after content type loop
        // did:web, did:elem, did:photon all produce did+json that is valid did+ld+json.
        // update the fixtures accordinging.
        if (!didMethodFixture[didDocument.id]['application/did+ld+json']) {
          didMethodFixture[didDocument.id][
            'application/did+ld+json'
          ] = JSON.parse(
            JSON.stringify(
              didMethodFixture[didDocument.id]['application/did+json']
            )
          );

          didMethodFixture[didDocument.id][
            'application/did+ld+json'
          ].didResolutionMetadata = {
            contentType: 'application/did+ld+json',
          };

          didMethodFixture[didDocument.id][
            'application/did+json'
          ].didResolutionMetadata = {
            contentType: 'application/did+json',
          };
        }
      } catch (e) {
        console.error(didDocument.id);
        console.error(e);
        throw e;
      }
    });
  });

  test('can write fixtures to disk', () => {
    Object.values(methodImplementations).forEach((didMethodFixture) => {
      fs.writeFileSync(
        path.resolve(
          __dirname,
          `../__fixtures__/w3c-did-testsuite/${didMethodFixture.didMethod.replace(
            ':',
            '-'
          )}-${didMethodFixture.implementer.toLowerCase()}.json`
        ),
        JSON.stringify(didMethodFixture, null, 2)
      );
    });
  });
});
