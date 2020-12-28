import { useContext } from "react";
import { Redirect, Route, RouteComponentProps } from "react-router-dom";
import { AuthContext } from "../context/auth";

interface CheckAuthProps {
  Component: React.FC<RouteComponentProps>;
  exact?: boolean;
  path: string;
}

const CheckAut = ({
  Component,
  path,
  exact = false,
}: CheckAuthProps): JSX.Element => {
  const { user } = useContext(AuthContext);

  return (
    <Route
      exact={exact}
      path={path}
      render={(props) =>
        !user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default CheckAut;
