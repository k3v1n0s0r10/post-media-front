import { motion } from "framer-motion";
import ErrorMessage from "../../components/ErrorMessage";
import Input from "../../components/formComponents/input/Input";
import useRegister from "../../graphql/useRegister";
import useForm from "../../hooks/useForm";

import "./signUp.scss";

const SignUp: React.FC = () => {
  const { handleSubmit, loading, errors } = useRegister();
  const [formData, handleInputChange] = useForm({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  return (
    <div className="signup-page">
      <h1>Register</h1>

      <form onSubmit={(e) => handleSubmit(e, formData)}>
        <Input
          label="Username: "
          name="username"
          onChange={handleInputChange}
          type="text"
          value={formData.username}
          required
        />
        <Input
          label="Email: "
          name="email"
          onChange={handleInputChange}
          type="email"
          value={formData.email}
          required
        />
        <Input
          label="Password: "
          name="password"
          onChange={handleInputChange}
          type="password"
          value={formData.password}
          required
        />
        <Input
          label="Confirm Password: "
          name="confirmPassword"
          onChange={handleInputChange}
          type="password"
          value={formData.confirmPassword}
          required
        />
        <motion.button
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
        >
          Register
        </motion.button>
        {errors &&
          errors.map((msg, idx) => <ErrorMessage key={idx} msg={msg} />)}
      </form>
    </div>
  );
};

export default SignUp;
