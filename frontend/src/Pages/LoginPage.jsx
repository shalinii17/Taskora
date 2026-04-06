import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      let data;
      try {
        data = await response.json();
      } catch {
        setError("Unexpected server response. Please try again.");
        return;
      }

      if (!response.ok) {
        setError(data.message || "Login failed. Please try again.");
        return;
      }

      localStorage.setItem("token", data.token);
      onLogin();
      navigate("/dashboard");
    } catch (err) {
      setError("Could not connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <header style={styles.header}>
          <h1 style={styles.logo}>Taskora</h1>
          <p style={styles.subtitle}>Welcome back. Please enter your details.</p>
        </header>

        {error && <div style={styles.errorBox}>⚠️ {error}</div>}

        <div style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              style={styles.input}
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            style={{ ...styles.primaryButton, opacity: loading ? 0.7 : 1 }}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </div>

        <footer style={styles.footer}>
          <span>Don't have an account?</span>
          <button style={styles.linkButton} onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </footer>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    fontFamily: "'Inter', sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    padding: "40px",
    backgroundColor: "#1e293b",
    borderRadius: "16px",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
  },
  header: {
    textAlign: "center",
    marginBottom: "32px",
  },
  logo: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#f8fafc",
    letterSpacing: "-0.5px",
    margin: "0 0 8px 0",
  },
  subtitle: {
    fontSize: "14px",
    color: "#94a3b8",
    margin: 0,
  },
  errorBox: {
    padding: "12px",
    marginBottom: "20px",
    backgroundColor: "rgba(220, 38, 38, 0.1)",
    color: "#fca5a5",
    fontSize: "13px",
    borderRadius: "8px",
    border: "1px solid rgba(220, 38, 38, 0.2)",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#cbd5e1",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  input: {
    padding: "12px 16px",
    borderRadius: "10px",
    backgroundColor: "#0f172a",
    border: "1px solid #334155",
    color: "#f8fafc",
    fontSize: "15px",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  primaryButton: {
    marginTop: "8px",
    padding: "14px",
    backgroundColor: "#38bdf8",
    color: "#0f172a",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "opacity 0.2s",
  },
  footer: {
    marginTop: "32px",
    textAlign: "center",
    fontSize: "14px",
    color: "#94a3b8",
  },
  linkButton: {
    background: "none",
    border: "none",
    color: "#38bdf8",
    fontWeight: "600",
    cursor: "pointer",
    marginLeft: "5px",
    padding: 0,
  },
};

export default LoginPage;