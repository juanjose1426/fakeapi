import { useEffect, useState } from 'react'

interface Product {
  id: number
  title: string
  price: number
  image: string
  category: string
  rating: { rate: number; count: number }
}

const STORAGE_KEY = 'favoritos'

const Favoritos = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [favoritos, setFavoritos] = useState<number[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    fetch('https://fakeapi.net/products')
      .then(res => res.json())
      .then(json => setProducts(json.data))
  }, [])

  const toggle = (id: number) => {
    setFavoritos(prev => {
      const next = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }

  const favProducts = products.filter(p => favoritos.includes(p.id))
  const resto = products.filter(p => !favoritos.includes(p.id))

  return (
    <div className="page">
      <h1>Favoritos ❤️</h1>

      {favProducts.length > 0 && (
        <>
          <h2>Tus prendas guardadas</h2>
          <div className="grid">
            {favProducts.map(p => (
              <div className="card fav" key={p.id}>
                <img src={p.image} alt={p.title} />
                <div className="card-body">
                  <h3>{p.title}</h3>
                  <div className="card-footer">
                    <strong>${p.price}</strong>
                    <button className="btn-fav active" onClick={() => toggle(p.id)}>❤️ Quitar</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <h2>Agregar más</h2>
      <div className="grid">
        {resto.map(p => (
          <div className="card" key={p.id}>
            <img src={p.image} alt={p.title} />
            <div className="card-body">
              <h3>{p.title}</h3>
              <div className="card-footer">
                <strong>${p.price}</strong>
                <button className="btn-fav" onClick={() => toggle(p.id)}>🤍 Guardar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Favoritos