export default function StatCard({
  title,
  value
}) {
  return (
    <div style={styles.card}>
      <h3>{title}</h3>
      <h1>{value}</h1>
    </div>
  );
}

const styles = {
  card: {
    background: "#1e293b",
    padding: "25px",
    borderRadius: "16px",
    minWidth: "230px",
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.2)"
  }
};