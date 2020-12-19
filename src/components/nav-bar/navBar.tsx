import "./navBar.scss";

const NavBar = () => {
  return (
    <nav>
      <h1>PostMedia</h1>

      <div className="links-container">
        <a href="/">Log In</a>
        <a href="/">Sign Up</a>
      </div>
    </nav>
  );
};

export default NavBar;
