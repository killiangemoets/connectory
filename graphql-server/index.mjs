import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server";
import { readFileSync } from "fs";

const typeDefs = readFileSync("./graphql-server/schema.graphql", "utf8");

const schema = makeExecutableSchema({ typeDefs });

const mocks = {
  Query: () => ({
    getEntities: () => [
      {
        __typename: "Contact",
        id: "c7bd4646-edfb-4010-addd-185424632508",
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "555-1234",
      },
      {
        __typename: "Company",
        id: "3b6b2772-3146-4592-8526-8d4f0e2a92db",
        name: "Acme Corp",
        industry: "Technology",
        contactEmail: "info@acmecorp.com",
      },
      {
        __typename: "Contact",
        id: "c7bd4646-edfb-4010-addd-185424632502",
        name: "Killian Gemoets",
        email: "killian@example.com",
        phone: "+32123456",
      },
      {
        __typename: "Company",
        id: "3b6b2772-3146-4592-8526-8d4f0e2a92dc",
        name: "Faceook",
        industry: "Social Media",
        contactEmail: "info@facebook.com",
      },
      {
        __typename: "Company",
        id: "3b6b2772-3146-4592-8526-8d4f0e2a92dz",
        name: "Twitter",
        industry: "Social Media",
        contactEmail: "info@twitter.com",
      },
    ],
  }),
};

const schemaWithMocks = addMocksToSchema({ schema, mocks });

const server = new ApolloServer({ schema: schemaWithMocks });

server.listen().then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at ${url}`);
});
