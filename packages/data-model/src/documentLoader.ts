const jsonld = require('jsonld');
const localOverrides: any = {
  'https://www.w3.org/ns/did/v1': require('./contexts/did-v1.json'),
};

const nodeDocumentLoader = jsonld.documentLoaders.node();
export const documentLoader = async (url: string) => {
  // console.log(url);
  const withoutFragment: string = url.split('#')[0];
  if (localOverrides[withoutFragment]) {
    return {
      contextUrl: null, // this is for a context via a link header
      document: localOverrides[withoutFragment], // this is the actual document that was loaded
      documentUrl: url, // this is the actual context URL after redirects
    };
  }
  return nodeDocumentLoader(url);
};
