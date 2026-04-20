import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/axios";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState(false);
  const limit = 10;

  const navigate = useNavigate();
  const location = useLocation();

  const fetchDepartments = async () => {
    try {
      const res = await api.get("/departments");
      setDepartments(res.data.data || []);
    } catch (_) {
      console.error("Failed to load departments");
    }
  };

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const params = { page, limit };
      if (search) params.search = search;
      if (department) params.department = department;

      const res = await api.get("/employees", { params });
      setEmployees(res.data.data?.data || res.data.data || []);
      setTotal(res.data.data?.total || 0);
    } catch (err) {
      console.error("Failed to fetch employees:", err);
      setEmployees([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [page, department, search]);

  useEffect(() => {
    const { refresh } = location.state || {};
    if (refresh) {
      fetchEmployees();

      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchEmployees();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this employee?")) return;
    try {
      await api.delete(`/employees/${id}`);
      fetchEmployees();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.heading}>
            Employees <span style={styles.count}>{total}</span>
          </h2>
          <button
            style={styles.addBtn}
            onClick={() => navigate("/employees/new")}
          >
            + Add Employee
          </button>
        </div>

        {/* Filters */}
        <div style={styles.filters}>
          <form onSubmit={handleSearch} style={styles.searchRow}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput}
              placeholder="Search by name or email..."
            />
            <button type="submit" style={styles.searchBtn}>
              Search
            </button>
          </form>
          <select
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              setPage(1);
            }}
            style={styles.select}
          >
            <option value="">All Departments</option>
            {departments.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                {[
                  "Name",
                  "Email",
                  "Job Title",
                  "Department",
                  "Supervisor",
                  "Location",
                  "Actions",
                ].map((h) => (
                  <th key={h} style={styles.th}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} style={styles.empty}>
                    Loading...
                  </td>
                </tr>
              ) : employees.length === 0 ? (
                <tr>
                  <td colSpan={7} style={styles.empty}>
                    No employees found.
                  </td>
                </tr>
              ) : (
                employees.map((emp) => (
                  <tr key={emp._id} style={styles.tr}>
                    <td style={styles.td}>
                      <div style={styles.avatar}>{emp.name?.[0] || "?"}</div>
                      <span style={styles.name}>{emp.name}</span>
                    </td>
                    <td style={styles.td}>
                      <span style={styles.muted}>{emp.email}</span>
                    </td>
                    <td style={styles.td}>{emp.jobtitle}</td>
                    <td style={styles.td}>
                      <span style={styles.badge}>
                        {emp.department?.name || "—"}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <span style={styles.muted}>
                        {emp.supervisor?.name || "—"}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <span style={styles.muted}>
                        {emp.city && emp.country
                          ? `${emp.city}, ${emp.country}`
                          : "—"}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.actions}>
                        <button
                          style={styles.editBtn}
                          onClick={() => navigate(`/employees/${emp._id}/edit`)}
                        >
                          Edit
                        </button>
                        <button
                          style={styles.deleteBtn}
                          onClick={() => handleDelete(emp._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={styles.pagination}>
            <button
              style={styles.pageBtn}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              ← Prev
            </button>
            <span style={styles.pageInfo}>
              Page {page} of {totalPages}
            </span>
            <button
              style={styles.pageBtn}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next →
            </button>
          </div>
        )}
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
  container: { maxWidth: "1200px", margin: "0 auto", padding: "32px 24px" },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "24px",
  },
  heading: {
    color: "#fff",
    fontSize: "24px",
    fontWeight: "700",
    margin: 0,
    letterSpacing: "-0.5px",
  },
  count: {
    background: "#252525",
    color: "#888",
    fontSize: "14px",
    padding: "2px 10px",
    borderRadius: "20px",
    marginLeft: "10px",
    fontWeight: "500",
  },
  addBtn: {
    background: "#6366f1",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 18px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
  filters: { display: "flex", gap: "12px", marginBottom: "20px" },
  searchRow: { display: "flex", gap: "8px", flex: 1 },
  searchInput: {
    flex: 1,
    background: "#1a1a1a",
    border: "1px solid #2a2a2a",
    borderRadius: "8px",
    padding: "9px 14px",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
  },
  searchBtn: {
    background: "#252525",
    color: "#fff",
    border: "1px solid #2a2a2a",
    borderRadius: "8px",
    padding: "9px 16px",
    fontSize: "14px",
    cursor: "pointer",
  },
  select: {
    background: "#1a1a1a",
    border: "1px solid #2a2a2a",
    borderRadius: "8px",
    padding: "9px 14px",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    minWidth: "180px",
  },
  tableWrap: {
    background: "#1a1a1a",
    border: "1px solid #2a2a2a",
    borderRadius: "12px",
    overflow: "hidden",
  },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    padding: "12px 16px",
    textAlign: "left",
    fontSize: "12px",
    fontWeight: "600",
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    borderBottom: "1px solid #2a2a2a",
  },
  tr: { borderBottom: "1px solid #1f1f1f" },
  td: {
    padding: "12px 16px",
    fontSize: "14px",
    color: "#ddd",
    verticalAlign: "middle",
  },
  avatar: {
    display: "inline-flex",
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    background: "#6366f1",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "700",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "10px",
    verticalAlign: "middle",
  },
  name: { fontWeight: "500", color: "#fff" },
  muted: { color: "#777", fontSize: "13px" },
  badge: {
    background: "#1e1e3a",
    color: "#818cf8",
    fontSize: "12px",
    padding: "3px 10px",
    borderRadius: "20px",
    fontWeight: "500",
  },
  actions: { display: "flex", gap: "6px" },
  editBtn: {
    background: "#252525",
    color: "#fff",
    border: "1px solid #333",
    borderRadius: "6px",
    padding: "4px 12px",
    fontSize: "12px",
    cursor: "pointer",
  },
  deleteBtn: {
    background: "transparent",
    color: "#ef4444",
    border: "1px solid #3a1a1a",
    borderRadius: "6px",
    padding: "4px 12px",
    fontSize: "12px",
    cursor: "pointer",
  },
  empty: {
    textAlign: "center",
    padding: "40px",
    color: "#555",
    fontSize: "14px",
  },
  pagination: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    marginTop: "24px",
  },
  pageBtn: {
    background: "#1a1a1a",
    border: "1px solid #2a2a2a",
    color: "#ddd",
    borderRadius: "8px",
    padding: "8px 16px",
    fontSize: "13px",
    cursor: "pointer",
  },
  pageInfo: { color: "#666", fontSize: "14px" },
};
