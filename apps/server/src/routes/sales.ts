export default async function salesRoutes(fastify: any, opts: any) {
  fastify.get('/', async (request: any, reply: any) => {
    return { platform: 'sales', message: 'Welcome to sales API' };
  });
}