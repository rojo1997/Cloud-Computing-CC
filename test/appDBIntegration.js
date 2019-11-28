const app = require('../app.js');
var request = require('supertest');
var expect = require("chai").expect;

describe('Test DB Integration ', () => {

  describe('Should pass if the mutations are valid', () => {
    it('Valid expected query productByName', (done) => {
      const mutation = {
        "query": "query productByName($name: String!) { productByName(name: $name){ name } }",
        "operationName": "productByName",
        "variables": "{ \"name\": \"Pechuga de pollo\" }"
      }
      request(app).post('/graphql').send(mutation).end(function(err, res) { 
        expect(res.body.data.productByName[0].name).to.equal('Pechuga de pollo'); 
        done(); 
      })
    })

    it('Valid expected query modifyProductState', (done) => {
      const mutation = {
        "query": "mutation modifyProductState($_id: String!, $state: String!) { modifyProductState(_id: $_id, state: $state){ success } }",
        "operationName": "modifyProductState",
        "variables": "{ \"_id\": \"5ddda274409f381160c8452b\", \"state\": \"Disponible\" }"
      }
      request(app).post('/graphql').send(mutation).end(function(err, res) { 
        expect(res.body.data.modifyProductState.success).to.be.a('boolean'); 
        done(); 
      })
    })
    
  })
})