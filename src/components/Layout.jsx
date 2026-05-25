import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({
  title,
  children
}) {
  return (
    <div style={styles.container}>
      <Sidebar />

      <div style={styles.main}>
        <Navbar />

        <h1 style={styles.heading}>
          {title}
        </h1>

        {children}
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
    marginTop: "25px",
    marginBottom: "25px"
  }
};