import { useQuery } from "@apollo/client";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import React, { useContext, useState } from "react";
import CreatePost from "../../components/createPost/CreatePost";
import Loader from "../../components/Loader";

import PostItem from "../../components/postItem/PostItem";
import { AuthContext } from "../../context/auth";
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
  const { data, loading } = useQuery(GET_POSTS_QUERY);
  const [selected, setSelected] = useState({ idx: "", id: "" });

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
          data.getPosts.map((el: any, idx: number) => (
            <PostItem key={el.id} setSelected={setSelected} idx={idx} {...el} />
          ))
        )}

        <AnimatePresence>
          {selected.id && (
            <motion.div className="post-open" layout>
              <PostItem
                {...data.getPosts[selected.idx]}
                idx={selected.idx}
                setSelected={setSelected}
                selected
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimateSharedLayout>
  );
};

export default Home;
