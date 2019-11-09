const EasyGraphQLTester = require('easygraphql-tester');
const ProductSchema = require('../graphql/types/Product/index');
const ProductResolver = require('../graphql/resolvers/Product/index');

describe('Test my queries', () => {
  let tester

  before(() => {
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
      // First arg: false, there is no invalidField on the schema.
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
  })

})

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
  })

})