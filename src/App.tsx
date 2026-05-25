import { BrowserRouter as Router, Route, Routes, NavLink, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from './lib/supabaseClient'
import './App.css'

import Home         from './Home'
import Favoritos    from './Favoritos'
import Originalidad from './Originalidad'
import Informativa  from './Informativa'
import User         from './user'
import LoginPage    from './login/index'
import RegisterPage from './registro/index'
import LogoutPage   from './logout/index'

// ── Componente que protege rutas privadas ──────────────────
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<boolean | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(!!data.session)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(!!session)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  if (session === null) return null // Cargando sesión...

  return session ? <>{children}</> : <Navigate to="/login" replace />
}

// ── App ────────────────────────────────────────────────────
function App() {
  const [session, setSession] = useState<boolean | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(!!data.session)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(!!s)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  return (
    <Router>
      {/* Navbar solo visible si hay sesión */}
      {session && (
        <nav className="navbar">
          <NavLink to="/"             end>Home</NavLink>
          <NavLink to="/Favoritos">Favoritos</NavLink>
          <NavLink to="/Originalidad">Originalidad</NavLink>
          <NavLink to="/Informativa">Informativa</NavLink>
          <NavLink to="/Usuario">Usuario</NavLink>
          <NavLink to="/logout">Salir</NavLink>
        </nav>
      )}

      <Routes>
        {/* Rutas públicas */}
        <Route path="/login"    element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />

        {/* Rutas privadas */}
        <Route path="/"             element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/home"         element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/Favoritos"    element={<PrivateRoute><Favoritos /></PrivateRoute>} />
        <Route path="/Originalidad" element={<PrivateRoute><Originalidad /></PrivateRoute>} />
        <Route path="/Informativa"  element={<PrivateRoute><Informativa /></PrivateRoute>} />
        <Route path="/Usuario"      element={<PrivateRoute><User /></PrivateRoute>} />
        <Route path="/logout"       element={<PrivateRoute><LogoutPage /></PrivateRoute>} />

        {/* Cualquier ruta desconocida → login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}

export default App