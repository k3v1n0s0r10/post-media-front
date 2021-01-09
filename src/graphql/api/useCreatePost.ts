import { useContext } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_POST_MUTATION } from "../mutations";
import { GET_POSTS_QUERY } from "../queries";
import { AuthContext } from "../../context/auth";

const useCreatePost = () => {
  const { logout } = useContext(AuthContext);
  const [sendPost, { loading, error, client }] = useMutation(
    CREATE_POST_MUTATION,
    {
      errorPolicy: "all",
    }
  );

  const createPost = (
    e: React.FormEvent<HTMLFormElement>,
    postData: string
  ) => {
    e.preventDefault();

    sendPost({
      variables: {
        body: postData,
      },
    })
      .then(({ data, errors }) => {
        if (data) {
          let actualData = client.readQuery({
            query: GET_POSTS_QUERY,
          });

          const newData = {
            getPosts: [data.createPost, ...actualData.getPosts],
          };

          client.writeQuery({ query: GET_POSTS_QUERY, data: newData });
        } else if (errors) {
          if (errors[0].message === "Invalid/Expired token") logout();
          else console.error(errors);
        }
      })
      .catch((err) => console.error(err));
  };

  return { createPost, loading, error };
};

export default useCreatePost;
