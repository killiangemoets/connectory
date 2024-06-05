import { typeDefs } from "./schema.mjs";
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server";

const schema = makeExecutableSchema({ typeDefs });

const schemaWithMocks = addMocksToSchema({ schema });

const server = new ApolloServer({ schema: schemaWithMocks });

server.listen().then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at ${url}`);
});
