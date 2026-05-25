"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function LogoutPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user?.email) setUserName(data.user.email);
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    setLoading(false);
    if (error) { setError("Error al cerrar sesión: " + error.message); return; }
    setDone(true);
    setTimeout(() => navigate("/login"), 2500);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --cream:   #faf8f4;
          --black:   #0a0a0a;
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
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--black);
          font-family: var(--font-ui);
          cursor: crosshair;
          position: relative;
          overflow: hidden;
        }

        .auth-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 55% 45% at 15% 80%, rgba(201,168,76,0.09) 0%, transparent 60%),
            radial-gradient(ellipse 45% 55% at 85% 20%, rgba(201,168,76,0.06) 0%, transparent 60%);
          pointer-events: none;
        }

        /* Decorative corner label */
        .corner-label {
          position: fixed;
          top: 2.5rem;
          left: 2.5rem;
          font-family: var(--font-display);
          font-size: 0.7rem;
          letter-spacing: 0.5em;
          color: var(--gold);
          font-weight: 700;
          text-transform: uppercase;
          opacity: 0.7;
        }

        .auth-card {
          width: 100%;
          max-width: 480px;
          padding: 3.5rem;
          position: relative;
          z-index: 1;
          text-align: center;
          animation: fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Decorative rule line */
        .card-rule {
          width: 48px;
          height: 2px;
          background: var(--gold);
          margin: 0 auto 2.5rem;
          opacity: 0.6;
        }

        .auth-title {
          font-family: var(--font-display);
          font-size: clamp(2.2rem, 4vw, 3.2rem);
          font-weight: 900;
          color: var(--cream);
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-bottom: 0.75rem;
        }

        .auth-title em {
          font-style: italic;
          color: var(--gold);
        }

        .auth-subtitle {
          font-family: var(--font-body);
          font-size: 1.1rem;
          color: rgba(250,248,244,0.45);
          margin-bottom: 2rem;
          font-style: italic;
          line-height: 1.6;
        }

        /* User chip */
        .user-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(201,168,76,0.08);
          border: 1px solid rgba(201,168,76,0.2);
          color: rgba(232,213,163,0.8);
          padding: 6px 18px;
          font-size: 0.75rem;
          font-family: var(--font-ui);
          letter-spacing: 0.05em;
          margin-bottom: 2.5rem;
        }

        .user-chip::before {
          content: '';
          width: 6px; height: 6px;
          background: var(--gold);
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(201,168,76,0.6);
          animation: pulse 2s infinite;
        }

        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

        .btn-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .auth-btn-danger {
          width: 100%;
          padding: 15px;
          background: transparent;
          border: 1px solid rgba(160,80,80,0.5);
          color: #d4a0a0;
          font-family: var(--font-display);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }

        .auth-btn-danger:hover:not(:disabled) {
          background: rgba(160,80,80,0.12);
          border-color: #d4a0a0;
          color: #f0c0c0;
        }

        .auth-btn-danger:disabled { opacity: 0.4; cursor: not-allowed; }

        .auth-btn-ghost {
          display: block;
          width: 100%;
          padding: 14px;
          background: transparent;
          border: 1px solid rgba(250,248,244,0.12);
          color: rgba(250,248,244,0.35);
          font-family: var(--font-ui);
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all var(--transition);
          text-decoration: none;
          text-align: center;
          box-sizing: border-box;
        }

        .auth-btn-ghost:hover {
          border-color: rgba(250,248,244,0.25);
          color: rgba(250,248,244,0.65);
        }

        .auth-btn-gold {
          display: block;
          width: 100%;
          padding: 15px;
          background: var(--gold);
          border: 1px solid var(--gold);
          color: var(--black);
          font-family: var(--font-display);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          transition: opacity var(--transition);
          text-decoration: none;
          text-align: center;
          box-sizing: border-box;
        }

        .auth-btn-gold:hover { opacity: 0.85; }

        .btn-loader {
          display: inline-block;
          width: 12px; height: 12px;
          border: 1.5px solid rgba(212,160,160,0.4);
          border-top-color: #d4a0a0;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .auth-message-error {
          margin-top: 1.25rem;
          padding: 12px 16px;
          font-size: 0.8rem;
          font-family: var(--font-ui);
          border-left: 3px solid #a05050;
          background: rgba(160,80,80,0.06);
          color: #d4a0a0;
          text-align: left;
        }

        @media (max-width: 480px) {
          .auth-card { padding: 2.5rem 1.5rem; }
          .corner-label { display: none; }
        }
      `}</style>

      <div className="auth-root">
        <div className="corner-label">Maison</div>

        <div className="auth-card">
          <div className="card-rule" />

          {!done ? (
            <>
              <h1 className="auth-title">Cerrar<br /><em>sesión</em></h1>
              <p className="auth-subtitle">
                ¿Seguro que deseas salir?<br />Tu sesión actual se cerrará.
              </p>

              {userName && <div className="user-chip">{userName}</div>}

              <div className="btn-group">
                <button onClick={handleLogout} disabled={loading} className="auth-btn-danger">
                  {loading && <span className="btn-loader" />}
                  {loading ? "Cerrando sesión..." : "Sí, cerrar sesión"}
                </button>
                <Link to="/home" className="auth-btn-ghost">Cancelar, volver al inicio</Link>
              </div>
            </>
          ) : (
            <>
              <h1 className="auth-title">Hasta<br /><em>pronto</em></h1>
              <p className="auth-subtitle">
                Sesión cerrada con éxito.<br />Redirigiendo al login...
              </p>
              <div className="btn-group" style={{ marginTop: "2rem" }}>
                <Link to="/login" className="auth-btn-gold">Ir al login ahora</Link>
              </div>
            </>
          )}

          {error && <div className="auth-message-error">{error}</div>}
        </div>
      </div>
    </>
  );
}