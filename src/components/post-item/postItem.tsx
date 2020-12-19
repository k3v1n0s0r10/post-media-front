import { motion } from "framer-motion";
import moment from "moment";
import { Dispatch, SetStateAction } from "react";
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
}: Props) => {
  const handleClick = () => {
    if (!selected) setSelected({ id: id, idx: idx });
    else setSelected({ id: "", idx: "" });
  };

  return (
    <motion.div
      layoutId={id}
      variants={itemAnimation}
      className={`post-item ${selected ? "selected" : ""}`}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div className="post-header">
        <motion.img
          src="https://www.nicepng.com/png/full/780-7805650_generic-user-image-male-man-cartoon-no-eyes.png"
          alt="user profile"
        />
        <span>{username}</span>
        <span>{moment(createdAt).fromNow()}</span>
      </motion.div>
      <motion.p>{body}</motion.p>
      <motion.div className="post-footer">
        <motion.p>{likeCount}</motion.p>
        <motion.p>{commentCount}</motion.p>
      </motion.div>
    </motion.div>
  );
};

export default PostItem;
