var request = require('supertest')("http://localhost:3000");
var expect = require('chai').expect;
var assert = require("assert")

var token 

describe("Look up a specific post code", function () {

  before((done) => {
    request
      .post('/jwt')
      .expect(200)
      .send('name=' + 1234)
      .end(function (err, res) {
        token = res.body.token
        expect(res.body.token);  
        done();    
      });
  })

  it("test jwt", function (done) {
    request
      .post('/jwt/get')
      .expect(200)
      .send('token=' + token)
      .end(function (err, res) {
        expect(res.body.token);  
        assert.equal(1, res.body.success)
        done();    
      });
  })
});