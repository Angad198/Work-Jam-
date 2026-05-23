import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://127.0.0.1:5000";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  function handleLogin() {
    if (!username || !password) {
      setMsg("Please fill all fields");
      return;
    }

    fetch(`${API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.role === "admin") {
          localStorage.setItem("username", username);
          localStorage.setItem("role", "admin");
          navigate("/admin");
        } else if (data.role === "employee") {
          localStorage.setItem("username", username);
          localStorage.setItem("role", "employee");
          navigate("/employee");
        } else {
          setMsg("Invalid credentials");
        }
      })
      .catch(() => {
        setMsg("Backend server not running");
      });
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>HR System Login</h2>

        <input
          placeholder="Username"
          style={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>

        <p style={styles.msg}>{msg}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a"
  },
  card: {
    padding: "40px",
    borderRadius: "16px",
    background: "#1e293b",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "330px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
  },
  title: {
    color: "white",
    textAlign: "center"
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    outline: "none"
  },
  button: {
    padding: "12px",
    background: "#38bdf8",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
  },
  msg: {
    color: "#f87171",
    textAlign: "center"
  }
};