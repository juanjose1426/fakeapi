const User = () => {
  return (
    <div className="page">
      <div className="perfil-card">
        <div className="avatar">UA</div>
        <h1>Estudiante Uniagustiniana</h1>
        <span className="badge">Universidad de San Buenaventura</span>

        <div className="info-grid">
          <div className="info-item"><span className="info-label">Universidad</span><span>Uniagustiniana</span></div>
          <div className="info-item"><span className="info-label">Facultad</span><span>Ingeniería y Diseño</span></div>
          <div className="info-item"><span className="info-label">Programa</span><span>Ingeniería de Sistemas</span></div>
          <div className="info-item"><span className="info-label">Ciudad</span><span>Bogotá, Colombia</span></div>
          <div className="info-item"><span className="info-label">Estado</span><span>✅ Activo</span></div>
          <div className="info-item"><span className="info-label">Proyecto</span><span>FakeAPI Store</span></div>
        </div>
      </div>
    </div>
  )
}

export default User