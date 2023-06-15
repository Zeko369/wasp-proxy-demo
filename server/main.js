import { fastify } from "fastify";
import fastifyCors from "@fastify/cors";

const app = fastify();
await app.register(fastifyCors, {origin: '*', methods: ['GET', 'HEAD']});

app.get("/", async (request, reply) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  console.log(`${request.id} - Request starting...`);

  return { hello: "world" };
});

console.log("Starting up and (fake compiling)...");
setTimeout(() => {
  app
    .listen({ port: 5002 })
    .then((address) => console.log(`server listening on ${address}`))
    .catch((err) => {
      app.log.error(err);
      process.exit(1);
    });
}, 4000);
