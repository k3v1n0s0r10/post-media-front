import moment from "moment";

interface PostHeaderProps {
  username: string;
  createdAt: string;
}

const PostHeader: React.FC<PostHeaderProps> = ({ username, createdAt }) => {
  return (
    <div className="post-header">
      <img
        src="https://www.nicepng.com/png/full/780-7805650_generic-user-image-male-man-cartoon-no-eyes.png"
        alt="user profile"
      />
      <span>{username}</span>
      <span>{moment(createdAt).fromNow()}</span>
    </div>
  );
};

export default PostHeader;
