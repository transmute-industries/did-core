var YAML = require('json2yaml');
var js2xmlparser = require('js2xmlparser');
var formatxml = require('xml-formatter');
var cbor = require('cbor');
const jsonexport = require('jsonexport');

export const jsonConverter = async (data: any) => {
  const yml = YAML.stringify(data);
  let xml;
  try {
    xml = formatxml(js2xmlparser.parse('didDocument', data));
  } catch (e) {
    xml = e.message;
  }

  const cbor2 = cbor.encode(data);
  const csv = await jsonexport(data);
  return {
    yml,
    xml,
    cbor: cbor2,
    csv,
  };
};
