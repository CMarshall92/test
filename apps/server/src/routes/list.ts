export default async function listRoutes(fastify: any, opts: any) {
  fastify.get('/', async (request: any, reply: any) => {
    return { platform: 'list', message: 'Welcome to list API' };
  });
}