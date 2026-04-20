import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navLink = (path, label) => ({
    ...styles.link,
    ...(location.pathname.startsWith(path) ? styles.active : {}),
  });

  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>
        <span style={styles.icon}>◈</span>
        <span style={styles.name}>OfficeSys</span>
      </div>
      <div style={styles.links}>
        <button
          style={navLink("/employees")}
          onClick={() => navigate("/employees")}
        >
          Employees
        </button>
        <button
          style={navLink("/departments")}
          onClick={() => navigate("/departments")}
        >
          Departments
        </button>
      </div>
      <button style={styles.logout} onClick={logout}>
        Logout
      </button>
    </nav>
  );
}

const styles = {
  nav: {
    background: "#1a1a1a",
    borderBottom: "1px solid #2a2a2a",
    padding: "0 32px",
    height: "56px",
    display: "flex",
    alignItems: "center",
    gap: "32px",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginRight: "16px",
  },
  icon: { fontSize: "18px", color: "#6366f1" },
  name: {
    fontWeight: "700",
    color: "#fff",
    fontSize: "16px",
    letterSpacing: "-0.3px",
  },
  links: { display: "flex", gap: "4px", flex: 1 },
  link: {
    background: "none",
    border: "none",
    color: "#888",
    fontSize: "14px",
    fontWeight: "500",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  active: { background: "#252525", color: "#fff" },
  logout: {
    background: "none",
    border: "1px solid #2a2a2a",
    color: "#888",
    fontSize: "13px",
    padding: "6px 14px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
