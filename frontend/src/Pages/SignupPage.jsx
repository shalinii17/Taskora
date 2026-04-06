import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setError("");

    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });

      let data;
      try {
        data = await response.json();
      } catch {
        setError("Unexpected server response. Please try again.");
        return;
      }

      if (!response.ok) {
        setError(data.message || "Signup failed. Please try again.");
        return;
      }

      navigate("/login");
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
          <p style={styles.subtitle}>Join us and start organizing your tasks.</p>
        </header>

        {error && <div style={styles.errorBox}>⚠️ {error}</div>}

        <div style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              style={styles.input}
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
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
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </div>

        <footer style={styles.footer}>
          <span>Already have an account?</span>
          <button style={styles.linkButton} onClick={() => navigate("/login")}>
            Login here
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
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
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
    gap: "20px",
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
    transition: "border-color 0.2s",
  },
  primaryButton: {
    marginTop: "10px",
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

export default SignupPage;