import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schema';
import resolvers from './resolvers';

async function startServer() {
  const app = express() as any;
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 5050 }, () =>
    console.log(`Server ready at http://localhost:5050${server.graphqlPath}`)
  );
}

startServer();