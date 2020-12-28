import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from "./components/navBar/NavBar";
import Home from "./pages/home/home";
import SignIn from "./pages/sign-in/signIn";
import SignUp from "./pages/sign-up/signUp";

import { AuthProvider } from "./context/auth";
import CheckAuth from "./utils/authRoute";

import "./App.scss";

const App: React.FC = () => {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <CheckAuth exact path="/sign-in" Component={SignIn} />
            <CheckAuth exact path="/sign-up" Component={SignUp} />
            <CheckAuth path="*" Component={SignUp} />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
