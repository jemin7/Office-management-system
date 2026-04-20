import { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import api from "../api/axios.js";

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchDepartments = async () => {
    try {
      const res = await api.get("/departments");
      setDepartments(res.data.data || []);
    } catch (err) {
      setError("Failed to load departments");
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await api.post("/departments", { name });
      setName("");
      setSuccess("Department added!");
      fetchDepartments();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add department");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.heading}>Departments</h2>

        <div style={styles.grid}>
          {/* Add Form */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Add Department</h3>
            <form onSubmit={handleAdd} style={styles.form}>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={styles.input}
                placeholder="Department name"
                required
              />
              {error && <p style={styles.error}>{error}</p>}
              {success && <p style={styles.success}>{success}</p>}
              <button type="submit" style={styles.btn} disabled={loading}>
                {loading ? "Adding..." : "Add Department"}
              </button>
            </form>
          </div>

          {/* List */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>
              All Departments ({departments.length})
            </h3>
            {departments.length === 0 ? (
              <p style={styles.empty}>No departments yet.</p>
            ) : (
              <div style={styles.list}>
                {departments.map((d) => (
                  <div key={d._id} style={styles.item}>
                    <span style={styles.dot}>●</span>
                    <span style={styles.itemName}>{d.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0f0f0f",
    fontFamily: "'DM Sans', sans-serif",
  },
  container: { maxWidth: "900px", margin: "0 auto", padding: "32px 24px" },
  heading: {
    color: "#fff",
    fontSize: "24px",
    fontWeight: "700",
    margin: "0 0 24px",
    letterSpacing: "-0.5px",
  },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
  card: {
    background: "#1a1a1a",
    border: "1px solid #2a2a2a",
    borderRadius: "12px",
    padding: "24px",
  },
  cardTitle: {
    color: "#fff",
    fontSize: "15px",
    fontWeight: "600",
    margin: "0 0 20px",
  },
  form: { display: "flex", flexDirection: "column", gap: "12px" },
  input: {
    background: "#111",
    border: "1px solid #2a2a2a",
    borderRadius: "8px",
    padding: "10px 14px",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
  },
  error: { margin: 0, color: "#ef4444", fontSize: "13px" },
  success: { margin: 0, color: "#22c55e", fontSize: "13px" },
  btn: {
    background: "#6366f1",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "10px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
  list: { display: "flex", flexDirection: "column", gap: "8px" },
  item: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 12px",
    background: "#111",
    borderRadius: "8px",
  },
  dot: { color: "#6366f1", fontSize: "8px" },
  itemName: { color: "#ddd", fontSize: "14px" },
  empty: { color: "#555", fontSize: "14px" },
};
