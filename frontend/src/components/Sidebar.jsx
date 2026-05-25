import {
  FaUsers,
  FaCalendarAlt,
  FaClock,
  FaClipboardList,
  FaHome,
  FaSignOutAlt
} from "react-icons/fa";

import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <h2 style={styles.logo}>
        HR System
      </h2>

      <div style={styles.menu}>

        <Link to="/admin" style={styles.link}>
          <FaHome /> Dashboard
        </Link>

        <Link to="/employees" style={styles.link}>
          <FaUsers /> Employees
        </Link>

        <Link to="/shifts" style={styles.link}>
          <FaCalendarAlt /> Shifts
        </Link>

        <Link to="/attendance" style={styles.link}>
          <FaClock /> Attendance
        </Link>

        <Link to="/requests" style={styles.link}>
          <FaClipboardList /> Requests
        </Link>

        <Link to="/" style={styles.logout}>
          <FaSignOutAlt /> Logout
        </Link>

      </div>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "260px",
    background: "#111827",
    padding: "30px",
    display: "flex",
    flexDirection: "column"
  },

  logo: {
    marginBottom: "40px",
    color: "#38bdf8"
  },

  menu: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },

  link: {
    color: "white",
    textDecoration: "none",
    display: "flex",
    gap: "12px",
    alignItems: "center",
    fontSize: "17px"
  },

  logout: {
    color: "#ef4444",
    textDecoration: "none",
    display: "flex",
    gap: "12px",
    alignItems: "center",
    marginTop: "30px"
  }
};