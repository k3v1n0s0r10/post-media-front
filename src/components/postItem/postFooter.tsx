import { PostInterface } from "../../@types/post";
import { UserInterface } from "../../context/auth";
import useDeletePost from "../../graphql/api/useDeletePost";
import useLikePost from "../../graphql/api/useLikePost";

interface PostFooterProps {
  post: PostInterface;
  idx: number;
  user: UserInterface | null;
}

const PostFooter: React.FC<PostFooterProps> = ({ post, user, idx }) => {
  const { loading: likeLoading, handleLike } = useLikePost();
  const { loading: deleteLoading, deletePost } = useDeletePost();

  const { likes, likeCount, id, commentCount, username } = post;

  const isLiked =
    user &&
    likes.filter((like) => like.username.includes(user.username)).length > 0;

  return (
    <div className="post-footer">
      <button
        disabled={likeLoading || !user}
        onClick={() => handleLike(id, idx)}
      >
        <i className={isLiked ? "fas fa-heart" : "far fa-heart"} />
        {likeCount}
      </button>
      <button>
        <i className="far fa-comment" /> {commentCount}
      </button>
      {username === user?.username && (
        <button
          disabled={deleteLoading || !user}
          onClick={() => deletePost(idx, id)}
        >
          <i className="fas fa-trash" />
        </button>
      )}
    </div>
  );
};

export default PostFooter;
