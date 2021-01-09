import { gql } from "@apollo/client";

const GET_POSTS_QUERY = gql`
  query {
    getPosts {
      id
      body
      username
      likeCount
      commentCount
      createdAt
      likes {
        username
      }
      comments {
        username
      }
    }
  }
`;

export { GET_POSTS_QUERY };
