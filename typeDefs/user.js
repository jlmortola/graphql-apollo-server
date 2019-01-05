import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    user(id: ID!): User
    users: [User!]!
  }

  type Mutation {
    signUp(email: String!, username: String!, name: String!, password: String!): User
  }

  type User {
    id: ID!
    email: String!
    username: String!
    name: String!
    CreatedAt: String!
  }
`