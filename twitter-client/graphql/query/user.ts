import { graphql } from "../../gql";

export const verifyUserGoogleTokenQuery = graphql(`
  #graphql
  query VerifyUserGoogleToken($token: String!) {
    verifyGoogleToken(token: $token)
  }
`);

export const getCurrentUserQuery = graphql(`
  #graphql
  query GetCurrentUser {
    getCurrentUser {
      id
      profileImageURL
      email
      firstName
      lastName
      tweets {
        id
        content
        tags
        imageURL
      }
    }
  }
`);

export const getUserByIdQuery = graphql(`
  #graphql
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      firstName
      id
      lastName
      profileImageURL
      tweets {
        content
        id
        imageURL
        tags
      }
    }
  }
`);
