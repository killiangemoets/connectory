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

// Mocking the resolvers
// const mocks = {
//   Query: () => ({
//     getEntities: () => {
//       console.log("MOCK - getEntities");
//       return [];
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

// Creating some basic resolvers to handle the queries and mutations
const resolvers = {
  Entity: {
    __resolveType(obj) {
      // console.log("RESOLVER - __resolveType");
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
      console.log("RESOLVER - getEntities");
      return entities;
    },
    getEntity: (_, { id }) => {
      console.log("RESOLVER - getEntity", id);
      return entities.find((entity) => entity.id === id);
    },
  },
  Mutation: {
    createEntity: (_, { input }) => {
      console.log("RESOLVER - createEntity");
      const newEntity = {
        __typename: input.entityType === "CONTACT" ? "Contact" : "Company",
        id: casual.uuid,
        name: input.name,
        ...(input.entityType === "CONTACT"
          ? { email: input.email, phone: input.phone }
          : { contactEmail: input.contactEmail, industry: input.industry }),
      };
      entities.push(newEntity);
    },
    updateEntity: (_, { input }) => {
      console.log("RESOLVER - updateEntity");
      const entity = entities.find((entity) => entity.id === input.id);
      if (!entity) {
        throw new Error("Entity not found");
      }
      const updatedEntity = {
        __typename: input.entityType === "CONTACT" ? "Contact" : "Company",
        id: entity.id,
        name: input.name,
        ...(input.entityType === "CONTACT"
          ? { email: input.email, phone: input.phone }
          : { contactEmail: input.contactEmail, industry: input.industry }),
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
