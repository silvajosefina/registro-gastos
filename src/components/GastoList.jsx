import GastoItem from './GastoItem'

const GastoList = ({ gastos, categorias, onEliminar, onEditar }) => {
  if (gastos.length === 0) return <p>No hay gastos registrados.</p>

  return (
    <ul className="gasto-list">
      {gastos.map(g => (
        <GastoItem
          key={g.id}
          gasto={g}
          categorias={categorias}
          onEliminar={onEliminar}
          onEditar={onEditar}
        />
      ))}
    </ul>
  )
}

export default GastoList