import { AuthContext } from "./../context/context";
import { useContext } from "react";
import { Redirect, Route, RouteComponentProps } from "react-router-dom";

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
  const { auth } = useContext(AuthContext);

  return (
    <Route
      exact={exact}
      path={path}
      render={(props) =>
        !auth ? (
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
