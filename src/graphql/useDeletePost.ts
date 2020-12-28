import { useMutation } from "@apollo/client";
import { DELETE_POST_MUTATION, GET_POSTS_QUERY } from "../utils/graphql";

const useDeletePost = () => {
  const [sendDeletePost, { loading, client }] = useMutation(
    DELETE_POST_MUTATION,
    {
      errorPolicy: "all",
    }
  );

  const deletePost = (idx: number, id: string) => {
    sendDeletePost({
      variables: {
        postId: id,
      },
    })
      .then(({ data, errors }) => {
        if (data) {
          console.log("deleted");
          let actualData = client.readQuery({
            query: GET_POSTS_QUERY,
          });

          const newData = {
            getPosts: [...actualData.getPosts],
          };

          newData.getPosts.splice(idx, 1);

          client.writeQuery({ query: GET_POSTS_QUERY, data: newData });
        } else {
          console.log(errors);
        }
      })
      .catch((err) => console.error(err));
  };

  return { deletePost, loading };
};

export default useDeletePost;
