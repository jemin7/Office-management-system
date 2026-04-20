import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/axios";

const COUNTRIES_API = "https://countriesnow.space/api/v0.1";

export default function EmployeeForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    jobtitle: "",
    department: "",
    supervisor: "",
    country: "",
    state: "",
    city: "",
  });

  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch dropdowns
  useEffect(() => {
    const init = async () => {
      try {
        const [dRes, eRes, cRes] = await Promise.all([
          api.get("/departments"),
          api.get("/employees", { params: { limit: 100 } }),
          fetch(`${COUNTRIES_API}/countries`).then((r) => r.json()),
        ]);
        setDepartments(dRes.data.data || []);
        setEmployees(eRes.data.data?.data || []);
        setCountries(cRes.data || []);
      } catch (_) {}
    };
    init();
  }, []);

  // Fetch states when country changes
  useEffect(() => {
    if (!form.country) {
      setStates([]);
      setCities([]);
      return;
    }
    fetch(`${COUNTRIES_API}/countries/states`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country: form.country }),
    })
      .then((r) => r.json())
      .then((data) => setStates(data.data?.states || []))
      .catch(() => setStates([]));
    setForm((f) => ({ ...f, state: "", city: "" }));
    setCities([]);
  }, [form.country]);

  // Fetch cities when state changes
  useEffect(() => {
    if (!form.country || !form.state) {
      setCities([]);
      return;
    }
    fetch(`${COUNTRIES_API}/countries/state/cities`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country: form.country, state: form.state }),
    })
      .then((r) => r.json())
      .then((data) => setCities(data.data || []))
      .catch(() => setCities([]));
    setForm((f) => ({ ...f, city: "" }));
  }, [form.state]);

  // Load existing employee if editing
  useEffect(() => {
    if (!isEdit) return;
    api
      .get(`/employees/${id}`)
      .then((res) => {
        const emp = res.data.data;
        setForm({
          name: emp.name,
          email: emp.email,
          jobtitle: emp.jobtitle,
          department: emp.department?._id || "",
          supervisor: emp.supervisor?._id || "",
          country: emp.country,
          state: emp.state,
          city: emp.city,
        });
      })
      .catch(() => navigate("/employees"));
  }, [id]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const payload = { ...form };
      if (!payload.supervisor) payload.supervisor = null;
      if (isEdit) {
        await api.put(`/employees/${id}`, payload);
      } else {
        await api.post("/employees", payload);
      }
      navigate("/employees");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.header}>
          <button style={styles.back} onClick={() => navigate("/employees")}>
            ← Back
          </button>
          <h2 style={styles.heading}>
            {isEdit ? "Edit Employee" : "Add Employee"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Personal Info</h3>
            <div style={styles.row}>
              <Field label="Full Name" required>
                <input
                  style={styles.input}
                  value={form.name}
                  onChange={set("name")}
                  placeholder="John Doe"
                  required
                />
              </Field>
              <Field label="Email" required>
                <input
                  style={styles.input}
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  placeholder="john@company.com"
                  required
                />
              </Field>
            </div>
            <div style={styles.row}>
              <Field label="Job Title" required>
                <input
                  style={styles.input}
                  value={form.jobtitle}
                  onChange={set("jobtitle")}
                  placeholder="Software Engineer"
                  required
                />
              </Field>
              <Field label="Department" required>
                <select
                  style={styles.input}
                  value={form.department}
                  onChange={set("department")}
                  required
                >
                  <option value="">Select department</option>
                  {departments.map((d) => (
                    <option key={d._id} value={d._id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            <div style={{ ...styles.row, gridTemplateColumns: "1fr" }}>
              <Field label="Supervisor (optional)">
                <select
                  style={styles.input}
                  value={form.supervisor}
                  onChange={set("supervisor")}
                >
                  <option value="">No supervisor</option>
                  {employees
                    .filter((e) => e._id !== id)
                    .map((e) => (
                      <option key={e._id} value={e._id}>
                        {e.name} — {e.jobtitle}
                      </option>
                    ))}
                </select>
              </Field>
            </div>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Location</h3>
            <div style={styles.row}>
              <Field label="Country" required>
                <select
                  style={styles.input}
                  value={form.country}
                  onChange={set("country")}
                  required
                >
                  <option value="">Select country</option>
                  {countries.map((c) => (
                    <option key={c.country} value={c.country}>
                      {c.country}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="State / Province" required>
                <select
                  style={styles.input}
                  value={form.state}
                  onChange={set("state")}
                  required
                  disabled={!form.country}
                >
                  <option value="">Select state</option>
                  {states.map((s) => (
                    <option key={s.name} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            <div style={{ ...styles.row, gridTemplateColumns: "1fr" }}>
              <Field label="City" required>
                <select
                  style={styles.input}
                  value={form.city}
                  onChange={set("city")}
                  required
                  disabled={!form.state}
                >
                  <option value="">Select city</option>
                  {cities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <div style={styles.btnRow}>
            <button
              type="button"
              style={styles.cancelBtn}
              onClick={() => navigate("/employees")}
            >
              Cancel
            </button>
            <button type="submit" style={styles.submitBtn} disabled={loading}>
              {loading
                ? "Saving..."
                : isEdit
                  ? "Update Employee"
                  : "Add Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label style={{ fontSize: "13px", fontWeight: "500", color: "#aaa" }}>
        {label} {required && <span style={{ color: "#6366f1" }}>*</span>}
      </label>
      {children}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0f0f0f",
    fontFamily: "'DM Sans', sans-serif",
  },
  container: { maxWidth: "720px", margin: "0 auto", padding: "32px 24px" },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "28px",
  },
  back: {
    background: "none",
    border: "none",
    color: "#666",
    fontSize: "14px",
    cursor: "pointer",
    padding: 0,
  },
  heading: {
    color: "#fff",
    fontSize: "22px",
    fontWeight: "700",
    margin: 0,
    letterSpacing: "-0.5px",
  },
  form: { display: "flex", flexDirection: "column", gap: "24px" },
  section: {
    background: "#1a1a1a",
    border: "1px solid #2a2a2a",
    borderRadius: "12px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: "14px",
    fontWeight: "600",
    margin: "0 0 4px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
  input: {
    background: "#111",
    border: "1px solid #2a2a2a",
    borderRadius: "8px",
    padding: "10px 14px",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  },
  error: { color: "#ef4444", fontSize: "13px", margin: 0 },
  btnRow: { display: "flex", gap: "12px", justifyContent: "flex-end" },
  cancelBtn: {
    background: "#1a1a1a",
    border: "1px solid #2a2a2a",
    color: "#888",
    borderRadius: "8px",
    padding: "10px 20px",
    fontSize: "14px",
    cursor: "pointer",
  },
  submitBtn: {
    background: "#6366f1",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 24px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
};
