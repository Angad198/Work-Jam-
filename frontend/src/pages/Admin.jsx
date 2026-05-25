import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";

export default function Admin() {
  return (
    <div style={styles.container}>
      <Sidebar />

      <div style={styles.main}>
        <Navbar />

        <h1 style={styles.heading}>Dashboard</h1>

        <div style={styles.cardGrid}>
          <DashboardCard title="Employees" number="14" />
          <DashboardCard title="Shifts" number="28" />
          <DashboardCard title="Attendance" number="93%" />
        </div>

        <div style={styles.section}>
          <h2>Recent Activity</h2>

          <div style={styles.activityCard}>
            <p>✅ John clocked in</p>
            <p>📅 Shift assigned to Harry</p>
            <p>🔄 Shift request pending</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    background: "#0f172a",
    minHeight: "100vh",
    color: "white"
  },

  main: {
    flex: 1,
    padding: "30px"
  },

  heading: {
    marginTop: "20px",
    marginBottom: "20px"
  },

  cardGrid: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap"
  },

  section: {
    marginTop: "30px"
  },

  activityCard: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "14px"
  }
};