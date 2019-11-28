const app = require('../app.js');
var request = require('supertest');
var expect = require("chai").expect;


describe('Test DB Integration ', () => {
  //Definición de test para integración de los resolvers definidos
  //con la integración de la BD.
  describe('Should pass if the resolvers integration is valid', () => {
    it('Valid expected query productByName', (done) => {
      const mutationPBN = {
        "query": "query productByName($name: String!) { productByName(name: $name){ name } }",
        "operationName": "productByName",
        "variables": "{ \"name\": \"Pechuga de pollo\" }"
      }
      request(app).post('/graphql').send(mutationPBN).end(function(err, res) { 
        expect(res.body.data.productByName[0].name).to.equal('Pechuga de pollo'); 
        done(); 
      })
    })

    it('Valid expected mutation modifyProductState', (done) => {
      const mutationMPS = {
        "query": "mutation modifyProductState($_id: String!, $state: String!) { modifyProductState(_id: $_id, state: $state){ success } }",
        "operationName": "modifyProductState",
        "variables": "{ \"_id\": \"5ddda274409f381160c8452b\", \"state\": \"Disponible\" }"
      }
      request(app).post('/graphql').send(mutationMPS).end(function(err, res) { 
        expect(res.body.data.modifyProductState.success).to.be.a('boolean'); 
        done(); 
      })
    })

    it('Valid expected mutation registerProduct', (done) => {
      const mutationRP = {
        "query": "mutation registerProduct($name: String!, $description: iDescription!, $state: String, $owner: String) { registerProduct(name: $name, description: $description, state: $state, owner: $owner){ success } }",
        "operationName": "registerProduct",
        "variables": "{ \"name\": \"Producto de test\", \"description\": {\"textDescription\": \"Producto de test\", \"price\": 5.0 , \"reducedPrice\": 4.0 , \"expiration\": \"Hoy\" }, \"state\": \"Testeado\", \"owner\": \"Tester\" }"
      }
      request(app).post('/graphql').send(mutationRP).end(function(err, res) { 
        expect(res.body.data.registerProduct.success).to.be.a('boolean'); 
        done(); 
      })
    })
    
  })
})