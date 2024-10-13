import fastify from "fastify";
import { route as auth } from "./routes/auth";
import { route as ping } from "./routes/ping";
import {
  routeGET as webhookGET,
  routePOST as webhookPOST,
} from "./routes/webhook";
import { route as authCallback } from "./routes/authCallback";
import openapi from "./plugins/openapi";

const app = fastify();

app.register(openapi).then(() => {
  app.route(auth);
  app.route(authCallback);
  app.route(ping);
  app.route(webhookGET);
  app.route(webhookPOST);
  return app.ready();
});

export default app;
