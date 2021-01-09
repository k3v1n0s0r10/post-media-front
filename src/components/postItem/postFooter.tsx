import { UserInterface } from "../../context/auth";
import useDeletePost from "../../graphql/api/useDeletePost";
import useLikePost from "../../graphql/api/useLikePost";

interface PostFooterProps {
  likeCount: string;
  commentCount: string;
  username: string;
  likes: Array<{ username: string }>;
  user: UserInterface | null;
  id: string;
  idx: number;
}

const PostFooter: React.FC<PostFooterProps> = ({
  likeCount,
  commentCount,
  username,
  likes,
  user,
  idx,
  id,
}) => {
  const { loading: likeLoading, handleLike } = useLikePost();
  const { loading: deleteLoading, deletePost } = useDeletePost();

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
