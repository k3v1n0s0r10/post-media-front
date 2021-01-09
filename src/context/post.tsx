import { createContext, Dispatch, SetStateAction, useState } from "react";
import { PostInterface } from "../@types/post";

interface PostContextInterface {
  post: PostInterface | null;
  setPost: Dispatch<SetStateAction<PostInterface | null>>;
}

const PostContext = createContext<PostContextInterface>({
  post: null,
  setPost: () => {},
});

const PostProvider: React.FC = ({ children }) => {
  const [post, setPost] = useState<PostInterface | null>(null);

  return (
    <PostContext.Provider value={{ post, setPost }}>
      {children}
    </PostContext.Provider>
  );
};

export { PostProvider, PostContext };
