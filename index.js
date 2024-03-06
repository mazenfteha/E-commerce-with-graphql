const express = require("express")
const cors = require('cors')
const bodyParser = require('body-parser')

const graphqlIndex  = require('./graphql/index')
const restIndex = require('./api/index')


const app = express()
app.use(cors());
app.use(bodyParser.json());


// REST endpoints:
app.use('/', restIndex);

// Mount GraphQL API
app.use('/', graphqlIndex);


// Start the server at port
app.listen(4000)
console.log("Running a GraphQL API server at http://localhost:4000/graphql")