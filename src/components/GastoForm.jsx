import { useState } from 'react'

const GastoForm = ({ categorias, onAgregar }) => {
  const [descripcion, setDescripcion] = useState('')
  const [monto, setMonto] = useState('')
  const [categoria, setCategoria] = useState('')
  const [fecha, setFecha] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!descripcion || !monto || !categoria || !fecha) return
    onAgregar({ descripcion, monto: Number(monto), categoria, fecha })
    setDescripcion('')
    setMonto('')
    setCategoria('')
    setFecha('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Descripción"
        value={descripcion}
        onChange={e => setDescripcion(e.target.value)}
      />
      <input
        type="number"
        placeholder="Monto"
        value={monto}
        onChange={e => setMonto(e.target.value)}
      />
      <select value={categoria} onChange={e => setCategoria(e.target.value)}>
        <option value="">-- Categoría --</option>
        {categorias.map(c => (
          <option key={c.id} value={c.nombre}>{c.nombre}</option>
        ))}
      </select>
      <input
        type="date"
        value={fecha}
        onChange={e => setFecha(e.target.value)}
      />
      <button type="submit">Agregar</button>
    </form>
  )
}

export default GastoForm