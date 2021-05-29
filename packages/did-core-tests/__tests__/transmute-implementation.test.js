const { factory } = require('@did-core/data-model');
const jsonld = require('@did-core/did-ld-json');
const axios = require('axios');

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

describe('Transmute Implementation Examples', () => {
  Object.values(examples).forEach((didDocument) => {
    test(didDocument.id, async () => {
      try {
        const adm = await factory
          .build()
          .addRepresentation({
            'application/did+ld+json': jsonld.representation,
          })
          .consume(
            'application/did+ld+json',
            JSON.stringify({
              ...didDocument,
            }),
            documentLoader
          );

        const didDocumentStream = await adm.produce(
          'application/did+ld+json',
          documentLoader
        );
        expect(JSON.parse(didDocumentStream.toString())).toEqual(didDocument);
      } catch (e) {
        console.error(didDocument.id);
        console.error(e);
        throw e;
      }
    });
  });
});
