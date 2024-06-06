import { gql } from "@apollo/client";

export const GET_ENTITIES = gql`
  query GetEntities {
    getEntities {
      id
      name
      ... on Contact {
        email
        phone
      }
      ... on Company {
        industry
        contactEmail
      }
    }
  }
`;

export const CREATE_ENTITY = gql`
  mutation CreateEntity($input: CreateEntityInput!) {
    createEntity(input: $input) {
      id
      name
      ... on Contact {
        email
        phone
      }
      ... on Company {
        industry
        contactEmail
      }
    }
  }
`;

export const UPDATE_ENTITY = gql`
  mutation UpdateEntity($input: UpdateEntityInput!) {
    updateEntity(input: $input) {
      id
      name
      ... on Contact {
        email
        phone
      }
      ... on Company {
        industry
        contactEmail
      }
    }
  }
`;
