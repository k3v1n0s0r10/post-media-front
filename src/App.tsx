import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from "./components/navBar/NavBar";
import Home from "./pages/home/home";
import SignIn from "./pages/sign-in/signIn";
import SignUp from "./pages/sign-up/signUp";

import CheckAuth from "./utils/authRoute";
import { AuthContext } from "./context/context";

import "./App.scss";
import CheckAut from "./utils/authRoute";

const App: React.FC = () => {
  const [auth, setAuth] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) setAuth(token);
  }, []);

  const handleAuthChange = (authState: string | null) => {
    if (authState) {
      localStorage.setItem("authToken", authState);
      setAuth(authState);
    } else {
      localStorage.removeItem("authToken");
      setAuth(null);
    }
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ auth, handleAuthChange }}>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <CheckAuth exact path="/sign-in" Component={SignIn} />
            <CheckAuth exact path="/sign-up" Component={SignUp} />
            <CheckAut path="*" Component={SignUp} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
