import React, { useRef, useContext } from "react";
import { MyContext } from "../context/MyContext";
const AddSubject = (props) => {
  const inputStyle = {
    textAlign: "center",
    color: "white",
    maxWidth: "500px",
    fontSize: "2.7vw",
    backgroundColor: "#161934",
    borderRadius: "13px",
    outline: "none",
    border: "none",
  };

  //Context
  const { showAlert } = useContext(MyContext);

  const subjectRef = useRef();
  const presentRef = useRef();
  const totalRef = useRef();
  const addSubject = () => {
    const newSubjectName = subjectRef.current.value;
    const presentAttendance = presentRef.current.value;
    const totalAttendance = totalRef.current.value;
    if (presentAttendance < 0 || totalAttendance < 0) {
      showAlert("Attendance can't be negative", "danger");
      return;
    }
    if (newSubjectName.length === 0) {
      return showAlert("Subject can't be empty", "danger");
    }
    props.addSubject(newSubjectName, presentAttendance, totalAttendance);
    showAlert(`Added new subject ${newSubjectName} successfully`, "success");
  };
  return (
    <div
      style={{
        color: "white",
        padding: "10px",
        display: "flex",
        fontSize: "clamp(16px,2vw,40px)",
        backgroundColor: "#050d1c",
        marginBottom: "20px",
        // boxShadow: "0 2px 10px 1px black",
      }}
    >
      <form
        style={{
          margin: "15px",
          width: "80%",
          padding: "10px",
        }}
      >
        <div className="mb-3" style={{ display: "flex", gap: "7vw" }}>
          <label
            htmlFor="exampleInputEmail1"
            className="form-label"
            style={{
              margin: "5px 20px",
              width: "30%",
              fontSize: "clamp(16px,2vw,40px)",
            }}
          >
            Subject
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            style={inputStyle}
            ref={subjectRef}
          />
        </div>
        <div className="mb-3" style={{ display: "flex", gap: "7vw" }}>
          <label
            htmlFor="exampleInputPassword1"
            className="form-label"
            style={{ margin: "5px 20px", width: "30%" }}
          >
            Present
          </label>
          <input
            type="number"
            className="form-control"
            id="exampleInputPassword1"
            style={inputStyle}
            ref={presentRef}
          />
        </div>
        <div className="mb-3" style={{ display: "flex", gap: "7vw" }}>
          <label
            htmlFor="exampleInputPassword1"
            className="form-label"
            style={{ margin: "5px 20px", width: "30%" }}
          >
            Total
          </label>
          <input
            type="number"
            className="form-control"
            id="exampleInputPassword1"
            style={inputStyle}
            ref={totalRef}
          />
        </div>
      </form>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexBasis: "20%",
        }}
      >
        <button
          type="submit"
          className="btn btn-primary"
          style={{
            height: "5vw",
            width: "10vw",
            fontSize: "2vw",
            padding: "0px",
          }}
          onClick={addSubject}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddSubject;
