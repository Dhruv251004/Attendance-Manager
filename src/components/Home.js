import React, { useState, useEffect, useContext } from "react";
import AddSubject from "./AddSubject";
import SubjectCard from "./SubjectCard";
import { useNavigate } from "react-router";
import { MyContext } from "../context/MyContext";
const subjStyle = {
  margin: "20px",
  width: "100%",
  display: "flex",
  justifyContent: "center",
};
const Home = () => {
  const [subjects, setSubjects] = useState([]);
  const { setLoggedin } = useContext(MyContext);
  const navigate = useNavigate();
  const fetchSubjects = async () => {
    const result = await fetch("http://localhost:5000/api/subjects", {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    const response = await result.json();
    return response;
  };
  const fetchData = async () => {
    const data = await fetchSubjects();
    setSubjects(data);
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    const myfun = async () => {
      const token = localStorage.getItem("auth-token");
      if (token) {
        //authenticate
        const result = await fetch("http://localhost:5000/auth/getuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        });

        const response = await result.json();
        if (response.success) {
          setLoggedin(true);
          return;
        }
      }
      setLoggedin(false);
      navigate("/login");
    };
    myfun();
    // eslint-disable-next-line
  }, []);
  const deleteSub = async (id) => {
    const result = await fetch(`http://localhost:5000/api/subjects/${id}`, {
      method: "DELETE",
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    const response = await result.json();
    if (response.success) {
      setSubjects(subjects.filter((element) => element._id !== id));
    }
  };

  const addSub = async (subject, present, total) => {
    const result = await fetch(`http://localhost:5000/api/subjects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({
        subject,
        present,
        total,
      }),
    });
    await result.json();
    fetchData();
  };
  return (
    <>
      <AddSubject addSubject={addSub} />
      <div
        style={{
          color: "white",
          textAlign: "center",
          fontSize: "clamp(30px,5vw,70px)",
        }}
      >
        SUBJECTS
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "20px",
          flexDirection: "column",
        }}
      >
        {subjects.map((element, index) => {
          return (
            <div style={subjStyle} key={index}>
              <SubjectCard
                subject={element.subject}
                present={element.present}
                total={element.total}
                id={element._id}
                delete={deleteSub}
                key={element._id}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
