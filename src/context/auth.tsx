import jwtDecode from "jwt-decode";
import { createContext, useReducer } from "react";

export interface UserInterface {
  username: string;
  token: string;
}

interface AuthInterface {
  user: UserInterface | null;
  login: (props: any) => void;
  logout: () => void;
}

const initialState: { user: UserInterface | null } = {
  user: null,
};

const token = localStorage.getItem("authToken");

if (token) {
  const decodedToken: any = jwtDecode(token);

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("authToken");
  } else {
    initialState.user = {
      username: decodedToken.username,
      token,
    };
  }
}

const AuthContext = createContext<AuthInterface>({
  user: null,
  login: () => {},
  logout: () => {},
});

const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

const AuthProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData: any) => {
    localStorage.setItem("authToken", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
