import { gql, useQuery } from "@apollo/client";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import { useState } from "react";
import Loader from "./components/loader/loader";
import NavBar from "./components/nav-bar/navBar";
import PostItem from "./components/post-item/postItem";

import "./styles/global.scss";

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

function App() {
  const { data, loading } = useQuery(getPosts);
  const [selected, setSelected] = useState({ idx: "", id: "" });

  return (
    <div className="App">
      <NavBar />

      <AnimateSharedLayout type="crossfade">
        <motion.div
          variants={postsAnimation}
          initial="hidden"
          animate="visible"
          className="app-content"
        >
          {loading ? (
            <Loader />
          ) : (
            data.getPosts.map((el: any, idx: number) => (
              <PostItem
                key={el.id}
                setSelected={setSelected}
                idx={idx}
                {...el}
              />
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
    </div>
  );
}

export default App;
