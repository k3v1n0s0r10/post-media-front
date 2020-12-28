import { gql } from "@apollo/client";

interface Post {
  id: string;
}

const REGISTER_MUTATION = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      username
      token
    }
  }
`;

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

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
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

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
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

export {
  GET_POSTS_QUERY,
  CREATE_POST_MUTATION,
  DELETE_POST_MUTATION,
  LIKE_POST_MUTATION,
  REGISTER_MUTATION,
};
