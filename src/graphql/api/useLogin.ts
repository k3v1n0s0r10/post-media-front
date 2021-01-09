import { useContext, useState } from "react";
import { ApolloError, gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/auth";

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      token
    }
  }
`;

const useLogin = () => {
  const { login } = useContext(AuthContext);
  const [errors, setErrors] = useState<Array<any>>([]);
  const [sendUser, { loading }] = useMutation(LOGIN_MUTATION, {
    errorPolicy: "all",
  });

  const history = useHistory();

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    formData: { username: string; password: string }
  ) => {
    e.preventDefault();

    sendUser({
      variables: {
        username: formData.username,
        password: formData.password,
      },
    })
      .then(({ data, errors }) => {
        if (data) {
          setErrors([]);
          login(data.login);
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

export default useLogin;
