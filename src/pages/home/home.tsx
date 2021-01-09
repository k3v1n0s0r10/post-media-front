import { useQuery } from "@apollo/client";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import React, { useContext } from "react";
import CreatePost from "../../components/createPost/CreatePost";
import Loader from "../../components/Loader";

import PostItem from "../../components/postItem/PostItem";
import SinglePost from "../../components/singlePost/SinglePost";
import { AuthContext } from "../../context/auth";
import { PostContext } from "../../context/post";
import { GET_POSTS_QUERY } from "../../graphql/queries";

import "./home.scss";

const postsAnimation = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const Home: React.FC = () => {
  const { user } = useContext(AuthContext);
  const { post, setPost } = useContext(PostContext);
  const { data, loading } = useQuery(GET_POSTS_QUERY);

  return (
    <AnimateSharedLayout type="crossfade">
      <motion.div
        variants={postsAnimation}
        initial="hidden"
        animate="visible"
        className="home-page"
      >
        {user && <CreatePost />}

        {loading ? (
          <Loader size={10} />
        ) : (
          data &&
          data.getPosts.map((post: any, idx: number) => (
            <PostItem key={idx} idx={idx} post={post} />
          ))
        )}

        <AnimatePresence>{post && <SinglePost post={post} />}</AnimatePresence>
      </motion.div>
    </AnimateSharedLayout>
  );
};

export default Home;
