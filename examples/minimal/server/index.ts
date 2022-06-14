import * as trpc from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';

export type AppRouter = typeof appRouter;

const appRouter = trpc.router().query('greeting', {
  input: (val: unknown) => {
    if (typeof val === 'string') return val;
    throw new Error(`Invalid input: ${typeof val}`);
  },
  async resolve(req) {
    return `hello, ${req.input}!`;
  },
});

createHTTPServer({
  router: appRouter,
  createContext() {
    return {};
  },
}).listen(2022);