import { Link } from "react-router-dom";

function Header({ isLoggedIn, onLogout }) {
  return (
    <header style={styles.header}>
      <div style={styles.container}>
        {/* Logo Section */}
        <div style={styles.logo}>
          Taskora<span style={styles.dot}>.</span>
        </div>

        {/* Navigation Section */}
        <nav style={styles.nav}>
          <Link to="/" style={styles.link}>Home</Link>
          
          {!isLoggedIn ? (
            <div style={styles.authLinks}>
              <Link to="/login" style={styles.link}>Login</Link>
              <Link to="/signup" style={styles.signupBtn}>Get Started</Link>
            </div>
          ) : (
            <div style={styles.authLinks}>
              <Link to="/dashboard" style={styles.link}>Dashboard</Link>
              <button onClick={onLogout} style={styles.logoutBtn}>Logout</button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: "#0f172a", // Matches our "Midnight" background
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    padding: "0 24px",
    height: "72px",
    display: "flex",
    alignItems: "center",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "800",
    color: "#f8fafc",
    letterSpacing: "-0.5px",
    cursor: "pointer",
  },
  dot: {
    color: "#38bdf8", // Our Sky Blue accent
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: "32px",
  },
  authLinks: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  link: {
    color: "#94a3b8",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
    transition: "color 0.2s",
  },
  signupBtn: {
    backgroundColor: "#38bdf8",
    color: "#0f172a",
    padding: "8px 16px",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "700",
    transition: "transform 0.1s",
  },
  logoutBtn: {
    background: "none",
    border: "1px solid #334155",
    color: "#f87171", // Soft red for "danger/exit" actions
    padding: "8px 16px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default Header;