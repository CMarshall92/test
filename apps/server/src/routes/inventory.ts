export default async function inventoryRoutes(fastify: any, opts: any) {
  fastify.get('/', async (request: any, reply: any) => {
    return { platform: 'inventory', message: 'Welcome to inventory API' };
  });
}