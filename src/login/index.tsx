
"use client";
 
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
 
export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);
  const navigate = useNavigate();
 
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
 
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
 
    if (error) {
      setMessageType("error");
      setMessage("Error al iniciar sesión: " + error.message);
      return;
    }
 
    if (data.user) {
      setMessageType("success");
      setMessage("Bienvenido. Sesión iniciada correctamente.");
      setTimeout(() => navigate("/home"), 1000);
    } else {
      setMessageType("error");
      setMessage("No se encontró el usuario.");
    }
  };
 
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=DM+Sans:wght@300;400;500&display=swap');
 
        :root {
          --cream:   #faf8f4;
          --black:   #0a0a0a;
          --charcoal:#1c1c1c;
          --gold:    #c9a84c;
          --gold-lt: #e8d5a3;
          --muted:   #7a7672;
          --border:  #e0dbd3;
          --card-bg: #ffffff;
          --font-display: 'Playfair Display', Georgia, serif;
          --font-body:    'Cormorant Garamond', serif;
          --font-ui:      'DM Sans', sans-serif;
          --transition: 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
 
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
 
        .auth-root {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: var(--cream);
          font-family: var(--font-ui);
          cursor: crosshair;
        }
 
        /* Left decorative panel */
        .auth-panel {
          background: var(--black);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 3rem;
          position: relative;
          overflow: hidden;
        }
 
        .auth-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 20% 80%, rgba(201,168,76,0.15) 0%, transparent 60%),
            radial-gradient(ellipse 40% 60% at 80% 20%, rgba(201,168,76,0.08) 0%, transparent 60%);
          pointer-events: none;
        }
 
        .panel-logo {
          font-family: var(--font-display);
          font-size: 0.75rem;
          letter-spacing: 0.55em;
          color: var(--gold);
          font-weight: 700;
          text-transform: uppercase;
        }
 
        .panel-headline {
          position: relative;
          z-index: 1;
        }
 
        .panel-headline h2 {
          font-family: var(--font-display);
          font-size: clamp(2.8rem, 4vw, 4.5rem);
          font-weight: 900;
          color: var(--cream);
          line-height: 1.05;
          letter-spacing: -0.02em;
          margin-bottom: 1.25rem;
        }
 
        .panel-headline h2 em {
          font-style: italic;
          color: var(--gold);
        }
 
        .panel-headline p {
          font-family: var(--font-body);
          font-size: 1.1rem;
          color: rgba(250,248,244,0.45);
          line-height: 1.7;
          font-style: italic;
          max-width: 320px;
        }
 
        .panel-footer {
          font-family: var(--font-ui);
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          color: rgba(250,248,244,0.25);
          text-transform: uppercase;
        }
 
        /* Right form panel */
        .auth-form-side {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem 2.5rem;
          background: var(--cream);
          animation: slideIn 0.6s cubic-bezier(0.16,1,0.3,1) both;
        }
 
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
 
        .auth-inner {
          width: 100%;
          max-width: 380px;
        }
 
        .auth-eyebrow {
          font-family: var(--font-ui);
          font-size: 0.65rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
 
        .auth-eyebrow::before {
          content: '';
          display: block;
          width: 32px;
          height: 1px;
          background: var(--gold);
        }
 
        .auth-title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          font-weight: 900;
          color: var(--black);
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-bottom: 0.5rem;
        }
 
        .auth-title em {
          font-style: italic;
          color: var(--muted);
        }
 
        .auth-subtitle {
          font-family: var(--font-body);
          font-size: 1rem;
          color: var(--muted);
          margin-bottom: 2.5rem;
          font-style: italic;
        }
 
        .auth-subtitle a {
          color: var(--gold);
          text-decoration: none;
          font-style: normal;
          font-weight: 500;
          transition: opacity var(--transition);
        }
 
        .auth-subtitle a:hover { opacity: 0.7; }
 
        .field-group {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 2rem;
        }
 
        .field-wrap { display: flex; flex-direction: column; gap: 0.5rem; }
 
        .field-label {
          font-family: var(--font-ui);
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--muted);
        }
 
        .field-input {
          width: 100%;
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-bottom: 2px solid var(--border);
          border-radius: 0;
          padding: 12px 0;
          font-size: 0.95rem;
          font-family: var(--font-ui);
          color: var(--black);
          outline: none;
          transition: border-color var(--transition);
          background: transparent;
          border-top: none;
          border-left: none;
          border-right: none;
        }
 
        .field-input::placeholder { color: var(--border); font-style: italic; font-family: var(--font-body); }
 
        .field-input:focus {
          border-bottom-color: var(--gold);
        }
 
        .auth-btn {
          width: 100%;
          padding: 15px;
          background: var(--black);
          border: 1px solid var(--black);
          color: var(--gold);
          font-family: var(--font-display);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background var(--transition), color var(--transition), border-color var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }
 
        .auth-btn:hover:not(:disabled) {
          background: var(--gold);
          color: var(--black);
          border-color: var(--gold);
        }
 
        .auth-btn:disabled { opacity: 0.5; cursor: not-allowed; }
 
        .btn-loader {
          display: inline-block;
          width: 12px; height: 12px;
          border: 1.5px solid rgba(201,168,76,0.4);
          border-top-color: var(--gold);
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
 
        @keyframes spin { to { transform: rotate(360deg); } }
 
        .auth-message {
          margin-top: 1.25rem;
          padding: 12px 16px;
          font-size: 0.8rem;
          font-family: var(--font-ui);
          letter-spacing: 0.05em;
          border-left: 3px solid;
        }
 
        .auth-message.success {
          border-color: var(--gold);
          background: rgba(201,168,76,0.07);
          color: #7a6030;
        }
 
        .auth-message.error {
          border-color: #a05050;
          background: rgba(160,80,80,0.06);
          color: #a05050;
        }
 
        @media (max-width: 768px) {
          .auth-root { grid-template-columns: 1fr; }
          .auth-panel { display: none; }
          .auth-form-side { padding: 2.5rem 1.5rem; align-items: flex-start; padding-top: 4rem; }
        }
      `}</style>
 
      <div className="auth-root">
        {/* Left decorative panel */}
        <div className="auth-panel">
          <div className="panel-logo">Maison</div>
          <div className="panel-headline">
            <h2>El estilo<br />es una forma<br />de <em>existir.</em></h2>
            <p>Accede a tu colección personal y descubre nuevas prendas seleccionadas para ti.</p>
          </div>
          <div className="panel-footer">© 2025 Maison — Todos los derechos reservados</div>
        </div>
 
        {/* Right form */}
        <div className="auth-form-side">
          <div className="auth-inner">
            <div className="auth-eyebrow">Acceso exclusivo</div>
            <h1 className="auth-title">Bienvenido<br /><em>de nuevo</em></h1>
            <p className="auth-subtitle">
              ¿Sin cuenta aún?{" "}
              <Link to="/registro">Regístrate aquí</Link>
            </p>
 
            <form onSubmit={handleLogin}>
              <div className="field-group">
                <div className="field-wrap">
                  <label className="field-label">Correo electrónico</label>
                  <input
                    type="email"
                    placeholder="tu@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="field-input"
                  />
                </div>
                <div className="field-wrap">
                  <label className="field-label">Contraseña</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="field-input"
                  />
                </div>
              </div>
              <button type="submit" disabled={loading} className="auth-btn">
                {loading && <span className="btn-loader" />}
                {loading ? "Iniciando..." : "Iniciar sesión"}
              </button>
            </form>
 
            {message && (
              <div className={`auth-message ${messageType}`}>{message}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
 