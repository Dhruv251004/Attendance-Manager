import React, { useContext } from "react";
import { MyContext } from "../context/MyContext";
import { useNavigate } from "react-router";
const inputStyle = {
  textAlign: "center",
  color: "white",
  maxWidth: "500px",
  fontSize: "clamp(19px,1.3vw,50px)",
  backgroundColor: "#161934",
  borderRadius: "13px",
  outline: "none",
  border: "none",
  margin: "15px 0px",
};
// const baseUrl = process.env.REACT_APP_BASE_URL;
const baseUrl = "https://attendance-manager-api.vercel.app";
const Login = () => {
  const { setLoggedin, showAlert } = useContext(MyContext);
  const navigate = useNavigate();
  const getLogin = async (e) => {
    e.preventDefault();
    const email = document.getElementById("exampleInputEmail1").value;
    const password = document.getElementById("exampleInputPassword1").value;
    if (!email || !password) {
      return showAlert("Please fill all the details", "danger");
    }
    const result = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const response = await result.json();
    if (!response.success) {
      showAlert(response.error, "danger");
    } else {
      localStorage.setItem("auth-token", response.token);
      setLoggedin(true);
      navigate("/");
      showAlert("Logged in Successfully", "success");
    }
  };
  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "665px",
          backgroundColor: "#050d1c",
          flexDirection: "column",
        }}
      >
        <form
          style={{
            minWidth: "350px",
            width: "30vw",
            color: "white",
            padding: "30px 20px",
            minHeight: "450px",
            border: "0.1px solid black",
            borderRadius: "10px",
            boxShadow: "1px 2px 10px 1px black",
          }}
        >
          <h1 style={{ textAlign: "center" }}>Log In</h1>
          <div className="mb-3" style={{ margin: "30px 0px" }}>
            <label
              htmlFor="exampleInputEmail1"
              className="form-label"
              style={{ fontSize: "clamp(19px,1.3vw,50px)" }}
            >
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              style={inputStyle}
            />
            <div
              id="emailHelp"
              className="form-text"
              style={{ color: "white" }}
            >
              We'll never share your email with anyone else.
            </div>
          </div>
          <div
            className="mb-3"
            style={{ margin: "30px 0px", fontSize: "clamp(19px,1.3vw,50px)" }}
          >
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              style={inputStyle}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ margin: "30px 0px" }}
            onClick={getLogin}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
