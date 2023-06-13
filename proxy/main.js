import { fastify } from "fastify";
import fastifyCors from "@fastify/cors";
import http from "node:http";

const app = fastify();
await app.register(fastifyCors, {origin: '*', methods: ['GET', 'HEAD']});

const isServerUp = async () => {
  return new Promise((resolve, reject) => {
    const req = http.request(
      { host: "localhost", port: 5002, timeout: 2000 },
      (res) => resolve(true)
    );

    req.on("error", (err) => resolve(false));
    req.end();
  });
};

const COUNT = 10;
app.get("/", async (request, reply) => {
  console.log(`${request.id} - Request starting...`)

  let up = false;
  for(let i = 0; i < COUNT; i++) {
    up = await isServerUp();
    if (up) {
      break;
    }

    console.log(`${request.id} - Server down trying again ${i + 1}/${COUNT}...`)

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  if(!up) {
    console.log(`${request.id} - Server down...`)
    reply.code(504).send({ error: "Server is not up" });
    return 
  }

  console.log(`${request.id} - Server up passing data...`)
  const resp = await fetch("http://localhost:5002");
  const data = await resp.json();
  return data;
});

app
  .listen({ port: 5001 })
  .then((address) => {
    app.log.info(`server listening on ${address}`);
  })
  .catch((err) => {
    app.log.error(err);
    process.exit(1);
  });
