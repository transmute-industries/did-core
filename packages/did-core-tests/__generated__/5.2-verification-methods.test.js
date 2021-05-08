
describe("Verification Methods", ()=>{
  
  describe("5.2", ()=>{
    describe("The verificationMethod property is OPTIONAL. If present, the value MUST be an ordered set of verification methods, where each verification method is expressed using a map. The verification method map MUST include the id, type, controller, and specific verification material properties that are determined by the value of type and are defined in § 5.2.1 Verification Material. A verification method MAY include additional properties. Verification methods SHOULD be registered in the DID Specification Registries [DID-SPEC-REGISTRIES].", ()=>{
       test.todo('positive');
       test.todo('negative');
     })
describe("The value of the id property for a verification method MUST be a string that conforms to the rules in Section § 3.2 DID URL Syntax.", ()=>{
       test.todo('positive');
       test.todo('negative');
     })
describe("The value of the type property MUST be exactly one verification method type. In order to maximize global interoperability, the verification method type SHOULD be registered in the DID Specification Registries [DID-SPEC-REGISTRIES].", ()=>{
       test.todo('positive');
       test.todo('negative');
     })
describe("The value of the controller property MUST be a string that conforms to the rules in Section § 3.1 DID Syntax.", ()=>{
       test.todo('positive');
       test.todo('negative');
     })
  })

})