const express = require("express")
const { createHandler } = require("graphql-http/lib/use/express")
const { ruruHTML } = require("ruru/server")

const { schema } = require('./schema/schema')
const  { Query }  = require('./resolvers/Query')
const { Mutation } = require('./resolvers/Mutation')


const app = express()

const root = {
    ...Query,
    ...Mutation
};

// Create and use the GraphQL handler.
app.all(
    "/graphql",
    createHandler({
        schema: schema,
        rootValue: root,
    })
)


// Serve the GraphiQL IDE.
app.get("/G", (_req, res) => {
    res.type("html")
    res.end(ruruHTML({ endpoint: "/graphql" }))
})

module.exports = app