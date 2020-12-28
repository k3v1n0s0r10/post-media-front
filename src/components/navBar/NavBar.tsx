import { Link } from "react-router-dom";
import { useContext } from "react";

import "./NavBar.scss";
import { AuthContext } from "../../context/auth";

const NavBar: React.FC = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">
        <h1>PostMedia</h1>
      </Link>

      {user ? (
        <p onClick={logout}>Log out</p>
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
