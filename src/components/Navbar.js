import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../context/MyContext";
const Navbar = () => {
  const { loggedin, setLoggedin, showAlert } = useContext(MyContext);
  const navigate = useNavigate();
  const getLoggedOut = () => {
    setLoggedin(false);
    navigate("/login");
    showAlert("Logged out Successfully", "success");
    localStorage.removeItem("auth-token");
  };
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        boxShadow: "0 2px 10px 1px black",
      }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{ color: "white" }}>
          Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul
          className="navbar-nav"
          style={{
            maxWidth: "250px",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          {!loggedin && (
            <>
              <li
                style={{
                  margin: "5px",
                }}
              >
                <button
                  className="btn btn-primary"
                  style={{ minWidth: "80px", margin: "0px 10px" }}
                >
                  <Link
                    style={{ color: "white", textDecoration: "none" }}
                    to="/login"
                  >
                    Log In
                  </Link>
                </button>
              </li>
              <li style={{ margin: "5px" }}>
                <button
                  className="btn btn-primary"
                  style={{ minWidth: "80px", margin: "0px 10px" }}
                >
                  <Link
                    style={{ color: "white", textDecoration: "none" }}
                    to="/signup"
                  >
                    Sign up
                  </Link>
                </button>
              </li>
            </>
          )}

          {loggedin && (
            <li style={{ margin: "5px" }}>
              <button
                className="btn btn-primary"
                style={{ minWidth: "90px", margin: "0px 10px" }}
                onClick={getLoggedOut}
              >
                Log out
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
