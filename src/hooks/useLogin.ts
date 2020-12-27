import { AuthContext } from "./../context/context";
import { useContext, useState } from "react";
import { ApolloError, gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

const useLogin = () => {
  const { handleAuthChange } = useContext(AuthContext);
  const [errors, setErrors] = useState<Array<any>>([]);
  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    errorPolicy: "all",
  });

  const history = useHistory();

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    formData: { username: string; password: string }
  ) => {
    e.preventDefault();

    login({
      variables: {
        username: formData.username,
        password: formData.password,
      },
    })
      .then(({ data, errors }) => {
        if (data) {
          setErrors([]);
          handleAuthChange(data.login.token);
          history.replace("/");
        } else if (errors) {
          const errObj = errors[0].extensions?.errors;

          setErrors(Object.values(errObj).map((msg) => msg));
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
