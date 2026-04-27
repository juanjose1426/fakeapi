import { useEffect, useState } from 'react'

interface Product {
  id: number
  title: string
  price: number
  category: string
  brand: string
  stock: number
  rating: { rate: number; count: number }
}

const Informativa = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch('https://fakeapi.net/products')
      .then(res => res.json())
      .then(json => setProducts(json.data))
  }, [])

  if (!products.length) return <p className="loading">Cargando información...</p>

  const total = products.length
  const avgPrice = (products.reduce((s, p) => s + p.price, 0) / total).toFixed(2)
  const avgRating = (products.reduce((s, p) => s + p.rating.rate, 0) / total).toFixed(1)
  const totalStock = products.reduce((s, p) => s + p.stock, 0)
  const categorias = [...new Set(products.map(p => p.category))]
  const marcas = [...new Set(products.map(p => p.brand))]
  const masValorado = products.reduce((a, b) => a.rating.rate > b.rating.rate ? a : b)
  const masCaro = products.reduce((a, b) => a.price > b.price ? a : b)

  return (
    <div className="page">
      <h1>Información de la API 📊</h1>
      <p className="subtitle">https://fakeapi.net/products</p>

      <div className="stats-grid">
        <div className="stat-card"><span className="stat-num">{total}</span><span className="stat-label">Productos</span></div>
        <div className="stat-card"><span className="stat-num">${avgPrice}</span><span className="stat-label">Precio promedio</span></div>
        <div className="stat-card"><span className="stat-num">⭐ {avgRating}</span><span className="stat-label">Rating promedio</span></div>
        <div className="stat-card"><span className="stat-num">{totalStock}</span><span className="stat-label">Stock total</span></div>
        <div className="stat-card"><span className="stat-num">{categorias.length}</span><span className="stat-label">Categorías</span></div>
        <div className="stat-card"><span className="stat-num">{marcas.length}</span><span className="stat-label">Marcas</span></div>
      </div>

      <h2>Categorías disponibles</h2>
      <div className="tags">
        {categorias.map(c => <span className="badge" key={c}>{c}</span>)}
      </div>

      <h2>Destacados</h2>
      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div className="card">
          <div className="card-body">
            <span className="badge">Mejor valorado</span>
            <h3>{masValorado.title}</h3>
            <p>⭐ {masValorado.rating.rate} — {masValorado.rating.count} reseñas</p>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <span className="badge">Más caro</span>
            <h3>{masCaro.title}</h3>
            <p>${masCaro.price}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Informativa