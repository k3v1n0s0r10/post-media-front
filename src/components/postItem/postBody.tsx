import { useContext } from "react";
import { PostInterface } from "../../@types/post";
import { PostContext } from "../../context/post";

interface PostBodyProps {
  post: PostInterface;
}

const PostBody: React.FC<PostBodyProps> = ({ post }) => {
  const { setPost } = useContext(PostContext);

  return (
    <div onClick={() => setPost(post)} className="post-body">
      <p>{post.body}</p>
    </div>
  );
};

export default PostBody;
