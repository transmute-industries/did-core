
describe("6.2.2", ()=>{
  describe("If media type information is available to a conforming consumer and the media type value is application/did+json, then the data structure being consumed is a DID document, and the root element MUST be a JSON Object where all members of the object are entries of the DID document. A conforming consumer for a JSON representation that is consuming a DID document with a root element that is not a JSON Object MUST report an error.", ()=>{
    test.todo("positive")
    test.todo("negative")
  })
})

describe("6.3.2", ()=>{
  describe("Conforming consumers that process a JSON-LD representation SHOULD drop all terms from a DID document that are not defined via the @context.", ()=>{
    test.todo("positive")
    test.todo("negative")
  })
})

describe("6.4.2", ()=>{
  describe("If media type information is available to a conforming consumer and the media type value is application/did+json, then the data structure being consumed is a DID document, and the root element MUST be a CBOR map (major type 5) where all members of the object are entries of the DID document. A conforming consumer for a CBOR representation that is consuming a DID document with a root element that is not a CBOR map (major type 5) MUST report an error.", ()=>{
    test.todo("positive")
    test.todo("negative")
  })
})