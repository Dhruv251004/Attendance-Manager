import React, { useState, useRef, useContext } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { MyContext } from "../context/MyContext";
const baseUrl = process.env.REACT_APP_BASE_URL;
const SubjectCard = (props) => {
  const [subjectDetails, setSubjectDetails] = useState({
    subject: props.subject,
    present: props.present,
    total: props.total,
  });

  //Context
  const { showAlert } = useContext(MyContext);

  const obj = {
    width: "90%",
    minheight: "200px",
    backgroundColor: "#0000004d",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    padding: "10px 20px",
  };
  const update = async (subject, present, total) => {
    const response = await fetch(`${baseUrl}/api/subjects/${props.id}`, {
      method: "PUT",
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
    const result = await response.json();
    if (!result.success) {
      throw result.error;
    }
  };
  const increase = async () => {
    update(props.subject, subjectDetails.present + 1, subjectDetails.total + 1);
    setSubjectDetails({
      subject: subjectDetails.subject,
      present: subjectDetails.present + 1,
      total: subjectDetails.total + 1,
    });
  };
  const decrease = () => {
    update(
      subjectDetails.subject,
      subjectDetails.present,
      subjectDetails.total + 1
    );
    setSubjectDetails({
      subject: subjectDetails.subject,
      present: subjectDetails.present,
      total: subjectDetails.total + 1,
    });
  };
  const updatedSubRef = useRef();
  const updatedPresRef = useRef();
  const updatedTotalRef = useRef();
  const close = useRef();
  const updatesubjectDetails = () => {
    const subject = updatedSubRef.current.value;
    const present = +updatedPresRef.current.value;
    const total = +updatedTotalRef.current.value;
    update(subject, present, total);
    close.current.click();

    setSubjectDetails({
      subject,
      present,
      total,
    });
    showAlert("Updated Attendance successfully", "success");
  };
  return (
    <>
      <div style={obj}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            className="head"
            style={{ color: "white", display: "flex", alignItems: "center" }}
          >
            <h1
              style={{
                marginBottom: "0px",
                fontSize: "clamp(23px,2.5vw,40px)",
              }}
            >
              {subjectDetails.subject}
            </h1>
          </div>
          <div style={{ fontSize: "30px", color: "white" }}>
            <i
              className="fa-regular fa-pen-to-square"
              style={{ margin: "8px", fontSize: "clamp(23px,2.5vw,40px)" }}
              data-bs-toggle="modal"
              data-bs-target={`#exampleModal${props.id}`}
            ></i>
            <i
              className="fa-solid fa-trash"
              style={{ margin: "8px", fontSize: "clamp(23px,2.5vw,40px)" }}
              onClick={() => {
                props.delete(props.id);
                showAlert(
                  `Deleted subject ${subjectDetails.subject} successfully`,
                  "success"
                );
              }}
            ></i>
          </div>
        </div>
        <hr
          style={{ color: "white", margin: "12px 0px", marginBottom: "15px" }}
        />
        <div style={{ margin: "10px 0px" }}>
          <div style={{ marginBottom: "10px" }}>
            <ProgressBar
              completed={
                subjectDetails.present === 0
                  ? 0
                  : Math.floor(
                      (subjectDetails.present / subjectDetails.total) * 100
                    )
              }
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "white",
          }}
        >
          <div style={{ display: "flex" }}>
            <div
              style={{
                fontSize: "20px",
                display: "grid",
                gridTemplateRows: "25px 25px",
                gridTemplateColumns: "100px 60px",
              }}
            >
              <span>Present</span>
              <span>{subjectDetails.present}</span>
              <span>Total</span>
              <span>{subjectDetails.total}</span>
            </div>
          </div>
          <div style={{ fontSize: "30px" }}>
            <i
              className="fa-sharp fa-regular fa-circle-check"
              style={{ margin: "8px", fontSize: "clamp(23px,2.5vw,40px)" }}
              onClick={increase}
            ></i>
            <i
              className="fa-regular fa-circle-xmark"
              style={{ margin: "8px", fontSize: "clamp(23px,2.5vw,40px)" }}
              onClick={decrease}
            ></i>
          </div>
        </div>
      </div>

      {/* //Modal */}
      <div>
        <div
          className="modal fade"
          id={`exampleModal${props.id}`}
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Edit Attendance
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-sm-7">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Subject"
                      aria-label="Subject"
                      ref={updatedSubRef}
                      name="Subject"
                      value={subjectDetails.subject}
                    />
                  </div>
                  <div className="col-sm">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Present"
                      aria-label="Present"
                      ref={updatedPresRef}
                    />
                  </div>
                  <div className="col-sm">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Total"
                      aria-label="Total"
                      ref={updatedTotalRef}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  ref={close}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={updatesubjectDetails}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SubjectCard;
