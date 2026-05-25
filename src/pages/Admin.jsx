import Layout from "../components/Layout";
import StatCard from "../components/StatCard";

export default function Admin() {
  return (
    <Layout title="Dashboard">

      <div style={styles.grid}>
        <StatCard
          title="Employees"
          value="14"
        />

        <StatCard
          title="Shifts"
          value="28"
        />

        <StatCard
          title="Attendance"
          value="93%"
        />
      </div>

    </Layout>
  );
}

const styles = {
  grid: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap"
  }
};