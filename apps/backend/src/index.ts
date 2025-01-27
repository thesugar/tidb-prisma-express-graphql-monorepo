import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schema';
import { resolvers } from './resolvers';
import { PrismaClient } from '@prisma/client';

async function startServer() {
  const app = express() as any;
  const prisma = new PrismaClient();

  const PORT = process.env.PORT || 5050;
  
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async () => {
      return {
        db: prisma,
      };
    },
  });
  await server.start();
  server.applyMiddleware({ app });

  try {
    app.listen({ port: PORT }, () => {
      console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1);
  }
}

startServer();
