import { useState } from 'react'

const GastoItem = ({ gasto, categorias, onEliminar, onEditar }) => {
  const [editando, setEditando] = useState(false)
  const [descripcion, setDescripcion] = useState(gasto.descripcion)
  const [monto, setMonto] = useState(gasto.monto)
  const [categoriaId, setCategoriaId] = useState(gasto.categoriaId)
  const [fecha, setFecha] = useState(gasto.fecha)

  const nombreCategoria = categorias.find(c => c.id === gasto.categoriaId)?.nombre || gasto.categoriaId

  const handleGuardar = () => {
    onEditar(gasto.id, { descripcion, monto: Number(monto), categoriaId, fecha })
    setEditando(false)
  }

  if (editando) {
    return (
      <li className="gasto-item editando">
        <input value={descripcion} onChange={e => setDescripcion(e.target.value)} />
        <input type="number" value={monto} onChange={e => setMonto(e.target.value)} />
        <select value={categoriaId} onChange={e => setCategoriaId(e.target.value)}>
          {categorias.map(c => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>
        <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} />
        <button onClick={handleGuardar}>Guardar</button>
        <button onClick={() => setEditando(false)}>Cancelar</button>
      </li>
    )
  }

  return (
    <li className="gasto-item">
      <span className="gasto-fecha">{gasto.fecha}</span>
      <span className="gasto-descripcion">{gasto.descripcion}</span>
      <span className="gasto-categoria">{nombreCategoria}</span>
      <span className="gasto-monto">${gasto.monto}</span>
      <button onClick={() => setEditando(true)}>Editar</button>
      <button className="btn-eliminar" onClick={() => onEliminar(gasto.id)}>Eliminar</button>
    </li>
  )
}

export default GastoItem