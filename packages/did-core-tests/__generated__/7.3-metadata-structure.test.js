
describe("Metadata Structure", ()=>{
  
  describe("7.3", ()=>{
    describe("Input and output metadata is often involved during the DID Resolution, DID URL dereferencing, and other DID-related processes. The structure used to communicate this metadata MUST be a map of properties. Each property name MUST be a string. Each property value MUST be a string, map, list, ordered set, boolean, or null. The values within any complex data structures such as maps and lists MUST be one of these data types as well. All metadata property definitions registered in the DID Specification Registries [DID-SPEC-REGISTRIES] MUST define the value type, including any additional formats or restrictions to that value (for example, a string formatted as a date or as a decimal integer). It is RECOMMENDED that property definitions use strings for values. The entire metadata structure MUST be serializable in a conforming representation.", ()=>{
       test.todo('positive');
       test.todo('negative');
     })
  })

})