import app from "../app/app";
import awsLambdaFastify from "@fastify/aws-lambda";

const proxy = awsLambdaFastify(app);

export const handler = async (event: any, context: any) => {
  // Pass event and context through to the Fastify app
  return proxy(event, context);
};
