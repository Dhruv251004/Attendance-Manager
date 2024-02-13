import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Alert from "./components/Alert";
import { MyContext } from "./context/MyContext";
import { useState } from "react";

function App() {
  const [loggedin, setLoggedin] = useState(false);
  const [display, setDisplay] = useState(true);
  const [message, setMessage] = useState("");
  const [action, setAction] = useState("");
  const showAlert = (message, action) => {
    setMessage(message);
    setDisplay(false);
    setAction(action);
    setTimeout(() => {
      setDisplay(true);
    }, 3000);
  };
  return (
    <>
      <MyContext.Provider
        value={{
          loggedin,
          setLoggedin,
          display,
          setDisplay,
          message,
          setMessage,
          action,
          setAction,
          showAlert,
        }}
      >
        <BrowserRouter>
          <Navbar />
          <div hidden={display} style={{ position: "absolute", width: "100%" }}>
            <Alert message={message} action={action} />
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </MyContext.Provider>
    </>
  );
}

export default App;
