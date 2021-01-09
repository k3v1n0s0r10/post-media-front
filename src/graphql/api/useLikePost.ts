import { useMutation } from "@apollo/client";
import { LIKE_POST_MUTATION } from "../mutations";
import { GET_POSTS_QUERY } from "../queries";

const useLikePost = () => {
  const [sendLike, { loading, client, error }] = useMutation(
    LIKE_POST_MUTATION,
    {
      errorPolicy: "all",
    }
  );

  const handleLike = (id: string, idx: number) => {
    sendLike({
      variables: {
        postId: id,
      },
    })
      .then(({ data, errors }) => {
        if (data) {
          let actualData = client.readQuery({
            query: GET_POSTS_QUERY,
          });

          const newData = {
            getPosts: [...actualData.getPosts],
          };

          newData.getPosts.splice(idx, 1);
          newData.getPosts.splice(idx, 0, data.likePost);

          client.writeQuery({ query: GET_POSTS_QUERY, data: newData });
        } else {
          console.error(errors);
        }
      })
      .catch((err) => console.error(err));
  };

  return { handleLike, loading, error };
};

export default useLikePost;
