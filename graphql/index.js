const express = require("express")
const { createHandler } = require("graphql-http/lib/use/express")
const { schema } = require('./schema/schema')
const  helloResolver  = require('./resolvers/hello')
const { ruruHTML } = require("ruru/server")

const app = express()

const root = {
    hello: helloResolver,
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