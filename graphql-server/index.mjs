/* eslint-disable no-console */
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server";
import casual from "casual";
import { readFileSync } from "fs";

const typeDefs = readFileSync("./graphql-server/schema.graphql", "utf8");

const entities = Array.from({ length: casual.integer(150, 200) }, () => {
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

// Option 1: Mocking the resolvers
// const mocks = {
//   Query: () => ({
//     getEntities: () => {
//       console.log("MOCK - getEntities");
//       return entities;
//     },
//     getEntity: ({ id }) => {
//       console.log("MOCK - getEntity", id);
//       return entities.find((entity) => entity.id === id);
//     },
//   }),
//   Mutation: () => ({
//     createEntity: ({ input }) => {
//       console.log("MOCK - createEntity");
//       const newEntity = {
//         __typename: input.entityType === "CONTACT" ? "Contact" : "Company",
//         id: casual.uuid,
//         name: input.name,
//         ...(input.entityType === "CONTACT"
//           ? { email: input.email, phone: input.phone }
//           : { contactEmail: input.contactEmail, industry: input.industry }),
//       };
//       console.log("newEntity", newEntity);
//       return newEntity;
//     },
//     updateEntity: ({ input }) => {
//       console.log("MOCK - updateEntity");
//       const entity = entities.find((entity) => entity.id === input.id);
//       if (!entity) {
//         throw new Error("Entity not found");
//       }
//       const updatedEntity = {
//         __typename: input.entityType === "CONTACT" ? "Contact" : "Company",
//         id: entity.id,
//         name: input.name,
//         ...(input.entityType === "CONTACT"
//           ? { email: input.email, phone: input.phone }
//           : { contactEmail: input.contactEmail, industry: input.industry }),
//       };

//       console.log("updatedEntity", updatedEntity);
//       return updatedEntity;
//     },
//   }),
// };

// Option 2: Creating some basic resolvers to handle the queries and mutations logic and store the data on the server ram
const resolvers = {
  Entity: {
    __resolveType(obj) {
      const type = obj.__typename || obj["$ref"].typeName;
      if (type === "Contact") {
        return "Contact";
      }
      if (type === "Company") {
        return "Company";
      }
      return null;
    },
  },
  Query: {
    getEntities: () => {
      return entities;
    },
    getEntity: (_, { id }) => {
      return entities.find((entity) => entity.id === id) ?? null;
    },
  },
  Mutation: {
    createEntity: (_, { input }) => {
      const newEntity = {
        __typename: input.entityType === "CONTACT" ? "Contact" : "Company",
        id: casual.uuid,
        name: input.name,
        ...(input.entityType === "CONTACT"
          ? { email: input.email, phone: input?.phone ?? null }
          : { contactEmail: input?.contactEmail ?? null, industry: input.industry }),
      };
      entities.push(newEntity);
    },
    updateEntity: (_, { input }) => {
      const entity = entities.find((entity) => entity.id === input.id);
      if (!entity) {
        throw new Error("Entity not found");
      }

      const { entityType, ...rest } = input;

      const updatedEntity = {
        ...entity,
        __typename: entityType === "CONTACT" ? "Contact" : "Company",
        ...rest,
      };

      Object.assign(entity, updatedEntity);
      return updatedEntity;
    },
  },
};

const server = new ApolloServer({
  schema: addMocksToSchema({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    // mocks,
    preserveResolvers: true,
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
