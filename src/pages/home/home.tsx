import { gql, useQuery } from "@apollo/client";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import React, { useContext, useState } from "react";
import CreatePost from "../../components/createPost/CreatePost";
import Loader from "../../components/Loader";

import PostItem from "../../components/postItem/PostItem";
import { AuthContext } from "../../context/context";

import "./home.scss";

const getPosts = gql`
  query {
    getPosts {
      id
      body
      username
      likeCount
      commentCount
      createdAt
      likes {
        username
      }
    }
  }
`;

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
  const { auth } = useContext(AuthContext);
  const { data, loading } = useQuery(getPosts);
  const [selected, setSelected] = useState({ idx: "", id: "" });

  return (
    <AnimateSharedLayout type="crossfade">
      <motion.div
        variants={postsAnimation}
        initial="hidden"
        animate="visible"
        className="home-page"
      >
        {auth && <CreatePost />}

        {loading ? (
          <Loader size={10} />
        ) : (
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
