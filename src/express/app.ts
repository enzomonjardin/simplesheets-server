import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import bodyParser from "body-parser";
import cors from "cors";
import express, { Request } from "express";
import addRequestId from "express-request-id";
import morgan from "morgan";
import { Roarr } from "roarr";
import healthCheck from "@starefossen/express-health";
import { typeDefs, resolvers } from "../graph";

const app = express();

app.use(cors());
app.use(addRequestId());
app.use(bodyParser.json({ type: "*/json" }));
app.use(bodyParser.urlencoded({ extended: true }));

const logger = Roarr.child({ package: "api" });

app.use((req, res, next) => {
  req.logger = logger.child({ requestId: req.id });
  next();
});

morgan.token<Request>("id", req => req.id);
morgan.token<Request>("x-forwarded-for", req => req.get("x-forwarded-for"));

app.use(
  morgan<Request>(
    JSON.stringify({
      remote_addr: ":remote-addr",
      remote_user: ":remote-user",
      id: ":id",
      x_forwarded_for: ":x-forwarded-for",
      method: ":method",
      url: ":url",
      status: ":status",
      res_content_length: ":res[content-length]",
      response_time: ":response-time",
      context: { requestId: ":id" },
    }),
    {
      skip: req => !!req.url.match("/healthcheck") || !!req.url.match("/ping"),
    },
  ),
);

app.get("/ping", (req, res) => res.send("OK"));
app.get("/healthcheck", healthCheck([]));

const dev = process.env.NODE_ENV === "development";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
  introspection: dev,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
});

export const startExpressApp = ({ port }: { port: number }) => {
  server.start().then(() => {
    app.listen(port, () => {
      logger.info(`📄 simplesheets-server listening on port ${port}`);
      server.applyMiddleware({ app, path: "/graph" });
      logger.info({ dev }, `apollo-server started`);
    });
  });
};
