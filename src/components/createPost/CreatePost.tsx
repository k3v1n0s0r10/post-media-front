import { motion } from "framer-motion";
import { useState } from "react";
import useCreatePost from "../../graphql/api/useCreatePost";
import ErrorMessage from "../ErrorMessage";
import Input from "../formComponents/input/Input";

import "./CreatePost.scss";

const CreatePost: React.FC = () => {
  const [postData, setPostData] = useState<string>("");
  const { createPost, error, loading } = useCreatePost();

  return (
    <form
      onSubmit={(e) => {
        createPost(e, postData);
        setPostData("");
      }}
      className="create-post-container"
    >
      <Input
        label="Create Post: "
        name="postData"
        type="text"
        value={postData}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPostData(e.target.value)
        }
        maxLength={60}
        autocomplete="off"
        required
      />
      <p>{postData.length}/60</p>
      <motion.button disabled={loading} type="submit">
        Create post
      </motion.button>

      {error && <ErrorMessage msg={error.message} />}
    </form>
  );
};

export default CreatePost;
