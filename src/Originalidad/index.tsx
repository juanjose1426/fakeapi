import { useState } from 'react'

const outfits = [
  { id: 1, nombre: 'Look Urbano', precio: 120, emoji: '🧥', desc: 'Chaqueta + jean + zapatillas' },
  { id: 2, nombre: 'Casual Friday', precio: 85, emoji: '👕', desc: 'Camisa + pantalón chino' },
  { id: 3, nombre: 'Sport Luxe', precio: 150, emoji: '🏃', desc: 'Hoodie + jogger + cap' },
  { id: 4, nombre: 'Night Out', precio: 200, emoji: '✨', desc: 'Blazer + camiseta + botas' },
  { id: 5, nombre: 'Weekend Vibe', precio: 95, emoji: '🌅', desc: 'Linen shirt + bermuda' },
  { id: 6, nombre: 'Academia', precio: 110, emoji: '📚', desc: 'Sweater vest + camisa + loafers' },
]

const Originalidad = () => {
  const [carrito, setCarrito] = useState<number[]>([])

  const toggle = (id: number) =>
    setCarrito(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  const total = outfits
    .filter(o => carrito.includes(o.id))
    .reduce((sum, o) => sum + o.precio, 0)

  return (
    <div className="page">
      <h1>Outfits Originales 🎨</h1>
      <p className="subtitle">Combinaciones curadas para cada ocasión</p>

      <div className="grid">
        {outfits.map(o => (
          <div className={`card outfit ${carrito.includes(o.id) ? 'selected' : ''}`} key={o.id}>
            <div className="outfit-emoji">{o.emoji}</div>
            <div className="card-body">
              <h3>{o.nombre}</h3>
              <p>{o.desc}</p>
              <div className="card-footer">
                <strong>${o.precio}</strong>
                <button className="btn-fav" onClick={() => toggle(o.id)}>
                  {carrito.includes(o.id) ? '✅ En carrito' : '🛒 Agregar'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {carrito.length > 0 && (
        <div className="carrito-bar">
          🛒 {carrito.length} outfit{carrito.length > 1 ? 's' : ''} — Total: <strong>${total}</strong>
        </div>
      )}
    </div>
  )
}

export default Originalidad