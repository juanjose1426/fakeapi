import { useEffect, useState } from 'react'

interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  brand: string
  stock: number
  image: string
  rating: { rate: number; count: number }
}

const STORAGE_KEY = 'favoritos'

const Home = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [categoria, setCategoria] = useState('todas')
  const [favoritos, setFavoritos] = useState<number[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    fetch('https://fakeapi.net/products')
      .then(res => res.json())
      .then(json => {
        setProducts(json.data)
        setLoading(false)
      })
  }, [])

  const toggleFav = (id: number) => {
    setFavoritos(prev => {
      const next = prev.includes(id)
        ? prev.filter(f => f !== id)
        : [...prev, id]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }

  const categorias = ['todas', ...Array.from(new Set(products.map(p => p.category)))]

  const filtered = products.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                        p.brand.toLowerCase().includes(search.toLowerCase())
    const matchCat = categoria === 'todas' || p.category === categoria
    return matchSearch && matchCat
  })

  if (loading) return <p className="loading">Cargando productos...</p>

  return (
    <div className="page">
      <h1>Catálogo</h1>
      <p className="subtitle">{filtered.length} productos encontrados</p>

      {/* BUSCADOR */}
      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Buscar por nombre o marca..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && (
          <button className="search-clear" onClick={() => setSearch('')}>✕</button>
        )}
      </div>

      {/* FILTROS */}
      <div className="filtros">
        {categorias.map(cat => (
          <button
            key={cat}
            className={`filtro-btn ${categoria === cat ? 'active' : ''}`}
            onClick={() => setCategoria(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GRID */}
      {filtered.length === 0 ? (
        <p className="loading">No se encontraron productos.</p>
      ) : (
        <div className="grid">
          {filtered.map(p => (
            <div className="card" key={p.id}>
              <div className="card-img-wrap">
                <img src={p.image} alt={p.title} />
                <button
                  className={`fav-btn ${favoritos.includes(p.id) ? 'fav-active' : ''}`}
                  onClick={() => toggleFav(p.id)}
                  title={favoritos.includes(p.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                >
                  {favoritos.includes(p.id) ? '❤️' : '🤍'}
                </button>
              </div>
              <div className="card-body">
                <span className="badge">{p.category}</span>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <div className="card-footer">
                  <strong>${p.price}</strong>
                  <span>⭐ {p.rating.rate} ({p.rating.count})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home