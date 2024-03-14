const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type Query {
        hello: String
        categories: [Category!]!
    }

    type Mutation {
        addProduct(input: AddProductInput!): Product!
        updateProduct(input: UpdateProductInput!): Product!
        deleteProduct(id: ID!): Boolean
        addCategory(input: AddCategoryInput!): Category!
        updateCategory(input: UpdateCategoryInput!): Category!
        deleteCategory(id: ID!): Boolean
        addReview(input: AddReviewInput!): Review!
        updateReview(input: UpdateReviewInput!): Review!
        deleteReview(id: ID!): Boolean
    }

    type Product {
        id: ID!
        name: String!
        description: String!
        quantity: Int!
        image: String!
        price: Float!
        onSale: Boolean!
        category: Category
        reviews: [Review!]!
    }

    type Category {
        id: ID!
        name: String!
        products:[Product!]!
    }


    type Review {
        id: ID!
        date: String!
        title: String!
        comment: String!
        rating: Int!
    }

    input AddProductInput {
        name: String!
        description: String!
        quantity: Int!
        image: String!
        price: Float!
        onSale: Boolean!
        categoryId: String
    }

    input UpdateProductInput {
        name: String!
        description: String!
        quantity: Int!
        image: String!
        price: Float!
        onSale: Boolean!
        categoryId: String
    }

    input AddCategoryInput {
        name: String!
    }
    
    input UpdateCategoryInput {
        name: String!
    }

    input AddReviewInput {
        date: String!
        title: String!
        comment: String!
        rating: Int!
        productId: ID!
    }
    input UpdateReviewInput {
        date: String!
        title: String!
        comment: String!
        rating: Int!
        productId: ID!
    }
`);

module.exports = { schema }