import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useContext } from "react";
import { AuthContext } from "../../context/auth";
import PostBody from "./postBody";
import PostFooter from "./postFooter";
import PostHeader from "./postHeader";
import "./postItem.scss";

interface Props {
  body: string;
  id: string;
  username: string;
  likeCount: string;
  commentCount: string;
  createdAt: string;
  setSelected: Dispatch<SetStateAction<{ id: string; idx: string }>>;
  idx: any;
  selected?: boolean;
  likes: Array<{ username: string }>;
}

const itemAnimation = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const PostItem = ({
  body,
  id,
  username,
  createdAt,
  commentCount,
  likeCount,
  setSelected,
  idx,
  selected,
  likes,
}: Props) => {
  const { user } = useContext(AuthContext);

  return (
    <motion.div
      layoutId={id}
      variants={itemAnimation}
      className={`post-item ${selected ? "selected" : ""}`}
    >
      <PostHeader username={username} createdAt={createdAt} />
      <PostBody body={body} />
      <PostFooter
        commentCount={commentCount}
        likeCount={likeCount}
        username={username}
        likes={likes}
        id={id}
        idx={idx}
        user={user}
      />
    </motion.div>
  );
};

export default PostItem;
