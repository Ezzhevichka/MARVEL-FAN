import { writeFile, readFile } from 'fs/promises';
import Hapi from '@hapi/hapi';

const DATA_PATH = './db.json';

async function readDB() {
  try {
    const buffer = await readFile(DATA_PATH);
    return await JSON.parse(buffer);
  } catch (error) {
    return error;
  }
}

async function init() {
  const server = Hapi.server({
    port: 3001,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['http://localhost:3000'],
        additionalHeaders: ['cache-control', 'x-requested-with'],
      },
    },
  });

  server.route({
    method: 'GET',
    path: '/characters',
    handler: async () => (await readDB()).characters,
  });

  server.route({
    method: 'POST',
    path: '/characters',
    handler: async (request, h) => {
      const db = await readDB();
      const { id, remove } = request.payload;

      if (remove) {
        db.characters = db.characters.filter((el) => el !== id);
      } else if (!db.characters.includes(id)) {
        db.characters.push(id);
      }

      writeFile(DATA_PATH, JSON.stringify(db));
      return h.response();
    },
  });

  server.route({
    method: 'GET',
    path: '/comics',
    handler: async (_, h) => h.response(await (await readDB()).comics),
  });

  server.route({
    method: 'POST',
    path: '/comics',
    handler: async (request, h) => {
      const db = await readDB();
      const { id, remove } = request.payload;

      if (remove) {
        db.comics = db.comics.filter((el) => el !== id);
      } else if (!db.comics.includes(id)) {
        db.comics.push(id);
      }

      writeFile(DATA_PATH, JSON.stringify(db));
      return h.response();
    },
  });

  await server.start();
  console.log(`Server is running on ${server.info.uri}`);
}

init();
