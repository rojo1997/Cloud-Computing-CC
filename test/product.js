const EasyGraphQLTester = require('easygraphql-tester');
const ProductSchema = require('../graphql/types/Product/index');
const ProductResolver = require('../graphql/resolvers/Product/index');
var expect = require("chai").expect;

//Definición de tests para queries
describe('Test my queries', () => {
  let tester

  before(() => {
    //Antes de todo, se ejecutará la inicialización del tester
    //a partir del módulo easygraphql-tester, al que deberemos de 
    //pasarle como argumentos la definición correcta de nuestros
    //tipos de schemas y resolvers asociados.
    tester = new EasyGraphQLTester(ProductSchema,ProductResolver)
  })

  describe('Should pass if the query is invalid', () => {
    it('Invalid expected query products', () => {
      const invalidQuery = `
        {
            products {
                _id
                invalidField
            }
        }
      `
      //Con la función de test, nos permite comprobar la 
      //definición del tipo pasada como segundo argumento.
      //Como primer argumento deberemos indicarle si dicha
      //definición pasada es correcta (true) o incorrecta (false).
      tester.test(false, invalidQuery)
    })

    it('Invalid query products argument', () => {
      const validQuery = `
        {
          productById(invalidField: "identificador") {
            _id
            name
          }
        }
      `
      tester.test(false, validQuery)
    })

    it('Invalid query products argument type', () => {
      const validQuery = `
        {
          productById(_id: invalidType) {
            _id
            name
          }
        }
      `
      tester.test(false, validQuery)
    })
  })

  describe('Should pass if the query is valid', () => {
    it('Valid expected query products', () => {
      const validQuery = `
        {
            products {
                _id
                name
            }
        }
      `
      //En este caso, al tratarse de una definición válida
      //para la que no debería de fallar, se le pasa
      //como primer parámetro 'true'.
      tester.test(true, validQuery);
    })

    it('Valid query product by id argument', () => {
      const validQuery = `
        {
          productById(_id: "identificador") {
            _id
            name
          }
        }
      `
      tester.test(true, validQuery)
    })

    it('Valid query product by name argument', () => {
      const validQuery = `
        {
          productByName(name: "name") {
            _id
            name
          }
        }
      `
      tester.test(true, validQuery)
    })

    it('Valid query product resolver by name argument', () => {

      const validQuery = `
        query productByName($name: String!) {
          productByName(name: $name) {
            _id
            name
          }
        }
      `
      //Como primer argumento deberemos de pasarle la consulta,
      //y como último argumento, el conjunto de variables de entrada
      //junto al valor de éstas.
      tester.graphql(validQuery, undefined, undefined, { name: "nombre" })
    })

    it('Valid query product resolver by id argument', () => {

      const validQuery = `
        query productById($_id: String!) {
          productById(_id: $_id) {
            _id
            name
          }
        }
      `
      tester.graphql(validQuery, undefined, undefined, { _id: "identificador" })
    })

    it('Valid query all products resolver', () => {

      const validQuery = `
        query products{
          products{
            _id
            name
          }
        }
      `
      tester.graphql(validQuery, undefined, undefined, {})
    })
  })

})

//Definición de tests para mutaciones
//de igual forma que se ha realizado para
//las queries.
describe('Test my mutations', () => {
  let testerM

  before(() => {
    testerM = new EasyGraphQLTester(ProductSchema,ProductResolver)
  })

  describe('Should pass if the mutations are invalid', () => {
    it('Invalid expected mutation registerProduct', () => {
      const mutation = `
        mutation registerProduct($name: String!, $description: iDescription!, $state: String, $owner: String) {
          registerProduct(name: $name, description: $description, state: $state, owner: $owner) {
            success
            invalidField
          }
        }`

      testerM.test(false, mutation, {
        name: "Setas",
        description: {
          textDescription: "Variedad de setas",
          price: 2.15,
          reducedPrice: 1.75,
          expiration: "11/11/19"
        },
        state: "Disponible",
        owner: "Productor"
      })
    })

    it('Invalid mutation registerProduct arguments', () => {
      const mutation = `
        mutation registerProduct($name: String!, $description: iDescription!, $state: String, $owner: String) {
          registerProduct(name: $name, description: $description, state: $state, owner: $owner) {
            success
          }
        }`

      testerM.test(false, mutation, {
        name: "Setas",
        description: {
          textDescription: "Variedad de setas",
          price: 2.15,
          reducedPrice: 1.75,
          expiration: "11/11/19",
          invalidArgument: "InvalidType"
        },
        state: "Disponible",
        owner: "Productor"
      })
    })

    it('Invalid mutation registerProduct arguments type', () => {
      const mutation = `
        mutation registerProduct($name: String!, $description: iDescription!, $state: String, $owner: String) {
          registerProduct(name: $name, description: $description, state: $state, owner: $owner) {
            success
          }
        }`

      testerM.test(false, mutation, {
        name: "Setas",
        description: {
          textDescription: "Variedad de setas",
          price: 2.15,
          reducedPrice: "invalidType",
          expiration: "11/11/19"
        },
        state: "Disponible",
        owner: "Productor"
      })
    })

    it('Invalid expected mutation modifyProductState', () => {
      const mutation = `
        mutation modifyProductState($_id: String!, $state: String!) {
          modifyProductState(_id: $_id, state: $state) {
            success
            invalidArgument
          }
        }`
  
      testerM.test(false, mutation, {
        _id: "identificador",
        state: "Reservado"
      })
    })
  
    it('Invalid mutation modifyProductState arguments', () => {
      const mutation = `
        mutation modifyProductState($_id: String!, $state: String!) {
          modifyProductState(_id: $_id, state: $state) {
            success
          }
        }`
  
      testerM.test(false, mutation, {
        _id: "identificador",
        invalidField: "InvalidType"
      })
    })

    it('Invalid mutation modifyProductState arguments type', () => {
      const mutation = `
        mutation modifyProductState($_id: String!, $state: String!) {
          modifyProductState(_id: $_id, state: $state) {
            success
          }
        }`
  
      testerM.test(false, mutation, {
        _id: "identificador",
        state: 5.0
      })
    })

  })

  describe('Should pass if the mutations are valid', () => {
    it('Valid mutation registerProduct', () => {
      const mutation = `
        mutation registerProduct($name: String!, $description: iDescription!, $state: String, $owner: String) {
          registerProduct(name: $name, description: $description, state: $state, owner: $owner) {
            success
            productResponse{
              _id
              name
              description{
                textDescription
                price
                reducedPrice
                expiration
              }
              owner
              createdAt
            }
            errors{
              path
              message
            }
          }
        }`

      testerM.test(true, mutation, {
        name: "Setas",
        description: {
          textDescription: "Variedad de setas",
          price: 2.15,
          reducedPrice: 1.75,
          expiration: "11/11/19"
        },
        state: "Disponible",
        owner: "Productor"
      })
    })

    it('Valid mutation modifyProductState', () => {
      const mutation = `
        mutation modifyProductState($_id: String!, $state: String!) {
          modifyProductState(_id: $_id, state: $state) {
            success
            productResponse{
              _id
              name
              description{
                textDescription
                price
                reducedPrice
                expiration
              }
              owner
              createdAt
            }
            errors{
              path
              message
            }
          }
        }`

      testerM.test(true, mutation, {
        _id: "identificador",
        state: "Reservado"
      })
    })

    it('Valid mutation registerProduct resolver', () => {

      const validQuery = `
        mutation registerProduct($name: String!, $description: iDescription!, $state: String, $owner: String){
          registerProduct(name: $name, description: $description, state: $state, owner: $owner){
            success
          }
        }
      `
      testerM.graphql(validQuery, undefined, undefined, 
        {name:"Setas", 
        description:{
          textDescription: "Variedad de setas",
          price: 2.15,
          reducedPrice: 1.75,
          expiration: "11/11/19"}, 
        state:"Disponible", 
        owner:"Productor"})
    })

    it('Valid mutation modifyProductState resolver', () => {

      const validQuery = `
        mutation modifyProductState($_id: String!, $state: String!){
          modifyProductState(_id: $_id, state: $state){
            success
          }
        }
      `
      testerM.graphql(validQuery, undefined, undefined, 
        {_id:"identificador", state:"Reservado"})
    })
  })

})

