import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const resolvers = {
  Query: {
    players: async () => await prisma.player.findMany(),
    player: async (_: any, { id }: any) => await prisma.player.findUnique({ where: { id: parseInt(id) } }),
    profile: async (_: any, { playerId }: any) => await prisma.profile.findUnique({ where: { playerId: parseInt(playerId) } }),
  },

  Mutation: {
    createPlayer: async (_: any, { name, coins = 0, goods = 0 }: any) => {
      return await prisma.player.create({
        data: { name, coins, goods },
      });
    },
    updatePlayer: async (_: any, { id, name, coins, goods }: any) => {
      return await prisma.player.update({
        where: { id: parseInt(id) },
        data: { name, coins, goods },
      });
    },
    deletePlayer: async (_: any, { id }: any) => {
      return await prisma.player.delete({ where: { id: parseInt(id) } });
    },
    createProfile: async (_: any, { playerId, biography }: any) => {
      return await prisma.profile.create({
        data: { playerId: parseInt(playerId), biography },
      });
    },
  },

  Player: {
    profile: async (parent: { id: any; }) => await prisma.profile.findUnique({ where: { playerId: parent.id } }),
  },

  Profile: {
    player: async (parent: { playerId: any; }) => await prisma.player.findUnique({ where: { id: parent.playerId } }),
  },
};

export default resolvers;
