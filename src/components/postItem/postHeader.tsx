import { motion } from "framer-motion";
import moment from "moment";
import { PostInterface } from "../../@types/post";

interface PostHeaderProps {
  post: PostInterface;
}

const PostHeader: React.FC<PostHeaderProps> = ({ post }) => {
  const { username, createdAt, id } = post;

  return (
    <div className="post-header">
      <motion.img
        layoutId={id + "image"}
        src="https://www.nicepng.com/png/full/780-7805650_generic-user-image-male-man-cartoon-no-eyes.png"
        alt="user profile"
      />
      <span>{username}</span>
      <span>{moment(createdAt).fromNow()}</span>
    </div>
  );
};

export default PostHeader;
