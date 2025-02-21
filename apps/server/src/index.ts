import Fastify from 'fastify';
import listRoutes from './routes/list';
import salesRoutes from './routes/sales';
import inventoryRoutes from './routes/inventory';
import env from './env'

const fastify = Fastify({ logger: true });

// Register routes with optional prefixes
fastify.register(listRoutes, { prefix: '/api/v1/list' });
fastify.register(salesRoutes, { prefix: '/api/v1/sales' });
fastify.register(inventoryRoutes, { prefix: '/api/v1/inventory' });

// Start the server
const start = async () => {
  try {
    await fastify.listen({ port: parseInt(env().PORT!!, 10) });
    console.log(`Server running on port ${env().PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();