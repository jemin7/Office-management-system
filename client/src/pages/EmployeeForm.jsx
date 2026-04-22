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
    password: "",
    role: "user",
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

  useEffect(() => {
    const loadData = async () => {
      try {
        const countryRes = await fetch(`${COUNTRIES_API}/countries`);
        const countryData = await countryRes.json();
        setCountries(countryData.data || []);

        const depRes = await api
          .get("/departments")
          .catch(() => ({ data: { data: [] } }));
        setDepartments(depRes.data.data || []);

        const empRes = await api
          .get("/employees")
          .catch(() => ({ data: { data: [] } }));
        setEmployees(empRes.data.data?.data || empRes.data.data || []);
      } catch (err) {
        console.error("Initial data load error:", err);
      }
    };

    loadData();
  }, []);

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
      .then((res) => res.json())
      .then((data) => {
        const stateList = (data.data?.states || []).map((s) => s.name || s);
        setStates(stateList);
      })
      .catch(() => {
        setStates([]);
      });

    setForm((prev) => ({ ...prev, state: "", city: "" }));
    setCities([]);
  }, [form.country]);

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
      .then((res) => res.json())
      .then((data) => setCities(data.data || []))
      .catch(() => {
        setCities([]);
      });

    setForm((prev) => ({ ...prev, city: "" }));
  }, [form.state, form.country]);

  useEffect(() => {
    if (!isEdit) return;

    api
      .get(`/employees/${id}`)
      .then((res) => {
        const emp = res.data.data;
        setForm((prev) => ({
          ...prev,
          name: emp.name || "",
          email: emp.email || "",
          role: emp.role || "user",
          jobtitle: emp.jobtitle || "",
          department: emp.department?._id || "",
          supervisor: emp.supervisor?._id || "",
          country: emp.country || "",
          state: emp.state || "",
          city: emp.city || "",
          password: "",
        }));
      })
      .catch(() => navigate("/employees"));
  }, [id, isEdit, navigate]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = { ...form };
      if (!payload.supervisor) delete payload.supervisor;
      if (isEdit && !payload.password) delete payload.password;

      if (isEdit) {
        await api.put(`/employees/${id}`, payload);
      } else {
        await api.post("/employees", payload);
      }

      navigate("/employees", { state: { refresh: true } });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.formWrapper}>
        <div style={styles.header}>
          <button style={styles.backBtn} onClick={() => navigate("/employees")}>
            Back
          </button>
          <h1 style={styles.title}>
            {isEdit ? "Edit Employee" : "Add Employee"}
          </h1>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Account</h2>
            <div style={styles.row}>
              <div style={styles.field}>
                <label>Full Name *</label>
                <input
                  style={styles.input}
                  value={form.name}
                  onChange={handleChange("name")}
                  required
                />
              </div>
              <div style={styles.field}>
                <label>Email *</label>
                <input
                  style={styles.input}
                  type="email"
                  value={form.email}
                  onChange={handleChange("email")}
                  required
                />
              </div>
            </div>

            <div style={styles.row}>
              <div style={styles.field}>
                <label>
                  {isEdit ? "Reset Password (optional)" : "Password *"}
                </label>
                <input
                  style={styles.input}
                  type="password"
                  value={form.password}
                  onChange={handleChange("password")}
                  required={!isEdit}
                  minLength={8}
                />
              </div>
              <div style={styles.field}>
                <label>Role *</label>
                <select
                  style={styles.input}
                  value={form.role}
                  onChange={handleChange("role")}
                  required
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Employment</h2>
            <div style={styles.row}>
              <div style={styles.field}>
                <label>Job Title *</label>
                <input
                  style={styles.input}
                  value={form.jobtitle}
                  onChange={handleChange("jobtitle")}
                  required
                />
              </div>
              <div style={styles.field}>
                <label>Department *</label>
                <select
                  style={styles.input}
                  value={form.department}
                  onChange={handleChange("department")}
                  required
                >
                  <option value="">Select department</option>
                  {departments.map((d) => (
                    <option key={d._id} value={d._id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={styles.field}>
              <label>Supervisor (optional)</label>
              <select
                style={styles.input}
                value={form.supervisor}
                onChange={handleChange("supervisor")}
              >
                <option value="">No Supervisor</option>
                {employees
                  .filter((employee) => employee._id !== id)
                  .map((employee) => (
                    <option key={employee._id} value={employee._id}>
                      {employee.name} ({employee.jobtitle || "No Title"})
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Location</h2>
            <div style={styles.row}>
              <div style={styles.field}>
                <label>Country *</label>
                <select
                  style={styles.input}
                  value={form.country}
                  onChange={handleChange("country")}
                  required
                >
                  <option value="">Select country</option>
                  {countries.map((country, index) => (
                    <option key={index} value={country.country}>
                      {country.country}
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.field}>
                <label>State *</label>
                <select
                  style={styles.input}
                  value={form.state}
                  onChange={handleChange("state")}
                  required
                  disabled={!form.country}
                >
                  <option value="">Select state</option>
                  {states.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={styles.field}>
              <label>City *</label>
              <select
                style={styles.input}
                value={form.city}
                onChange={handleChange("city")}
                required
                disabled={!form.state}
              >
                <option value="">Select city</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.submitBtn} disabled={loading}>
            {loading
              ? "Saving..."
              : isEdit
                ? "Update Employee"
                : "Add Employee"}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#1a1a1a",
    color: "#e0e0e0",
    padding: "20px",
  },
  formWrapper: { maxWidth: "900px", margin: "0 auto" },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "30px",
  },
  backBtn: {
    padding: "8px 16px",
    background: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  title: { margin: 0, fontSize: "28px", color: "#fff" },
  form: { backgroundColor: "#252525", padding: "30px", borderRadius: "12px" },
  section: { marginBottom: "40px" },
  sectionTitle: { fontSize: "20px", marginBottom: "15px", color: "#ccc" },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginBottom: "20px",
  },
  field: { marginBottom: "15px" },
  input: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#333",
    color: "#fff",
    border: "1px solid #555",
    borderRadius: "6px",
    fontSize: "16px",
  },
  submitBtn: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "18px",
    cursor: "pointer",
    marginTop: "20px",
  },
  error: { color: "#ff6b6b", textAlign: "center", margin: "15px 0" },
};
