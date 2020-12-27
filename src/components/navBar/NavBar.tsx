import { Link } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../context/context";

import "./NavBar.scss";

const NavBar: React.FC = () => {
  const { auth, handleAuthChange } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">
        <h1>PostMedia</h1>
      </Link>

      {auth ? (
        <p onClick={() => handleAuthChange(null)}>Log out</p>
      ) : (
        <div className="links-container">
          <Link to="/sign-in">Log In</Link>
          <Link to="/sign-up">Sign Up</Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
