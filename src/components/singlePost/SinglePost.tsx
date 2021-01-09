import { motion } from "framer-motion";
import { useContext } from "react";
import { PostInterface } from "../../@types/post";

import { PostContext } from "../../context/post";

interface Props {
  post: PostInterface;
}

const SinglePost: React.FC<Props> = ({ post }) => {
  const { setPost } = useContext(PostContext);

  return (
    <motion.div className="post-open" onClick={() => setPost(null)} layout>
      <motion.div layoutId={post.id}>
        <motion.img
          layoutId={post.id + "image"}
          src="https://www.nicepng.com/png/full/780-7805650_generic-user-image-male-man-cartoon-no-eyes.png"
          alt="profile"
        />
      </motion.div>
    </motion.div>
  );
};

export default SinglePost;
