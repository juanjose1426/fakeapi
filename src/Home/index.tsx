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

const Home = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://fakeapi.net/products')
      .then(res => res.json())
      .then(json => {
        setProducts(json.data)
        setLoading(false)
      })
  }, [])

  if (loading) return <p className="loading">Cargando productos...</p>

  return (
    <div className="page">
      <h1>Catálogo</h1>
      <div className="grid">
        {products.map(p => (
          <div className="card" key={p.id}>
            <img src={p.image} alt={p.title} />
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
    </div>
  )
}

export default Home