// const jsonld = require('jsonld');
const fetch = require('node-fetch');

const uriToJson = async (uri: string) => {
  return fetch(uri).then((res: any) => res.json());
};
const tagStart = 430000000;

export const contextToCborTable = async (contextUri: string) => {
  const json = await uriToJson(contextUri);
  const keys = Object.keys(json['@context']);
  const values = Object.values(json['@context']);
  const uriPrefixes: any = {};
  const terms: any = {};
  keys.forEach((k: any, index: any) => {
    const v: any = values[index];
    if (typeof v === 'string' && v.indexOf('http') === 0) {
      uriPrefixes[k] = v;
      return;
    }
    if (typeof v === 'string' && v.indexOf(':') !== -1) {
      const prefix = v.split(':')[0];
      if (uriPrefixes[prefix]) {
        const fullUri = uriPrefixes[prefix] + v.split(':')[1];
        terms[index] = {
          term: k,
          definition: fullUri,
        };
      }
    }
    if (typeof v === 'object') {
      const prefix = v['@id'].split(':')[0];
      if (uriPrefixes[prefix]) {
        const fullUri = uriPrefixes[prefix] + v['@id'].split(':')[1];
        terms[index] = {
          term: k,
          definition: fullUri,
        };
      }
    }
    if (terms[index]) {
      terms[index].tag = tagStart + index;
    }
  });

  return {
    context: contextUri,
    table: Object.values(terms),
  };
};
