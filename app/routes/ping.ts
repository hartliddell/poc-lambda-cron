import {
  FastifyReply,
  FastifyRequest,
  FastifySchema,
  RouteOptions,
} from "fastify";

const schema: FastifySchema = {
  querystring: {
    type: "object",
    properties: {
      msg: { type: "string", enum: ["hello", "goodbye"] },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        msg: { type: "string" },
      },
    },
  },
};

const handler = async (req: FastifyRequest, reply: FastifyReply) => {
  const { query } = req as { query: Record<string, string> };
  const { msg } = query;
  reply.send({ msg: msg ?? "pong" });
};

export const route: RouteOptions = {
  method: "GET",
  url: "/ping",
  schema,
  handler,
};
