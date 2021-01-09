import { motion } from "framer-motion";
import { useContext } from "react";
import { PostInterface } from "../../@types/post";
import { AuthContext } from "../../context/auth";
import PostBody from "./postBody";
import PostFooter from "./postFooter";
import PostHeader from "./postHeader";
import "./postItem.scss";

interface Props {
  post: PostInterface;
  idx: number;
}

const itemAnimation = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const PostItem: React.FC<Props> = ({ post, idx }) => {
  const { user } = useContext(AuthContext);

  return (
    <motion.div
      layoutId={post.id}
      className="post-item"
      variants={itemAnimation}
    >
      <PostHeader post={post} />
      <PostBody post={post} />
      <PostFooter post={post} idx={idx} user={user} />
    </motion.div>
  );
};

export default PostItem;
