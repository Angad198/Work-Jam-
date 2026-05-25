import { useEffect, useState } from "react";
import Layout from "../components/Layout";

const API = "http://127.0.0.1:5000";

export default function Employee() {
  const username =
    localStorage.getItem("username");

  const [shifts, setShifts] = useState([]);
  const [attendance, setAttendance] =
    useState([]);

  const [reason, setReason] =
    useState("");

  // Load shifts
  function loadShifts() {
    fetch(`${API}/shifts`)
      .then((res) => res.json())
      .then((data) => {
        const myShifts =
          data.filter(
            (s) =>
              s.employee === username
          );

        setShifts(myShifts);
      });
  }

  // Attendance
  function loadAttendance() {
    fetch(`${API}/attendance`)
      .then((res) => res.json())
      .then((data) => {
        const mine =
          data.filter(
            (a) =>
              a.user === username
          );

        setAttendance(mine);
      });
  }

  function clockIn() {
    saveAttendance("Clock In");
  }

  function clockOut() {
    saveAttendance("Clock Out");
  }

  function saveAttendance(type) {
    fetch(`${API}/attendance`, {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json"
      },

      body: JSON.stringify({
        user: username,
        type: type,
        time:
          new Date().toLocaleTimeString(),
        date:
          new Date().toLocaleDateString()
      })
    }).then(() =>
      loadAttendance()
    );
  }

  // Shift request
  function sendRequest() {
    if (!reason) {
      alert("Enter reason");
      return;
    }

    alert(
      "Shift request sent ✔"
    );

    setReason("");
  }

  useEffect(() => {
    loadShifts();
    loadAttendance();
  }, []);

  return (
    <Layout title="Employee Dashboard">

      <h2>
        Welcome {username} 👋
      </h2>

      {/* Cards */}
      <div style={styles.grid}>
        <div style={styles.card}>
          <h3>Clock In / Out</h3>

          <button
            style={styles.btn}
            onClick={clockIn}
          >
            Clock In
          </button>

          <button
            style={styles.btn2}
            onClick={clockOut}
          >
            Clock Out
          </button>
        </div>

        <div style={styles.card}>
          <h3>My Shifts</h3>

          {shifts.length === 0 ? (
            <p>No shifts</p>
          ) : (
            shifts.map((shift) => (
              <p key={shift.id}>
                📅 {shift.date}
                <br />
                ⏰ {shift.start}
                -
                {shift.end}
              </p>
            ))
          )}
        </div>
      </div>

      {/* Attendance */}
      <div style={styles.card}>
        <h3>
          Attendance History
        </h3>

        {attendance.map(
          (item, index) => (
            <p key={index}>
              {item.date} |
              {item.type} |
              {item.time}
            </p>
          )
        )}
      </div>

      {/* Request */}
      <div style={styles.card}>
        <h3>
          Request Shift Change
        </h3>

        <textarea
          placeholder="Reason..."
          value={reason}
          onChange={(e) =>
            setReason(
              e.target.value
            )
          }
          style={styles.textarea}
        />

        <button
          style={styles.btn}
          onClick={sendRequest}
        >
          Send Request
        </button>
      </div>

    </Layout>
  );
}

const styles = {
  grid: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
    flexWrap: "wrap"
  },

  card: {
    background: "#1e293b",
    padding: "25px",
    borderRadius: "16px",
    marginTop: "20px"
  },

  btn: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    background: "#38bdf8",
    cursor: "pointer",
    marginRight: "10px"
  },

  btn2: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    background: "#ef4444",
    color: "white",
    cursor: "pointer"
  },

  textarea: {
    width: "100%",
    height: "100px",
    borderRadius: "10px",
    padding: "10px",
    marginTop: "10px"
  }
};