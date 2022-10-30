import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

import {PokemonClient} from "pokenode-ts"

export const appRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        text: z.string().nullish(),
      }),
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input?.text ?? 'world'}`,
      };
    }),
  
  getPokemonById: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async({input}) => {
      const api = new PokemonClient();
      const pokemon = await api.getPokemonById(input.id)
      return pokemon
    })
});

// export type definition of API
export type AppRouter = typeof appRouter;