import app from "./app";

try {
  app.listen({ port: 3000, host: "0.0.0.0" });
  console.log("Server is running at http://localhost:3000");
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
