import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server";
import { readFileSync } from "fs";

const typeDefs = readFileSync("./graphql-server/schema.graphql", "utf8");

const schema = makeExecutableSchema({ typeDefs });

const schemaWithMocks = addMocksToSchema({ schema });

const server = new ApolloServer({ schema: schemaWithMocks });

server.listen().then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at ${url}`);
});
