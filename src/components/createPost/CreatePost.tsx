import { motion } from "framer-motion";
import { useState } from "react";
import Input from "../formComponents/input/Input";

const CreatePost: React.FC = () => {
  const [postData, setPostData] = useState<string>("");

  return (
    <div className="create-post-container">
      <Input
        label="Create Post: "
        name="postData"
        type="text"
        value={postData}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPostData(e.target.value)
        }
        required
      />
      <motion.button>Crear Post</motion.button>
    </div>
  );
};

export default CreatePost;
