interface PostBodyProps {
  body: string;
}

const PostBody: React.FC<PostBodyProps> = ({ body }) => {
  return (
    <div className="post-body">
      <p>{body}</p>
    </div>
  );
};

export default PostBody;
