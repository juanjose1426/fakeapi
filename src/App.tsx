import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom'
import './App.css'
import Home from './Home'
import Favoritos from './Favoritos'
import Originalidad from './Originalidad'
import Informativa from './Informativa'
import User from './user'

function App() {
  return (
    <Router>
      <nav className="navbar">
        <NavLink to="/"             end>Home</NavLink>
        <NavLink to="/Favoritos">Favoritos</NavLink>
        <NavLink to="/Originalidad">Originalidad</NavLink>
        <NavLink to="/Informativa">Informativa</NavLink>
        <NavLink to="/Usuario">Usuario</NavLink>
      </nav>

      <Routes>
        <Route path="/"             element={<Home />} />
        <Route path="/Favoritos"    element={<Favoritos />} />
        <Route path="/Originalidad" element={<Originalidad />} />
        <Route path="/Informativa"  element={<Informativa />} />
        <Route path="/Usuario"      element={<User />} />
      </Routes>
    </Router>
  )
}

export default App