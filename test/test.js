// test/test.js
var assert = require("assert")
describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
        console.log("XXXXXX :" + [1,2,3].indexOf(2))
      assert.equal(1, [1,2,3].indexOf(2));
    })
  })
})