import typeDefs from '../typeDefs';
import resolvers from '../resolvers';
import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
require('dotenv').config()

const app = express();
const mongoose = require('mongoose');
const port = 7777;

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

