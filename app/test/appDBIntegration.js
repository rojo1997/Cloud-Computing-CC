//IMPORTANTE: Importamos el módulo app para poder testearlo
//con el módulo 'supertest'
const app = require('../app.js');
var request = require('supertest');
var expect = require("chai").expect;

//Definición de test para integración de los resolvers definidos
  //con la BD.
describe('Test DB Integration ', () => {
  
  describe('Should pass if the resolvers integration is valid', () => {
    it('Valid expected query productByName', (done) => {
      //Debido a que no tenemos múltiples endpoints como tal, sino
      //que todas las peticiones se procesan desde un único punto,
      //para poder realizar el test de cada una de las funcionalidades
      //que en un servicio REST se corresponderían con las diversas rutas,
      //deberemos ejecutar el comando POST sobre el endpoint de graphql
      //definido, y mandar las peticiones como parámetros.
      //Para que funcione, la definición de dichos parámetros tendrá
      //que presentar la siguiente estructura, donde indicamos definición 
      //de la consulta, el nombre de ésta, y los valores para cada una de 
      //las variables en el caso de que sea necesario, tal como se muestra
      //a continuación:
      const mutationPBN = {
        "query": "query productByName($name: String!) { productByName(name: $name){ name } }",
        "operationName": "productByName",
        "variables": "{ \"name\": \"Pechuga de pollo\" }"
      }
      //Testeamos el resolver ejecutando un POST al endpoint definido para graphql
      //en el módulo app, que por convención suele ser /graphql o /graphiql,
      //y pasamos como parámetro la mutación a testear
      request(app).post('/graphql').send(mutationPBN).end(function(err, res) { 
        //Comprobamos la respuesta con 'expect' de chai
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