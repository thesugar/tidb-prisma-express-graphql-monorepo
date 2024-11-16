import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Player {
    id: ID!
    name: String!
    coins: Float!
    goods: Int!
    createdAt: String!
    profile: Profile
  }

  type Profile {
    playerId: ID!
    biography: String!
    player: Player
  }

  type Query {
    players: [Player!]!
    player(id: ID!): Player
    profile(playerId: ID!): Profile
  }

  type Mutation {
    createPlayer(name: String!, coins: Float, goods: Int): Player!
    updatePlayer(id: ID!, name: String, coins: Float, goods: Int): Player!
    deletePlayer(id: ID!): Player!
    createProfile(playerId: ID!, biography: String!): Profile!
  }
`;

export default typeDefs;
