import { motion } from "framer-motion";

import useLogin from "../../graphql/api/useLogin";
import useForm from "../../hooks/useForm";
import Input from "../../components/formComponents/input/Input";
import ErrorMessage from "../../components/ErrorMessage";

import "./signIn.scss";

const SignIn: React.FC = () => {
  const { handleSubmit, loading, errors } = useLogin();
  const [formData, handleInputChange] = useForm({
    username: "",
    password: "",
  });

  return (
    <div className="signin-page">
      <h1>Log In</h1>

      <form onSubmit={(e) => handleSubmit(e, formData)}>
        <Input
          label="Usermame: "
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
        />
        <Input
          label="Password: "
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={loading}
        >
          Sign in
        </motion.button>
        {errors &&
          errors.map((msg, idx) => <ErrorMessage key={idx} msg={msg} />)}
      </form>
    </div>
  );
};

export default SignIn;
