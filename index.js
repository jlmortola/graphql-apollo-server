const { ApolloServer, gql } = require('apollo-server-express');

const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()
const port = 7777;

import typeDefs from './typeDefs';
import resolvers from './resolvers';


(async () => {
  try {
    await mongoose.connect(process.env.DB_URL);

    const server = new ApolloServer({ typeDefs, resolvers });
    server.applyMiddleware({ app });

    app.listen({ port }, () =>
      console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
    );
  }

  catch (e) {
    console.log(e)
  }
  
})()

