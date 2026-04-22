import { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import api from "../api/axios.js";
import { isAdmin } from "../utils/auth";

export default function Departments() {
  const admin = isAdmin();
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState("");
  const [editName, setEditName] = useState("");
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

  const handleEditStart = (department) => {
    setEditId(department._id);
    setEditName(department.name);
    setError("");
    setSuccess("");
  };

  const handleEditCancel = () => {
    setEditId("");
    setEditName("");
  };

  const handleEditSave = async (id) => {
    if (!editName.trim()) {
      setError("Department name is required");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await api.put(`/departments/${id}`, { name: editName });
      setSuccess("Department updated!");
      setEditId("");
      setEditName("");
      fetchDepartments();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update department");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this department?")) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await api.delete(`/departments/${id}`);
      setSuccess("Department deleted!");
      if (editId === id) {
        setEditId("");
        setEditName("");
      }
      fetchDepartments();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete department");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.heading}>Departments</h2>
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}

        <div
          style={{
            ...styles.grid,
            gridTemplateColumns: admin ? "1fr 1fr" : "1fr",
          }}
        >
          {/* Add Form */}
          {admin && (
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
                <button type="submit" style={styles.btn} disabled={loading}>
                  {loading ? "Adding..." : "Add Department"}
                </button>
              </form>
            </div>
          )}

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
                    {editId === d._id ? (
                      <>
                        <input
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          style={{ ...styles.input, flex: 1 }}
                          disabled={loading}
                        />
                        <div style={styles.actions}>
                          <button
                            style={styles.editBtn}
                            onClick={() => handleEditSave(d._id)}
                            disabled={loading}
                          >
                            Save
                          </button>
                          <button
                            style={styles.deleteBtn}
                            onClick={handleEditCancel}
                            disabled={loading}
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <span style={styles.itemName}>{d.name}</span>
                        {admin && (
                          <div style={styles.actions}>
                            <button
                              style={styles.editBtn}
                              onClick={() => handleEditStart(d)}
                              disabled={loading}
                            >
                              Edit
                            </button>
                            <button
                              style={styles.deleteBtn}
                              onClick={() => handleDelete(d._id)}
                              disabled={loading}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </>
                    )}
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
  grid: { display: "grid", gap: "20px" },
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
  actions: { display: "flex", gap: "6px", marginLeft: "auto" },
  editBtn: {
    background: "#252525",
    color: "#fff",
    border: "1px solid #2a2a2a",
    borderRadius: "6px",
    padding: "6px 10px",
    fontSize: "12px",
    cursor: "pointer",
  },
  deleteBtn: {
    background: "#3b1111",
    color: "#fca5a5",
    border: "1px solid #7f1d1d",
    borderRadius: "6px",
    padding: "6px 10px",
    fontSize: "12px",
    cursor: "pointer",
  },
  dot: { color: "#6366f1", fontSize: "8px" },
  itemName: { color: "#ddd", fontSize: "14px" },
  empty: { color: "#555", fontSize: "14px" },
};
