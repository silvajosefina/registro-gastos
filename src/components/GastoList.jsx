import GastoItem from './GastoItem'

const GastoList = ({ gastos, onEliminar }) => {
  if (gastos.length === 0) return <p>No hay gastos registrados.</p>

  return (
    <ul>
      {gastos.map(g => (
        <GastoItem key={g.id} gasto={g} onEliminar={onEliminar} />
      ))}
    </ul>
  )
}

export default GastoList