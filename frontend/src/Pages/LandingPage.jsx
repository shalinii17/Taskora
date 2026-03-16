import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={styles.pageWrapper}>
      <main style={styles.container}>
        <section style={styles.hero}>
          {/* Badge */}
          <div style={styles.badge}>v1.0 is now live</div>
          
          {/* Main Headline */}
          <h1 style={styles.title}>
            Master your workflow with <span style={styles.accent}>Taskora.</span>
          </h1>
          
          {/* Subtext */}
          <p style={styles.subtitle}>
            The minimalist task manager designed for engineers and creators. 
            Organize your projects, stay focused, and hit your deadlines without the clutter.
          </p>

          {/* Call to Actions */}
          <div style={styles.ctaGroup}>
            <button 
              style={styles.primaryBtn} 
              onClick={() => navigate("/signup")}
            >
              Get Started for Free
            </button>
            <button 
              style={styles.secondaryBtn} 
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
          </div>
        </section>

        {/* Feature Highlights */}
        <div style={styles.featureGrid}>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>✦</div>
            <h3 style={styles.featureTitle}>Lightning Fast</h3>
            <p style={styles.featureText}>Designed for speed. Add and organize tasks in seconds.</p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>◈</div>
            <h3 style={styles.featureTitle}>Priority Focus</h3>
            <p style={styles.featureText}>Clearly see what matters most with built-in priority levels.</p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>◉</div>
            <h3 style={styles.featureTitle}>Modern Design</h3>
            <p style={styles.featureText}>A clean, midnight dark interface that is gentle on your eyes.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  pageWrapper: {
    minHeight: "calc(100vh - 72px)", // Subtracting header height
    backgroundColor: "#0f172a",
    color: "#f8fafc",
    fontFamily: "'Inter', sans-serif",
    display: "flex",
    alignItems: "center",
    padding: "40px 20px",
  },
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    textAlign: "center",
  },
  hero: {
    marginBottom: "80px",
  },
  badge: {
    display: "inline-block",
    padding: "6px 14px",
    backgroundColor: "rgba(56, 189, 248, 0.1)",
    color: "#38bdf8",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "700",
    marginBottom: "24px",
    border: "1px solid rgba(56, 189, 248, 0.2)",
    textTransform: "uppercase",
  },
  title: {
    fontSize: "clamp(40px, 8vw, 64px)", // Responsive text size
    fontWeight: "800",
    lineHeight: "1.1",
    marginBottom: "24px",
    letterSpacing: "-2px",
  },
  accent: {
    color: "#38bdf8",
  },
  subtitle: {
    fontSize: "18px",
    color: "#94a3b8",
    maxWidth: "600px",
    margin: "0 auto 40px",
    lineHeight: "1.6",
  },
  ctaGroup: {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  primaryBtn: {
    backgroundColor: "#38bdf8",
    color: "#0f172a",
    padding: "16px 32px",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "700",
    border: "none",
    cursor: "pointer",
    transition: "transform 0.1s ease",
  },
  secondaryBtn: {
    backgroundColor: "transparent",
    color: "#f8fafc",
    padding: "16px 32px",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "600",
    border: "1px solid #334155",
    cursor: "pointer",
  },
  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "24px",
    marginTop: "40px",
  },
  featureCard: {
    padding: "32px",
    backgroundColor: "#1e293b",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    textAlign: "left",
  },
  featureIcon: {
    fontSize: "24px",
    color: "#38bdf8",
    marginBottom: "16px",
  },
  featureTitle: {
    fontSize: "18px",
    fontWeight: "700",
    marginBottom: "12px",
  },
  featureText: {
    fontSize: "14px",
    color: "#94a3b8",
    lineHeight: "1.5",
  }
};

export default LandingPage;