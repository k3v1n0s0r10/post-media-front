import { useContext, useState } from "react";
import { ApolloError, useMutation } from "@apollo/client";

import { AuthContext } from "../context/auth";
import { REGISTER_MUTATION } from "../utils/graphql";
import { useHistory } from "react-router-dom";

const useRegister = () => {
  const { login } = useContext(AuthContext);
  const [errors, setErrors] = useState<Array<any>>([]);
  const [sendRegister, { loading }] = useMutation(REGISTER_MUTATION, {
    errorPolicy: "all",
  });

  const history = useHistory();

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    formData: {
      username: string;
      password: string;
      confirmPassword: string;
      email: string;
    }
  ) => {
    e.preventDefault();

    sendRegister({
      variables: {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      },
    })
      .then(({ data, errors }) => {
        if (data) {
          setErrors([]);
          login(data.register);
          history.replace("/");
        } else if (errors) {
          const errObj = errors[0].extensions?.errors;

          setErrors(Object.values(errObj));
        } else {
          setErrors([
            "Ocurrio un error inesperado, vuelve a intentarlo mas tarde",
          ]);
        }
      })
      .catch((err: ApolloError) => {
        if (err.message === "Failed to fetch") {
          setErrors(["No hubo respuesta del servidor, intentelo mas tarde"]);
        }
      });
  };

  return { handleSubmit, loading, errors };
};

export default useRegister;
