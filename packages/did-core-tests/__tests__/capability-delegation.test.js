const Ajv = require('ajv');
const {
  assertVerificationRelationship,
} = require('../test-helpers/assertVerificationRelationship');

const ajv = new Ajv({ strict: false });

ajv.addSchema(require('../json-schemas/didUrl.json'));
ajv.addSchema(require('../json-schemas/Jwk.json'));
ajv.addSchema(require('../json-schemas/verificationMethod.json'));
ajv.addSchema(require('../json-schemas/capabilityDelegation.json'));

describe('Capability Delegation', () => {
  describe('5.3.5', () => {
    describe(`The capabilityDelegation property is OPTIONAL. 
    If present, the associated value MUST be 
    an ordered set of one or more verification methods. 
    Each verification method MAY be embedded or referenced.`, () => {
      assertVerificationRelationship('capabilityDelegation', ajv);
    });
  });
});
