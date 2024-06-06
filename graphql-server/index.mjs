import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server";
import casual from "casual";
import { readFileSync } from "fs";

const typeDefs = readFileSync("./graphql-server/schema.graphql", "utf8");

const schema = makeExecutableSchema({ typeDefs });

const entities = Array.from({ length: casual.integer(100, 200) }, () => {
  const type = casual.random_element(["Contact", "Company"]);
  if (type === "Contact")
    return {
      __typename: type,
      id: casual.uuid,
      name: casual.full_name,
      email: casual.email,
      phone: casual.phone,
    };
  else
    return {
      __typename: type,
      id: casual.uuid,
      name: casual.company_name,
      industry: casual.word,
      contactEmail: casual.email,
    };
});

const mocks = {
  Query: () => ({
    getEntities: () => entities,
    getEntity: ({ id }) => entities.find((entity) => entity.id === id),
  }),
};

const schemaWithMocks = addMocksToSchema({ schema, mocks });

const server = new ApolloServer({ schema: schemaWithMocks });

server.listen().then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at ${url}`);
});
