import { Resolvers } from '@derail/gql-test/dist/resolvers';

export const resolvers: Resolvers = {
  Query: {
    getPlayer: async (_parent, { id }, context) => {
      return await context.db.player.findUnique({ where: { id: Number(id) } });
    },
    listPlayers: async (_parent, _args, context) => {
      return await context.db.player.findMany();
    },
  },
  Mutation: {
    createPlayer: async (_parent, { name, age, bio }, context) => {
      return await context.db.player.create({
        data: { name, age, bio },
      });
    },
    updatePlayer: async (_parent, { id, name, age, bio }, context) => {
      return await context.db.player.update({
        where: { id },
        data: { name, age, bio },
      });
    },
  },
};
