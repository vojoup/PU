import { createRouter } from './context';
import { z } from 'zod';

export const workoutsRouter = createRouter()
  .query('getAll', {
    async resolve({ ctx }) {
      const data = await ctx.prisma.workout.findMany({
        where: { userId: ctx.session?.user?.id },
      });
      console.log(data);
      return data;
    },
  })
  .mutation('add', {
    input: z.object({
      count: z.number().min(1),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;
      const data = await ctx.prisma.workout.create({
        data: { userId, repetitions: input.count },
      });
      return data;
    },
  });
