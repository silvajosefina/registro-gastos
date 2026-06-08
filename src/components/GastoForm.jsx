import { useState } from 'react'

const GastoForm = ({ categorias, onAgregar }) => {
  const [descripcion, setDescripcion] = useState('')
  const [monto, setMonto] = useState('')
  const [categoriaId, setCategoriaId] = useState('')
  const [fecha, setFecha] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!descripcion || !monto || !categoriaId || !fecha) return
    onAgregar({ descripcion, monto: Number(monto), categoriaId, fecha })
    setDescripcion('')
    setMonto('')
    setCategoriaId('')
    setFecha('')
  }

  return (
    <form className="gasto-form" onSubmit={handleSubmit}>
      <h2>Nuevo gasto</h2>
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
      <select value={categoriaId} onChange={e => setCategoriaId(e.target.value)}>
        <option value="">Categoría</option>
        {categorias.map(c => (
          <option key={c.id} value={c.id}>{c.nombre}</option>
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