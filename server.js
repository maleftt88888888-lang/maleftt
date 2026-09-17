import { serve } from "@hono/node-server";
import worker from "./src/index.js";

const PORT = 3000;
const HOST = "0.0.0.0";

serve(
  {
    fetch: (req) => worker.fetch(req, process.env),
    port: PORT,
    hostname: HOST,
  },
  (info) => {
    console.log(`Server running at http://${HOST}:${info.port}`);
  }
);
