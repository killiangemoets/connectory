"use client";

import { useQuery } from "@apollo/client";
import { gql } from "apollo-server";

const GET_ENTITIES = gql`
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

export default function Home() {
  const { loading, error, data } = useQuery(GET_ENTITIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // eslint-disable-next-line no-console
  console.log("DATA", data);

  return <main>Hello World</main>;
}
