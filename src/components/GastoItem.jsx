const GastoItem = ({ gasto, onEliminar }) => {
  return (
    <li>
      <span>{gasto.fecha} — {gasto.descripcion} — {gasto.categoria} — ${gasto.monto}</span>
      <button onClick={() => onEliminar(gasto.id)}>Eliminar</button>
    </li>
  )
}

export default GastoItem