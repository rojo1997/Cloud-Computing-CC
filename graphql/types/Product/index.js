// Definición del tipo de dato producto:
// Se han definido los atributos junto a los tipos
// de dato asociados, así como los tipos definidos,
// como por ejemplo 'Description'.

// Se ha definido la mutación 'registerProduct' que nos permite
// registrar un nuevo producto en la colección de la BD.

const schema = `
type Product{
    _id: ID!
    name: String!
    description: Description!
    state: String!
    owner: String!
    createdAt: String!
}

type Description{
    textDescription: String!
    price: Float!
    reducedPrice: Float!
    expiration: String!
}

input iDescription{
    textDescription: String!
    price: Float!
    reducedPrice: Float!
    expiration: String!
}

type Error{
    path: String!,
    message: String!
}

type Response {
    success: Boolean!
    productResponse: Product
    errors: [Error]
}

type Query{
    productById(_id: String!): Product     
    productByName(name: String!): [Product]                           
    products: [Product]                                                
}

type Mutation{
    registerProduct(name: String!, description: iDescription!, state: String, owner: String): Response
    modifyProductState(_id:String!, state: String!): Response
}
`;

module.exports = schema;