import { useEffect, useState } from "react";
import Layout from "../components/Layout";

const API = "http://127.0.0.1:5000";

export default function Employees() {
  const [employees, setEmployees] =
    useState([]);

  const [name, setName] =
    useState("");

  const [role, setRole] =
    useState("");

  // Load Employees
  function loadEmployees() {
    fetch(`${API}/employees`)
      .then((res) => res.json())
      .then((data) =>
        setEmployees(data)
      );
  }

  // Add Employee
  function addEmployee() {
    if (!name || !role) {
      alert(
        "Please fill all fields"
      );
      return;
    }

    fetch(`${API}/employees`, {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json"
      },

      body: JSON.stringify({
        name,
        role
      })
    }).then(() => {
      setName("");
      setRole("");

      loadEmployees();
    });
  }

  // Delete Employee
  function deleteEmployee(id) {
    fetch(
      `${API}/employees/${id}`,
      {
        method: "DELETE"
      }
    ).then(() =>
      loadEmployees()
    );
  }

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <Layout title="Employees">

      {/* Add Employee */}
      <div style={styles.card}>
        <h2>
          Add Employee
        </h2>

        <div style={styles.row}>
          <input
            placeholder="Employee Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            style={styles.input}
          />

          <input
            placeholder="Role"
            value={role}
            onChange={(e) =>
              setRole(
                e.target.value
              )
            }
            style={styles.input}
          />

          <button
            onClick={addEmployee}
            style={styles.addBtn}
          >
            Add
          </button>
        </div>
      </div>

      {/* Employee Table */}
      <div style={styles.card}>
        <h2>
          Employee List
        </h2>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.map(
              (emp) => (
                <tr key={emp.id}>
                  <td>
                    {emp.name}
                  </td>

                  <td>
                    {emp.role}
                  </td>

                  <td>
                    <button
                      style={
                        styles.deleteBtn
                      }
                      onClick={() =>
                        deleteEmployee(
                          emp.id
                        )
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

    </Layout>
  );
}

const styles = {
  card: {
    background: "#1e293b",
    padding: "25px",
    borderRadius: "16px",
    marginBottom: "25px"
  },

  row: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap"
  },

  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    flex: 1
  },

  addBtn: {
    background: "#38bdf8",
    border: "none",
    padding: "12px 20px",
    borderRadius: "10px",
    cursor: "pointer"
  },

  deleteBtn: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "10px 14px",
    borderRadius: "8px",
    cursor: "pointer"
  },

  table: {
    width: "100%",
    marginTop: "20px",
    borderCollapse: "collapse",
    color: "white"
  }
};