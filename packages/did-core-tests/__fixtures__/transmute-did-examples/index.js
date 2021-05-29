/* eslint-disable global-require */
const examples = {
  did_key_p256_json: require('./did-key-p256-json.json'),
  did_key_p256_jsonld: require('./did-key-p256-jsonld.json'),

  did_key_p384_json: require('./did-key-p384-json.json'),
  did_key_p384_jsonld: require('./did-key-p384-jsonld.json'),

  did_key_p521_json: require('./did-key-p521-json.json'),
  did_key_p521_jsonld: require('./did-key-p521-jsonld.json'),

  did_key_ed25519_json: require('./did-key-ed25519-json.json'),
  did_key_ed25519_jsonld: require('./did-key-ed25519-jsonld.json'),

  did_key_x25519_json: require('./did-key-x25519-json.json'),
  did_key_x25519_jsonld: require('./did-key-x25519-jsonld.json'),

  did_key_secp256k1_json: require('./did-key-secp256k1-json.json'),
  did_key_secp256k1_jsonld: require('./did-key-secp256k1-jsonld.json'),

  did_key_bls12381_json: require('./did-key-bls12381-json.json'),
  did_key_bls12381_jsonld: require('./did-key-bls12381-jsonld.json'),

  did_web: require('./did-web-json.json'),
  did_elem: require('./did-elem-json.json'),
  did_photon: require('./did-photon-json.json'),
};

module.exports = examples;
