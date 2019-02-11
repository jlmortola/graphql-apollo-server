import typeDefs from './typeDefs';
import resolvers from './resolvers';
import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
import session from 'express-session';
import connectRedis from 'connect-redis';

require('dotenv').config()

const app = express();
const mongoose = require('mongoose');
const port = 7777;

const RedisStore = connectRedis(session);

const store = new RedisStore({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  pass: process.env.REDIS_PASSWORD,
});

app.use(session({
  store,
  name: process.env.SESS_NAME,
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 7200000,
    sameSite: true,
  }
}))

mongoose.connect(process.env.DB_URL);

const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),  
});
server.applyMiddleware({ app });

app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
);


