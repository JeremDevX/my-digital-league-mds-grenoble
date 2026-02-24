"use client";

import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function TestAuthPage() {
  const { data: session, status } = useSession();
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const callApi = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/me");
      const data = await res.json();
      setApiResponse(JSON.stringify(data, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "monospace", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Auth Test Page</h1>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Session (client-side via useSession)</h2>
        <p>Status: <strong>{status}</strong></p>
        {session ? (
          <pre style={preStyle}>{JSON.stringify(session, null, 2)}</pre>
        ) : (
          <p style={{ color: "#aaa" }}>No session.</p>
        )}
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>GET /api/me (protected route)</h2>
        <button onClick={callApi} disabled={loading} style={buttonStyle}>
          {loading ? "Calling..." : "Call /api/me"}
        </button>
        {apiResponse && (
          <pre style={preStyle}>{apiResponse}</pre>
        )}
      </section>

      <section>
        {session ? (
          <button onClick={() => signOut({ callbackUrl: "/auth/login" })} style={dangerButtonStyle}>
            Sign out
          </button>
        ) : (
          <a href="/auth/login" style={linkStyle}>Go to login →</a>
        )}
      </section>
    </div>
  );
}

const preStyle: React.CSSProperties = {
  background: "#111",
  color: "#7ee787",
  padding: "1rem",
  borderRadius: "6px",
  marginTop: "0.5rem",
  overflowX: "auto",
};

const buttonStyle: React.CSSProperties = {
  padding: "0.5rem 1rem",
  background: "#1a1c26",
  color: "#fff",
  border: "1px solid #444",
  borderRadius: "6px",
  cursor: "pointer",
};

const dangerButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  borderColor: "#c0392b",
  color: "#e74c3c",
};

const linkStyle: React.CSSProperties = {
  color: "#7ee787",
};
