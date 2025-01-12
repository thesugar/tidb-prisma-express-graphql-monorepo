import { Resolvers } from '@derail/gql-test/dist/resolvers';

export const resolvers: Resolvers = {
  Query: {
    getPlayer: async (_parent, args, context) => {
      return context.db.player.findUnique({
        where: { id: parseInt(args.id) },
        include: { profile: true }, // Profile を関連付けて取得
      });
    },
    listPlayers: async (_parent, _, context) => {
      return context.db.player.findMany({
        include: { profile: true }, // 各 Player に関連する Profile を含む
      });
    },
  },
  Mutation: {
    createPlayer: async (
      _parent,
      args,
      context,
    ) => {
      const player = await context.db.player.create({
        data: { name: args.name },
      });

      // biography が提供されている場合は Profile を作成
      if (args.biography) {
        await context.db.profile.create({
          data: {
            playerId: player.id,
            biography: args.biography,
          },
        });
      }

      return context.db.player.findUnique({
        where: { id: player.id },
        include: { profile: true },
      });
    },
    updatePlayer: async (
      _parent,
      args,
      context,
    ) => {
      const playerId = parseInt(args.id);

      // Player を更新
      await context.db.player.update({
        where: { id: playerId },
        data: { name: args.name ?? '' },
      });

      const { biography } = args;
      // Profile の更新または作成
      if (biography) {
        const existsProfile = await context.db.profile.findUnique({
          where: { playerId },
        });

        if (existsProfile) {
          // 既存の Profile を更新
          await context.db.profile.update({
            where: { playerId },
            data: { biography },
          });
        } else {
          // 新しい Profile を作成
          await context.db.profile.create({
            data: { playerId, biography },
          });
        }
      }

      return context.db.player.findUnique({
        where: { id: playerId },
        include: { profile: true },
      });
    },

    deletePlayer: async (
      _parent,
      args,
      context,
    ) => {
      const playerId = parseInt(args.id);
    
      // Player が存在するか確認
      const player = await context.db.player.findUnique({
        where: { id: playerId },
      });
    
      if (!player) {
        throw new Error(`Player with ID ${playerId} does not exist.`);
      }
    
      // 関連する Profile を削除
      await context.db.profile.deleteMany({
        where: { playerId },
      });
    
      // Player を削除
      await context.db.player.delete({
        where: { id: playerId },
      });
    
      return args.id;
    },
  },
};
